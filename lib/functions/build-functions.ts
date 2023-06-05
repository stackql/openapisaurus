
export function fixAllOffIssue(inputSchemas: Record<string, any>): Record<string, any> {
    let outputSchemas: Record<string, any> = {};
  
    Object.keys(inputSchemas).forEach(schema => {
      if(inputSchemas[schema].allOf){
        let newSchema = {...inputSchemas[schema]};
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
  