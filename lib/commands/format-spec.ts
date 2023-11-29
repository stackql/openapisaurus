// deno-lint-ignore-file no-explicit-any
import * as types from "../types/types.ts";
import { logger } from "../util/logging.ts";
import { read } from "https://deno.land/x/openapi@0.1.0/mod.ts";
import { existsSync } from "https://deno.land/std@0.190.0/fs/mod.ts";
import * as yaml from "https://deno.land/x/js_yaml_port@3.14.0/js-yaml.js";
import {
  camelToSnake,
} from "../functions/shared.ts";

function nullableTypeFix(obj: any): any {
  if (obj === null || typeof obj !== 'object') return obj;

  const newObj = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    const value = obj[key];
    newObj[key] = nullableTypeFix(value); // Recursively fix nested objects

    if (key === 'type' && Array.isArray(newObj[key])) {
      const nonNullTypes = newObj[key].filter((type: any) => type !== 'null');
      newObj[key] = nonNullTypes.length > 0 ? nonNullTypes[0] : newObj[key][0];
      newObj['nullable'] = newObj[key].includes('null');
    }
  }
  return newObj;
}

function formatStringValues(obj: any): any {
  if (obj === null || typeof obj !== 'object') return obj;

  const newObj = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    const value = obj[key];
    newObj[key] = formatStringValues(value); // Recursively format nested objects

    if ((key === 'description' || key === 'summary') && typeof newObj[key] === 'string') {
      newObj[key] = newObj[key].replace(/(<([^>]+)>)/ig, '').replace(/^\s*\n/gm, '');
    }

    if (key === 'summary' && !newObj['description'] && typeof newObj['summary'] === 'string') {
      newObj['description'] = newObj['summary'];
    }
  }
  return newObj;
}

function fixParameterNames(spec: any): any {
  // Deep clone spec to avoid direct mutation
  let newSpec = JSON.parse(JSON.stringify(spec));

  // Traverse each path
  for (const path in newSpec.paths) {
    // Extract and update path parameters in the path string
    let newPath = path.replace(/\{([^}]+)\}/g, (match, paramName) => {
      return `{${camelToSnake(paramName)}}`;
    });

    // Apply changes to the path if necessary
    if (newPath !== path) {
      newSpec.paths[newPath] = newSpec.paths[path];
      delete newSpec.paths[path];
    }

    // Update parameter names in each method
    for (const method in newSpec.paths[newPath]) {
      const operation = newSpec.paths[newPath][method];
      if (operation.parameters) {
        operation.parameters = operation.parameters.map(param => {
          if (param.in === 'path') {
            return { ...param, name: camelToSnake(param.name) };
          }
          return param;
        });
      }
    }
  }

  return newSpec;
}

function processSpec(spec: any): any {
  let newSpec = formatStringValues(spec);
  newSpec = nullableTypeFix(newSpec);
  newSpec= fixParameterNames(newSpec);
  return newSpec;
}

export async function formatApiSpec(formatArgs: types.formatArgs): Promise<boolean> {
  try {
    const { apiDoc, outputFileName, overwrite, verbose } = formatArgs;
    if (verbose) logger.debug(`formatArgs: ${JSON.stringify(formatArgs)}`);
    
    if (!existsSync(apiDoc)) {
      throw new Error(`File ${apiDoc} does not exist.`);
    }

    verbose && logger.debug(`reading ${apiDoc}...`);
    const apiData = await read(apiDoc);
    if (!apiData) {
      logger.error(`failed to parse ${apiDoc}`);
      return false;
    }

    const processedSpec = processSpec(apiData);

    verbose && logger.debug(`writing out to ${outputFileName}...`);
    if (existsSync(outputFileName) && !overwrite) {
      throw new Error(`File ${outputFileName} already exists. Overwrite is set to false.`);
    }

    Deno.writeTextFileSync(outputFileName, yaml.dump(processedSpec, {lineWidth: -1}));
    return true;
  } catch (error) {
    logger.error(`failed to format spec : ${error}`);
    return false;
  }
}
