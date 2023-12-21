// deno-lint-ignore-file no-explicit-any

import { existsSync } from "https://deno.land/std@0.190.0/fs/mod.ts";
import * as yaml from "https://deno.land/x/js_yaml_port@3.14.0/js-yaml.js";
import { logger } from "../util/logging.ts";

function fixTypeFields(schema: { [x: string]: any; type: string | string[]; } | null) {
  if (schema === null || typeof schema !== 'object') {
    return schema;
  }

  // Handle the 'type' field for arrays with specific conditions
  if (Array.isArray(schema.type)) {
    if (schema.type.length === 2 && schema.type.includes('null')) {
      // Set to the non-null type
      schema.type = schema.type.find((type: string) => type !== 'null') || '';
    } else if (schema.type.length > 2) {
      // Set to string for safety
      schema.type = 'string';
    }
  }

  // Recurse into object properties or array items
  for (const key in schema) {
    if (Object.prototype.hasOwnProperty.call(schema, key)) {
      schema[key] = fixTypeFields(schema[key]);
    }
  }

  return schema;
}

// export function fixSchemaIssues(inputSchemas: Record<string, any>): Record<string, any> {
//   const outputSchemas: Record<string, any> = {};

//   Object.keys(inputSchemas).forEach((schemaKey) => {
//     outputSchemas[schemaKey] = fixTypeFields({ ...inputSchemas[schemaKey] });
//   });

//   return outputSchemas;
// }

export function fixPathIssues(paths: Record<string, any>): Record<string, any> {
  const outputPaths: Record<string, any> = JSON.parse(JSON.stringify(paths)); // Deep clone

  Object.keys(outputPaths).forEach((path) => {
    Object.keys(outputPaths[path]).forEach((method) => {
      // Fix request bodies
      if (outputPaths[path][method].requestBody) {
        outputPaths[path][method].requestBody = fixTypeFields(outputPaths[path][method].requestBody);
      }
      
      // Fix responses
      if (outputPaths[path][method].responses) {
        Object.keys(outputPaths[path][method].responses).forEach((status) => {
          outputPaths[path][method].responses[status] = fixTypeFields(outputPaths[path][method].responses[status]);
        });
      }

      // Fix parameters
      if (outputPaths[path][method].parameters) {
        outputPaths[path][method].parameters.forEach((parameter: any, index: number) => {
          if (parameter.schema) {
            outputPaths[path][method].parameters[index].schema = fixTypeFields(parameter.schema);
          }
        });
      }
    });
  });

  return outputPaths;
}

export function fixComponentIssues(components: Record<string, any>): Record<string, any> {
  const outputComponents: Record<string, any> = JSON.parse(JSON.stringify(components)); // Deep clone

  if (outputComponents.schemas) {
    Object.keys(outputComponents.schemas).forEach((schemaKey) => {
      outputComponents.schemas[schemaKey] = fixTypeFields(outputComponents.schemas[schemaKey]);
    });
  }

  if (outputComponents.responses) {
    Object.keys(outputComponents.responses).forEach((responseKey) => {
      outputComponents.responses[responseKey] = fixTypeFields(outputComponents.responses[responseKey]);
    });
  }

  return outputComponents;
}

export function addViewsToResources(providerName: string, serviceName: string, xStackQLResources: Record<string, any>): Promise<Record<string, any>> {
  const cwd = Deno.cwd();
  const viewsDir = `${cwd}/views/${providerName}/${serviceName}`;
  const viewsFile = `${viewsDir}/views.yaml`;
  
  // Check if views.yaml exists
  if (!existsSync(viewsFile)) {
      logger.info(`No views.yaml found for ${serviceName} in ${providerName}, skipping...`);
      return Promise.resolve(xStackQLResources);
  }

  // Read and parse views.yaml
  let views;
  try {
    views = yaml.load(Deno.readTextFileSync(viewsFile));
  } catch (e) {
    logger.error(`Error reading or parsing views.yaml for ${serviceName} in ${providerName}: ${e}`);
    throw e;
  }

  // Iterate through views and check for name collisions
  Object.keys(views).forEach(viewName => {
    if (xStackQLResources[viewName]) {
      throw new Error(`Name collision detected: View '${viewName}' in ${serviceName} of ${providerName} collides with an existing resource name.`);
    }
  });

  // Merge views into x-stackQL-resources
  return { ...xStackQLResources, ...views };
}