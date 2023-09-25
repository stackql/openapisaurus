// deno-lint-ignore-file no-explicit-any
import * as types from "../types/types.ts";
import { logger } from "../util/logging.ts";
import { read } from "https://deno.land/x/openapi@0.1.0/mod.ts";
import { existsSync } from "https://deno.land/std@0.190.0/fs/mod.ts";
import * as yaml from "https://deno.land/x/js_yaml_port@3.14.0/js-yaml.js";

// nullable type fix
function nullableTypeFix(obj: any) {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      nullableTypeFix(obj[key]);
    }

    if (key === 'type' && Array.isArray(obj[key])) {
      // If type is an array and contains 'null', change it to a single type with nullable: true
      const index = obj[key].indexOf('null');
      if (index > -1) {
        // Set 'type' to the first non-'null' value in the array
        obj[key].splice(index, 1);
        obj['type'] = obj[key][0];
        
        // Add nullable: true
        obj['nullable'] = true;
      }
    }
  }
}


// function to recursively process openapi spec
function processSpec(spec: any) {
  for (const key in spec) {
    if (typeof spec[key] === 'object' && spec[key] !== null) {
      processSpec(spec[key]);
    }

    if (key === 'description' || key === 'summary') {
        // remove html tags and extra empty lines
        spec[key] = spec[key].replace(/(<([^>]+)>)/ig, '').replace(/^\s*\n/gm, '');
    }

    if (key === 'summary' && spec['description'] === undefined) {
        spec['description'] = spec[key];
      }

  }

  nullableTypeFix(spec);
  
}

export async function formatApiSpec(formatArgs: types.formatArgs): Promise<boolean> {
  try {

    formatArgs.verbose ? logger.debug(`formatArgs: ${JSON.stringify(formatArgs)}`) : null;
    
    const { apiDoc, outputFileName, overwrite, verbose } = formatArgs;

    // check if file exists
    if (!existsSync(apiDoc)) {
      throw new Error(`File ${apiDoc} does not exist.`);
    }

    verbose ? logger.debug(`reading ${apiDoc}...`) : null;

    const apiData = await read(apiDoc);
    if (!apiData){
        logger.error(`failed to parse ${apiDoc}`);
        return false;
    }

    processSpec(apiData);

    verbose ? logger.debug(`writing out to ${outputFileName}...`) : null;

    if (existsSync(outputFileName) && !overwrite) {
      throw new Error(`File ${outputFileName} already exists. Overwrite is set to false.`);
    }

    Deno.writeTextFileSync(outputFileName, yaml.dump(apiData, {lineWidth: -1}));

    return true;
  } catch (error) {
    logger.error(`failed to format spec : ${error}`);
    return false;
  }
}