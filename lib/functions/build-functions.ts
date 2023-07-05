
export function fixAllOffIssue(inputSchemas: Record<string, any>): Record<string, any> {
    const outputSchemas: Record<string, any> = {};
  
    Object.keys(inputSchemas).forEach(schema => {
      if(inputSchemas[schema].allOf){
        const newSchema = {...inputSchemas[schema]};
        if(inputSchemas[schema].type){
          delete newSchema.type;
        }
        outputSchemas[schema] = newSchema;
      } else {
        outputSchemas[schema] = inputSchemas[schema];
      }
    });
  
    return outputSchemas;
}
  