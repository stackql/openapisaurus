// deno-lint-ignore-file no-explicit-any

function fixTypeFields(schema: any): any {
  if (schema === null || typeof schema !== 'object') {
    return schema;
  }

  // Handle the 'type' field
  if (Array.isArray(schema.type)) {
    schema.type = schema.type.find((type: any) => type !== 'null') || schema.type[0];
  }

  // Handle the 'anyOf' field
  if (Array.isArray(schema.anyOf)) {
    const nonNullSchema = schema.anyOf.find((s: any) => s.type !== 'null') || schema.anyOf[0];
    return { ...nonNullSchema };
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
