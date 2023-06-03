import * as types from "./types.ts";
import { logger } from "./util/logging.ts";
import { readSync } from "https://deno.land/x/openapi@0.1.0/mod.ts";
import { existsSync } from 'https://deno.land/std/fs/mod.ts';
import * as yaml from 'https://deno.land/x/js_yaml_port/js-yaml.js';

export async function formatApiSpec(formatArgs: types.formatArgs): Promise<boolean> {
  try {

    formatArgs.verbose ? logger.debug(`formatArgs: ${JSON.stringify(formatArgs)}`) : null;
    
    const { apiDoc, outputFileName, overwrite, verbose } = formatArgs;

    // check if file exists
    if (!existsSync(apiDoc)) {
      throw new Error(`File ${apiDoc} does not exist.`);
    }

    verbose ? logger.debug(`reading ${apiDoc}...`) : null;

    const apiData = readSync(apiDoc);
    if (!apiData){
        logger.error(`failed to parse ${apiDoc}`);
        return false;
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
          delete spec['summary'];
        }
      }
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
