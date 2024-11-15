// deno-lint-ignore-file no-explicit-any
import { 
  plural, 
} from "https://deno.land/x/deno_plural/mod.ts";

import { dereferenceApi, flattenAllOf } from "jsr:@stackql/deno-openapi-dereferencer";

import {
  getMeaningfulPathTokens,
  snakeToTitleCase,
  convertLowerCaseToTitleCase,
  getAllValuesForKey,
  camelToSnake,
  parseDSL,
  applyTransformations,
  startsOrEndsWithOrIncludes,
  includes,  
} from "./shared.ts";
import {
  getResourceNameFromOperationId,
  getStackQLMethodNameforProvider,
  getObjectKeyforProvider,
  getSqlVerbforProvider,
  getNonDataFieldsForProvider,
} from "./providers.ts";
import * as types from "../types/types.ts";

//
// exported functions
//

export function initProviderData(providerName: string, providerVersion: string, providerConfig: any): types.ProviderData {
  const providerData: types.ProviderData = {
    id: providerName === 'googleapis.com' ? 'google' : providerName,
    name: providerName === 'googleapis.com' ? 'google' : providerName,
    version: providerVersion,
    providerServices: {},
    config: providerConfig,
  };
  return providerData;
}

export function initResData(): Record<string, any> {
  const resData: Record<string, any> = {};
  resData['components'] = {};
  resData['components']['x-stackQL-resources'] = {};
  return resData;
}

// RESOURCE_NAME
export function getResourceName(
  providerName: string, 
  operation: any, 
  service: string, 
  operationId: string,
  resDiscriminator: string, 
  pathKey: string, 
  debug: boolean, 
  logger: any): 
  [string, string[]] {
    const resTokens: string[] = [];
    let resourceName = service;
    
    const logPrefix = 'RESOURCE_NAME';

    //
    // 1. use x-stackQL-resource tag if it exists
    //
    if (operation['x-stackQL-resource']) {
      // x-stackQL-resource tag exists
      debug ? logger.debug(`[${logPrefix}] x-stackQL-resource found, using ${operation['x-stackQL-resource']}`) : null;
      resourceName = operation['x-stackQL-resource'];
      return [resourceName, resTokens];
    }
    
    //
    // 2. use provider data if defined
    //
    const foundResourceName = getResourceNameFromOperationId(providerName, service, operationId, debug, logger);
    if (foundResourceName) {
        resourceName = foundResourceName;
        return [resourceName, resTokens];
    }

    //
    // 3. use resDiscriminator to determine resource name
    //
    switch (resDiscriminator) {
      case 'path_tokens':
      case 'last_path_token':
        // Use meaningful path tokens to construct the resource name OR use the last path token as the resource name
        debug ? logger.debug(`[${logPrefix}] path_tokens or last_path_token specified`) : null;
        let pathTokens: string[] = [];
        pathTokens = getMeaningfulPathTokens(pathKey);
        pathTokens.forEach(token => {
          // if (token != service && token.length > 0 && !token.startsWith('$')){
          if (token != service && token.length > 0){
            resTokens.push(token);
          }       
        });
        if (resDiscriminator == 'path_tokens') {
          resourceName = resTokens.length > 0 ? resTokens.join('_') : service;
          debug ? logger.debug(`[${logPrefix}] path_tokens specified, initial resource name : ${resourceName}`) : null;          
        } else {
          resourceName = resTokens.length > 0 ? resTokens[resTokens.length - 1] : service;
          debug ? logger.debug(`[${logPrefix}] last_path_token specified, initial resource name : ${resourceName}`) : null;          
        }
        // remove $ from resource name
        resourceName = resourceName.replace('$', '');
        break;
      default:
        // resource discriminator provided
        // debug ? logger.debug(`resource discriminator provided: ${resDiscriminator}`) : null;
        const { searchResults, transformString } = parseDSL(resDiscriminator, operation); 
        resourceName = applyTransformations(searchResults, transformString);
        debug ? logger.debug(`[${logPrefix}] resolved resource name: ${resourceName}`) : null;
        break;
    }

    resourceName = cleanResourceName(service, resourceName, debug, logger);
    return [resourceName, resTokens];
}

export function addResource(resData: any, providerName: string, service: string, resource: string, resTokens: string[]): any {
    resData.components['x-stackQL-resources'][resource] = {
      id: providerName == 'googleapis.com' ? `google.${service}.${resource}`: `${providerName}.${service}.${resource}`,
      name: resource,
      title: snakeToTitleCase(resource),
      resTokens: resTokens,
      methods: {},
      sqlVerbs: {
        select: [],
        insert: [],
        update: [],
        replace: [],
        delete: []
      }
    };
    return resData;
}

// METHOD_NAME
export function getStackQLMethodName(
  operation: any,
  thisOperationId: string,
  providerName: string,
  service: string,
  debug: boolean,
  logger: any
): string {

  const logPrefix = 'METHOD_NAME';

  /*
  * stackql method names are derived from the operationId
  * they are used to uniquely identify routes to operations in the providers OpenAPI spec
  * stackql (sql) verbs are then mapped back to the stackQL method
  */
  
  //
  // 1. use x-stackQL-method tag if it exists
  //
  if (operation['x-stackQL-method']) {
    // x-stackQL-resource tag exists
    debug ? logger.debug(`[${logPrefix}] x-stackQL-method found, using ${operation['x-stackQL-method']}`) : null;
    return operation['x-stackQL-method'];
  }

  //
  // 2. use provider data if defined
  //
  const foundMethodName = getStackQLMethodNameforProvider(providerName, service, thisOperationId, debug, logger);
  if (foundMethodName) {
      return foundMethodName;
  }

  //
  // 3. use the operationId
  //
  return camelToSnake(thisOperationId);

}

export async function addOperation(
    resData: any,
    service: string,
    resource: string,
    stackQLMethodName: string,
    apiDoc: any,
    apiPaths: any,
    componentsSchemas: any,
    componentsResponses: any,
    pathKey: string,
    verbKey: string,
    providerName: string,
    operationId: string,
    debug: boolean,
    logger: any
  ): Promise<any> {

    const dereferencedDoc = await dereferenceApi(apiDoc);

    const respCode = getResponseCode(apiPaths[pathKey][verbKey]?.responses);

    const resp = apiPaths[pathKey][verbKey]?.responses[respCode];
    
    const mediaType = getMediaType(dereferencedDoc.paths[pathKey][verbKey]?.responses[respCode]?.content);

    const respSchemaRef = getResponseSchemaRef(resp, mediaType);

    const hasData = !!(mediaType && dereferencedDoc.paths[pathKey][verbKey]?.responses[respCode]?.content?.[mediaType]?.schema);
    
    let objectKey: string | null = null;

    if (hasData && (verbKey === 'get' || verbKey === 'post')) {
      debug ? logger.debug(`[${stackQLMethodName}] returns data`) : null;

      // get objectKey if exists

      if(apiPaths[pathKey][verbKey]['x-stackQL-objectKey']){
        objectKey = apiPaths[pathKey][verbKey]['x-stackQL-objectKey'];
        debug ? logger.debug(`objectKey found in x-stackQL-objectKey: ${objectKey}`) : null;
      } else {
        objectKey = getObjectKey(providerName, service, resource, stackQLMethodName, dereferencedDoc, pathKey, verbKey, respCode, mediaType, debug, logger);
      }

    } else {
      debug ? logger.debug(`[${stackQLMethodName}] does not return data`) : null;
    }

    const opRef = getOperationRef(service, pathKey, verbKey);

    resData.components['x-stackQL-resources'][resource]['methods'][stackQLMethodName] = {};
    resData.components['x-stackQL-resources'][resource]['methods'][stackQLMethodName]['operation'] = {};
    resData.components['x-stackQL-resources'][resource]['methods'][stackQLMethodName]['response'] = {};
    resData.components['x-stackQL-resources'][resource]['methods'][stackQLMethodName]['operation']['$ref'] = opRef;
    resData.components['x-stackQL-resources'][resource]['methods'][stackQLMethodName]['operation']['operationId'] = operationId;
    resData.components['x-stackQL-resources'][resource]['methods'][stackQLMethodName]['response']['mediaType'] = mediaType;
    resData.components['x-stackQL-resources'][resource]['methods'][stackQLMethodName]['response']['openAPIDocKey'] = respCode;
    respSchemaRef ? resData.components['x-stackQL-resources'][resource]['methods'][stackQLMethodName]['response']['schemaRef'] = respSchemaRef: null;
    objectKey ? resData.components['x-stackQL-resources'][resource]['methods'][stackQLMethodName]['response']['objectKey'] = objectKey : null;
    
    return resData;
}

// SQL_VERB
export function addSqlVerb(
  op: any,
  resData: any,
  stackQLMethodName: string,
  service: string,
  resource: string,
  pathKey: string,
  verbKey: string,
  providerName: string,
  operationId: string,
  debug: boolean,
  logger: any
): any {

  const logPrefix = 'SQL_VERB';

  // const pattern = /\{(\+)?[\w]*\}/g;
  const pattern = /\{(\+)?[\w-]*\}/g;
  const matches = pathKey.match(pattern) || [];
  debug && matches.length > 0 ? logger.debug(`params: ${matches}`) : null;
  debug ? logger.debug(`[${logPrefix}] getting sqlVerb for ${stackQLMethodName}`) : null;
  switch (getSqlVerb(op, stackQLMethodName, pathKey, verbKey, providerName, service, resource, debug, logger)) {
    case 'select':
        resData['components']['x-stackQL-resources'][resource]['sqlVerbs']['select'].push(
          {
            '$ref': `#/components/x-stackQL-resources/${resource}/methods/${stackQLMethodName}`,
            'path': pathKey,
            'numTokens': matches.length,
            'tokens': matches.join(',').replace(/[{}]/g, ''),
            'enabled': true,  
            'operationId': operationId ? operationId : 'not found',
          }
        );
      break;
    case 'insert':
      resData['components']['x-stackQL-resources'][resource]['sqlVerbs']['insert'].push(
        {
          '$ref': `#/components/x-stackQL-resources/${resource}/methods/${stackQLMethodName}`,
          'path': pathKey,
          'numTokens': (pathKey.match(pattern) || []).length,
          'tokens': (pathKey.match(pattern) || []).join(','),
          'enabled': true,
          'operationId': operationId ? operationId : 'not found',            
        }
      );
      break;
    case 'update':
      resData['components']['x-stackQL-resources'][resource]['sqlVerbs']['update'].push(
        {
          '$ref': `#/components/x-stackQL-resources/${resource}/methods/${stackQLMethodName}`,
          'path': pathKey,
          'numTokens': (pathKey.match(pattern) || []).length,
          'tokens': (pathKey.match(pattern) || []).join(','),
          'enabled': true,
          'operationId': operationId ? operationId : 'not found',
        }
      );
      break;
    case 'replace':
      resData['components']['x-stackQL-resources'][resource]['sqlVerbs']['replace'].push(
        {
          '$ref': `#/components/x-stackQL-resources/${resource}/methods/${stackQLMethodName}`,
          'path': pathKey,
          'numTokens': (pathKey.match(pattern) || []).length,
          'tokens': (pathKey.match(pattern) || []).join(','),
          'enabled': true,
          'operationId': operationId ? operationId : 'not found',
        }
      );
      break;
    case 'delete':
      resData['components']['x-stackQL-resources'][resource]['sqlVerbs']['delete'].push(
        {
          '$ref': `#/components/x-stackQL-resources/${resource}/methods/${stackQLMethodName}`,
          'path': pathKey,
          'numTokens': (pathKey.match(pattern) || []).length,
          'tokens': (pathKey.match(pattern) || []).join(','),
          'enabled': true,
          'operationId': operationId ? operationId : 'not found',
        }
      );
      break;
    default:
      break;
  }
  return resData;
}

export function updateProviderData(
  providerData: types.ProviderData, 
  providerName: string,
  providerVersion: string,
  service: string, 
  serviceTitle: string, 
  serviceDescription: string
): types.ProviderData {
    providerData.providerServices[service] = {
        id: `${service}:${providerVersion}`,
        name: service,
        preferred: true,
        service: { '$ref': `${providerName}/${providerVersion}/services/${service}.yaml` },
        title: convertLowerCaseToTitleCase(snakeToTitleCase(serviceTitle)),
        version: providerVersion,
        description: serviceDescription ? convertLowerCaseToTitleCase(snakeToTitleCase(serviceDescription)) : undefined
    };

    return providerData;
}

//
// internal functions
//

// RESOURCE_NAME
function cleanResourceName(serviceName: string, resourceName: string, debug: boolean, logger: any): string {
  const logPrefix = 'RESOURCE_NAME';

  // 1. Convert resourceName to snake case
  const snakeCaseResourceName = camelToSnake(resourceName);

  // 2. If the resource name starts with the service name and is not equal to the service name, remove the service name
  const cleanedResourceName = snakeCaseResourceName.startsWith(`${serviceName}_`) ? snakeCaseResourceName.substring(`${serviceName}_`.length)
      : snakeCaseResourceName;

  // 3. Make the cleaned resource name plural
  const pluralResourceName = plural(cleanedResourceName);

  if(resourceName != pluralResourceName) {
    debug ? logger.debug(`[${logPrefix}] resource name changed from ${resourceName} to ${pluralResourceName}`) : null;
  }

  return pluralResourceName;
}

function getResponseCode(responses: any): string {
  // If no responses are defined, assume a '200' response code
  if (!responses) {
    return '200';
  }

  // Find the first '2XX' status code, if any
  const twoXXCodes = Object.keys(responses).filter(respKey => 
    respKey.startsWith('2') && !isNaN(parseInt(respKey))
  );

  // If there are any '2XX' response codes, return the first one after sorting
  if (twoXXCodes.length > 0) {
    return twoXXCodes.sort()[0];
  }

  // If there's a 'default' response and no '2XX' response codes, return 'default'
  if ('default' in responses) {
    return 'default';
  }

  // If there are no '2XX' codes and no 'default', return '200' by default
  return '200';
}

function getResponseSchemaRef(resp: any, mediaType: string | null): string | null {
  // Check for content type and schema ref
  if (resp?.content && mediaType && resp.content[mediaType]?.schema) {
    const schema = resp.content[mediaType].schema;

    // Handle $ref directly
    if (schema.$ref) {
      return schema.$ref;
    }

    // Handle allOf, anyOf, oneOf cases
    if (schema.allOf || schema.anyOf || schema.oneOf) {
      const type = schema.allOf ? 'allOf' : schema.anyOf ? 'anyOf' : 'oneOf';
      const refs = schema[type].map((item: any) => item.$ref).filter((ref: string | undefined) => ref);
      return refs.length > 0 ? `${type}: ${refs.join(', ')}` : null;
    }
  }

  // Check for direct $ref in response
  if (resp.$ref) {
    return resp.$ref;
  }

  // If no valid $ref found, return null
  return null;
}


function getMediaType(content: any): string | null {
  if (!content) {
    return 'application/json';
  }

  // Iterate through the keys of the content object
  for (const key in content) {

    // Check if the key starts with 'application/json'
    if (key.startsWith('application/json')) {
      return key;
    } 
    // Check if the key matches the pattern 'application/*anything*+json'
    else if (/^application\/[a-zA-Z0-9.-]+\+json$/.test(key)) {
      return key;
    }
  }

  // Default return if no match is found
  return null;
}

function getOperationRef(service: string, pathKey: string, verbKey: string): string {
    return `${service}.yaml#/paths/${pathKey.replace(/\//g, '~1')}/${verbKey}`;
}

// OBJECT KEY
function getObjectKey(
  providerName: string,
  service: string,
  resource: string,
  stackQLMethodName: string,
  dereferencedDoc: any,
  pathKey: string,
  verbKey: string,
  respCode: string,
  mediaType: string,
  debug: boolean,
  logger: any
): string | null {
  const logPrefix = 'OBJECT_KEY';

  // Step 1: Use provider-specific object key if available
  const objectKeyFromProvider = getObjectKeyforProvider(providerName, service, resource, stackQLMethodName, debug, logger);
  if (objectKeyFromProvider) {
    return objectKeyFromProvider;
  }

  // Step 2: Retrieve non-data fields for the provider (e.g., "meta", "links")
  const nonDataFields = getNonDataFieldsForProvider(providerName, debug, logger);

  // Step 3: Access the response schema for the specific path, verb, and response code
  const response = dereferencedDoc.paths[pathKey][verbKey]?.responses[respCode].content[mediaType]?.schema;

  // If response schema is not an object, return null
  if (response?.type !== "object" || !response.properties) {
    return null;
  }

  // Step 4: Filter out non-data properties
  const dataProperties = Object.keys(response.properties).filter(
    (property) => !nonDataFields.includes(property)
  );

  // Step 5: If exactly one property remains and it’s an array, return its JSON path
  if (dataProperties.length === 1) {
    const key = dataProperties[0];
    debug ? logger.debug(`[${logPrefix}] found objectKey: ${key}`) : null;
    return `$.${key}`;
  }

  // No valid object key found
  return null;
}


// SQL_VERB
function getSqlVerb(
  op: any, 
  stackQLMethodName: string, 
  pathKey: string, 
  verbKey: string, 
  providerName: string, 
  service: string, 
  resource: string, 
  debug: boolean, 
  logger: any): string {
    
    const logPrefix = 'SQL_VERB';

    // if the spec is annotated, just use this
    if (op['x-stackQL-verb']) {
      return op['x-stackQL-verb'];
    }    

    // check if there is a verb in the provider, if so return this
    const providerVerb = getSqlVerbforProvider(providerName, service, resource, stackQLMethodName, debug, logger);
    if (providerVerb) {
        return providerVerb;
    }
    
    // OData thing
    if (pathKey.includes('$count') || pathKey.includes('$value') || pathKey.includes('$batch') || pathKey.includes('$metadata') || pathKey.includes('$ref') || pathKey.includes('$batch')){
      return 'exec';
    }

    const sqlVerb = deriveSQLVerb(verbKey, stackQLMethodName, op);

    debug ? logger.debug(`[${logPrefix}]  sqlVerb for ${stackQLMethodName} : ${sqlVerb}`) : null;

    return sqlVerb;
}

function deriveSQLVerb(verbKey: string, stackQLMethodName: string, op: any): string {
  // Default verb is 'exec'
  let verb = 'exec';

  const deleteMethods = ['delete', 'remove', 'destroy'];
  const insertMethods = ['insert', 'create', 'add'];
  const updateMethods = ['update', 'patch', 'modify'];
  const replaceMethods = ['replace', 'put'];
  const selectMethods = ['list', 'get', 'select', 'read', 'describe', 'show', 'find', 'search', 'query', 'fetch', 'retrieve', 'inspect'];

  // DELETE operations
  if (verbKey === 'delete' && startsOrEndsWithOrIncludes(stackQLMethodName, deleteMethods)) {
      return 'delete';
  }

  // INSERT operations
  if ((verbKey === 'post' || verbKey === 'put') && startsOrEndsWithOrIncludes(stackQLMethodName, insertMethods)) {
      return 'insert';
  }

  // UPDATE operations
  if ((verbKey === 'patch' || verbKey === 'post') && startsOrEndsWithOrIncludes(stackQLMethodName, updateMethods)) {
      return 'update';
  }

  // REPLACE operations
  if ((verbKey === 'post' || verbKey === 'put') && startsOrEndsWithOrIncludes(stackQLMethodName, replaceMethods)) {
      return 'replace';
  }

  // SELECT operations
  if ((verbKey === 'get' || verbKey === 'post') && startsOrEndsWithOrIncludes(stackQLMethodName, selectMethods)) {
    
    // Get the response code using the helper function
    const respCode = getResponseCode(op.responses);

    // Get the media type for the response using the helper function
    const mediaType = getMediaType(op.responses[respCode]?.content);

    // Determine if the response is meaningful and returns data
    const response = op.responses[respCode];
    const returnsData = (mediaType && response?.content?.[mediaType]?.schema) || response?.$ref;

    // Check if the response code is a 2XX and returns meaningful data
    if (respCode.startsWith('2') && returnsData) {
        return 'select';
    }
  }

  // Fallthrough case: if no condition matches, return 'exec'
  return verb;
}
