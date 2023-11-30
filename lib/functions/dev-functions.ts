// deno-lint-ignore-file no-explicit-any
import { search } from "https://deno.land/x/jmespath@v0.2.2/index.ts";
import {
  getMeaningfulPathTokens,
  snakeToTitleCase,
  getAllPathTokens,
  convertLowerCaseToTitleCase,
  getAllValuesForKey,
  camelToSnake,
  parseDSL,
  applyTransformations,
} from "./shared.ts";
import {
  updateResourceName,
  getObjectKeyforProvider,
  getSqlVerbforProvider,
  updateStackQLMethodNameforProvider,
  performMethodNameTransformsforProvider,
} from "./providers.ts";
import { logger } from "../util/logging.ts";
import * as types from "../types/types.ts";
// import { TypeConstructorOptions } from "https://deno.land/x/js_yaml_port@3.14.0/js-yaml";

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

export function getResourceName(
  providerName: string, 
  operation: any, 
  service: string, 
  resDiscriminator: string, 
  pathKey: string, 
  debug: boolean, 
  logger: any): 
  [string, string[]] {
    const resTokens: string[] = [];
    let resourceName = service;
    
    if (operation['x-stackQL-resource']) {
      // x-stackQL-resource tag exists
      debug ? logger.debug(`x-stackQL-resource found, using ${operation['x-stackQL-resource']}`) : null;
      resourceName = operation['x-stackQL-resource'];
      // override?
      resourceName = updateResourceName(providerName, service, resourceName, operation, debug, logger);
      return [resourceName, resTokens];
    }
    
    switch (resDiscriminator) {
      case 'path_tokens':
      case 'last_path_token':
        // Use meaningful path tokens to construct the resource name OR use the last path token as the resource name
        debug ? logger.debug(`path_tokens or last_path_token specified`) : null;
        let pathTokens: string[] = [];
        pathTokens = getMeaningfulPathTokens(pathKey);
        pathTokens.forEach(token => {
          if (token != service && token.length > 0){
            resTokens.push(token);
          }       
        });
        if (resDiscriminator == 'path_tokens') {
          resourceName = resTokens.length > 0 ? resTokens.join('_') : service;
          debug ? logger.debug(`path_tokens specified, initial resource name : ${resourceName}`) : null;          
        } else {
          resourceName = resTokens.length > 0 ? resTokens[resTokens.length - 1] : service;
          debug ? logger.debug(`last_path_token specified, initial resource name : ${resourceName}`) : null;          
        }
        break;
      default:
        // resource discriminator provided
        debug ? logger.debug(`resource discriminator provided: ${resDiscriminator}`) : null;
        let resValue;
        const { jmespath, transforms } = parseDSL(resDiscriminator); // Parse the DSL
        const searchResult = search(operation, jmespath);
        debug ? logger.debug(`searchResult: ${searchResult}`) : null; 
        // Determine the type of searchResult
        const resultType = Array.isArray(searchResult) ? 'array' :
                        (searchResult === null) ? 'null' :
                        typeof searchResult;
    
        let searchResultStr: string;
        switch (resultType) {
          case 'array':
              // Handle array result
              debug ? logger.debug(`searchResult is an array`) : null;
              searchResultStr = searchResult[0];
              break;
          case 'string':
              // Handle string result
              debug ? logger.debug(`searchResult is a string`) : null;
              searchResultStr = searchResult;
              break;
          default:
              // Log and throw an error for any other type
              logger.error(`Unexpected result type: ${resultType}`);
              throw new Error(`Unhandled result type: ${resultType}`);
        }
        debug ? logger.debug(`applying transforms : ${transforms} , to ${searchResultStr}`) : null;     
        resourceName = applyTransformations(searchResultStr, transforms);
        debug ? logger.debug(`initial resolved resourcename : ${resourceName}`) : null;
        break;
    }

    const initResourceName = resourceName;
    resourceName = updateResourceName(providerName, service, camelToSnake(resourceName), operation, debug, logger);
    if(debug){
      initResourceName != resourceName ? logger.debug(`resourcename changed to : ${resourceName}`) : null;
    }

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
        delete: []
      }
    };
    return resData;
}

export function getStackQLMethodName(
    apiPaths: any,
    pathKey: string,
    verbKey: string,
    // existingOpIds: string[],
    thisOperationId: string,
    providerName: string,
    service: string,
    resource: string
  ): string {
    
    /*
    * stackql method names are derived from the operationId
    * they are used to uniquely identify routes to operations in the providers OpenAPI spec
    * stackql (sql) verbs are then mapped back to the stackQL method
    */

    // if the spec is annotated, just use this
    if (apiPaths[pathKey][verbKey]['x-stackQL-method']) {
      return apiPaths[pathKey][verbKey]['x-stackQL-method'];
    }

    // check for provider specific transforms on opid
    let stackQLMethodName = performMethodNameTransformsforProvider(providerName, service, thisOperationId);
    
    // else perform general transforms (to remove invalid characters)
    stackQLMethodName = camelToSnake(stackQLMethodName);

    // final provider name overrides
    stackQLMethodName = updateStackQLMethodNameforProvider(providerName, service, resource, stackQLMethodName);

    return stackQLMethodName;
}

function getObjectKey(providerName: string, service: string, resource: string, stackQLMethodName: string, debug: boolean) : string | false {
  const objectKey = getObjectKeyforProvider(providerName, service, resource, stackQLMethodName, debug);
  if (objectKey) {
    return objectKey;
  } else {
    // do something rules based here...
    debug ? logger.debug(`no object key found for ${providerName}.${service}.${resource} : ${stackQLMethodName}`) : null;
  }
  return false
}

export function addOperation(
    resData: any,
    service: string,
    resource: string,
    stackQLMethodName: string,
    apiPaths: any,
    _componentsSchemas: any,
    pathKey: string,
    verbKey: string,
    providerName: string,
    operationId: string,
    debug: boolean,
  ): any {

    const respCode = getResponseCode(apiPaths[pathKey][verbKey]?.responses);
    const opRef = getOperationRef(service, pathKey, verbKey);

    resData.components['x-stackQL-resources'][resource]['methods'][stackQLMethodName] = {};
    resData.components['x-stackQL-resources'][resource]['methods'][stackQLMethodName]['operation'] = {};
    resData.components['x-stackQL-resources'][resource]['methods'][stackQLMethodName]['response'] = {};
    resData.components['x-stackQL-resources'][resource]['methods'][stackQLMethodName]['operation']['$ref'] = opRef;
    resData.components['x-stackQL-resources'][resource]['methods'][stackQLMethodName]['operation']['operationId'] = operationId;
    resData.components['x-stackQL-resources'][resource]['methods'][stackQLMethodName]['response']['mediaType'] = 'application/json';
    resData.components['x-stackQL-resources'][resource]['methods'][stackQLMethodName]['response']['openAPIDocKey'] = respCode;
    
    // get objectKey if exists (get only)
    if (verbKey == 'get' || stackQLMethodName == 'get_iam_policy'){

      let objectKey: string | boolean = false;

      if(apiPaths[pathKey][verbKey]['x-stackQL-objectKey']){
        objectKey = apiPaths[pathKey][verbKey]['x-stackQL-objectKey'];
      } else {
        objectKey = getObjectKey(providerName, service, resource, stackQLMethodName, debug);
      }

      if (objectKey) {
        resData.components['x-stackQL-resources'][resource]['methods'][stackQLMethodName]['response']['objectKey'] = objectKey;
        // add hidden method for unaltered response
        resData.components['x-stackQL-resources'][resource]['methods'][`_${stackQLMethodName}`] = {};
        resData.components['x-stackQL-resources'][resource]['methods'][`_${stackQLMethodName}`]['operation'] = {};
        resData.components['x-stackQL-resources'][resource]['methods'][`_${stackQLMethodName}`]['response'] = {};
        resData.components['x-stackQL-resources'][resource]['methods'][`_${stackQLMethodName}`]['operation']['$ref'] = opRef;
        resData.components['x-stackQL-resources'][resource]['methods'][`_${stackQLMethodName}`]['response']['mediaType'] = 'application/json';
        resData.components['x-stackQL-resources'][resource]['methods'][`_${stackQLMethodName}`]['response']['openAPIDocKey'] = respCode;
      }
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
    _debug: boolean,
  ): any {
    // const pattern = /\{(\+)?[\w]*\}/g;
    const pattern = /\{(\+)?[\w-]*\}/g;
    const matches = pathKey.match(pattern) || [];
    switch (getSqlVerb(op, stackQLMethodName, pathKey, verbKey, providerName, service, resource)) {
      case 'select':
        resData['components']['x-stackQL-resources'][resource]['sqlVerbs']['select'].push(
          {
            '$ref': `#/components/x-stackQL-resources/${resource}/methods/${stackQLMethodName}`,
            'path': pathKey,
            'numTokens': matches.length, // (pathKey.match(pattern) || []).length,
            'tokens': matches.join(',').replace(/[{}]/g, ''), // (pathKey.match(pattern) || []).join(','),
            'enabled': true,
            'operationId': operationId ? operationId : 'not found',
            'respSchema': getRespSchemaName(op, service),
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

function getResponseCode(responses: any): string {
    let respcode = '200';
    if (responses) {
      Object.keys(responses).forEach(respKey => {
        // find the lowest response code that starts with 2 and return it
        if (respKey === 'default'){
          respcode = respKey;
        }
        
        if (respKey.startsWith('2') && respKey < respcode) {
          respcode = respKey;
        }

      });
    }
    return respcode;
}
  
function getOperationRef(service: string, pathKey: string, verbKey: string): string {
    return `${service}.yaml#/paths/${pathKey.replace(/\//g, '~1')}/${verbKey}`;
}
  
function getRespSchemaName(op: any, service: string): any[] {
    for (const respCode in op.responses) {
      if (respCode.startsWith('2')) {
        return getAllValuesForKey(service, op.responses[respCode], "$ref", ['examples', 'description', 'headers']);
      }
    }
    return [];
}
  
function startsOrEndsWith(str: string, arr: string[]): boolean {
    for (let i = 0; i < arr.length; i++) {
      if (str.startsWith(arr[i]) || str.endsWith(arr[i])) {
        return true;
      }
    }
    return false;
}

function includes(str: string, arr: string[]): boolean {
    for (let i = 0; i < arr.length; i++) {
      if (str.includes(arr[i])) {
        return true;
      }
    }
    return false;
}

function getSqlVerb(op: any, stackQLMethodName: string, pathKey: string, verbKey: string, providerName: string, service: string, resource: string): string {
    
    // if the spec is annotated, just use this
    if (op['x-stackQL-verb']) {
      return op['x-stackQL-verb'];
    }    

    // check if there is a verb in the provider, if so return this
    const providerVerb = getSqlVerbforProvider(stackQLMethodName, verbKey, providerName, service, resource);
    if (providerVerb) {
        return providerVerb;
    }
    
    // OData thing
    if (pathKey.includes('$count') || pathKey.includes('$value') || pathKey.includes('$batch') || pathKey.includes('$metadata') || pathKey.includes('$ref') || pathKey.includes('$batch')){
      return 'exec';
    }

    // apply general rules
    let verb = 'exec';
    switch (verbKey) {
      case 'get': {
        if (includes(stackQLMethodName, ['get', 'list'])){
          verb = 'select';
        }
        if (startsOrEndsWith(stackQLMethodName, [
          'select',
          'read',
          'describe',
          'show',
          'find',
          'search',
          'query',
          'fetch',
          'retrieve',
          'inspect',
          'check',
          'details',
        ])) {
          verb = 'select';
        }
        // check response codes and adjust accordingly
        const responseKeys = Object.keys(op.responses);
        verb = (!responseKeys.includes('200') && (responseKeys.includes('204') || !responseKeys.some(respCode => respCode.startsWith('2')) && !responseKeys.includes('default'))) ? 'exec' : verb;
        break;
      }  
      case 'post':
        if (includes(stackQLMethodName, ['create', 'insert']) && !includes(stackQLMethodName, ['recreate'])){
          verb = 'insert';
        }
        // if (startsOrEndsWith(stackQLMethodName, [
        //   'add',
        //   'post',
        // ])){
        //   verb = 'insert';
        // }
        break;
      case 'delete':
        if (includes(stackQLMethodName, ['delete', 'remove']) && !includes(stackQLMethodName, ['undelete'])){
          verb = 'delete';
        }
        break;  
      default:
        verb = 'exec';
    }
    return verb;
}
