// deno-lint-ignore-file no-explicit-any
import { search } from "https://deno.land/x/jmespath@v0.2.2/index.ts";
import {
  getMeaningfulPathTokens,
  snakeToTitleCase,
  getAllPathTokens,
  convertLowerCaseToTitleCase,
  getAllValuesForKey,
  camelToSnake,
} from "./shared.ts";
import {
  updateResourceName,
  getObjectKeyforProvider,
  getSqlVerbforProvider,
  updateOperationIdforProvider,
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
    
    if(resDiscriminator == 'path_tokens'){
      // path_tokens or default resource naming mechanism
      let pathTokens: string[] = [];
        pathTokens = getMeaningfulPathTokens(pathKey);
        pathTokens.forEach(token => {
          if (token != service && token.length > 0){
            resTokens.push(token);
          }       
          resourceName = resTokens.length > 0 ? resTokens.join('_') : service;
        });
        debug ? logger.debug(`path_tokens used for resource name: ${resourceName}`) : null;
    } else if(resDiscriminator == 'last_path_token') {
      let pathTokens: string[] = [];
        pathTokens = getMeaningfulPathTokens(pathKey);
        pathTokens.forEach(token => {
          if (token != service && token.length > 0){
            resTokens.push(token);
          }       
          // set resource name to last token in resTokens
          resourceName = resTokens.length > 0 ? resTokens[resTokens.length - 1] : service;
        });
        debug ? logger.debug(`last_path_token used for resource name: ${resourceName}`) : null;
    } else {
      // resource discriminator provided
      let resValue;
      try { 
          const searchResult = search(operation, resDiscriminator);
          if (Array.isArray(searchResult) && searchResult.length > 0) {
              resValue = searchResult[0];
          } else {
              throw new Error('Search result is not an array or is empty.');
          }
      } catch (_error) {
          logger.error(`Error searching for discriminator: ${resDiscriminator}, ${_error}`);
          resValue = service;
      }
      resourceName = typeof resValue === 'string' ? camelToSnake(resValue) : service;

      // for msgraph
      if (resourceName.includes('.')) {
        resourceName = resourceName.split('.')[1];
      }

      debug ? logger.debug(`resource discriminator used for resource name: ${resourceName}`) : null;
    }
    resourceName = updateResourceName(providerName, service, resourceName, operation, debug, logger);
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

export function getOperationId(
    apiPaths: any,
    pathKey: string,
    verbKey: string,
    existingOpIds: string[],
    methodKey: string,
    providerName: string,
    service: string,
    resource: string
  ): string {
    
    if (apiPaths[pathKey][verbKey]['x-stackQL-method']) {
      return apiPaths[pathKey][verbKey]['x-stackQL-method'];
    }

    let operationId = apiPaths[pathKey][verbKey][methodKey];
    if (operationId) {
      operationId = operationId
            .replace(/'-/g, '') // replace '- with '' - cloudflare thing
            .replace(/'/g, '') // replace ' with ''
            .replace(/v-([0-9]+)/g, 'v$1') // replace v-<anynumber> with v<anynumber>
            .replace(/\//g, '_') // replace / with _
            .replace(/-/g, '_') // replace - with _
            .replace(/\(/g, '_') // replace ( with _
            .replace(/\)/g, '_') // replace ) with _
            .replace(/\./g, '_') // replace . with _
            ; 

      // remove service prefix
      if (operationId.startsWith(`${service}_`)) {
        operationId = operationId.replace(`${service}_`, '');
      }
      // remove resource prefix
      if (operationId.startsWith(`${resource}_`)) {
        operationId = operationId.replace(`${resource}_`, '');
      }
      // check for uniqueness
      if (existingOpIds.includes(operationId)) {
        // preserve op type
        if (operationId.endsWith('_list')) {
          operationId = `list_${operationId.substring(0, operationId.length - 5)}`;
        }
        if (operationId.endsWith('_create')) {
          operationId = `create_${operationId.substring(0, operationId.length - 7)}`;
        }
        if (operationId.endsWith('_delete')) {
          operationId = `delete_${operationId.substring(0, operationId.length - 7)}`;
        }
        // get path params
        const pathParams = (pathKey.match(/\{[\w]*\}/g) || ['by_noparams']);
        const opSuffixes: string[] = [];
        for (const ix in pathParams) {
          opSuffixes.push(`by_${pathParams[ix].replace(/\{|\}/g, '')}`);
        }
        operationId = `${operationId}_${opSuffixes.join('_')}`;
      }
      // update opid based upon provider
      operationId = updateOperationIdforProvider(providerName, service, resource, operationId);
      return operationId;
    } else {
      logger.warning(`no method key found for ${pathKey}/${verbKey}, using path tokens and verb`);
      return `${verbKey}_${getAllPathTokens(pathKey).join('_')}`;
    }
}

function getObjectKey(providerName: string, service: string, resource: string, operationId: string, debug: boolean) : string | false {
  const objectKey = getObjectKeyforProvider(providerName, service, resource, operationId, debug);
  if (objectKey) {
    return objectKey;
  } else {
    // do something rules based here...
    debug ? logger.debug(`no object key found for ${providerName}.${service}.${resource}.${operationId}`) : null;
  }
  return false
}

export function addOperation(
    resData: any,
    service: string,
    resource: string,
    operationId: string,
    apiPaths: any,
    _componentsSchemas: any,
    pathKey: string,
    verbKey: string,
    providerName: string,
    methodKeyVal: string,
    debug: boolean,
  ): any {

    const respCode = getResponseCode(apiPaths[pathKey][verbKey]?.responses);
    const opRef = getOperationRef(service, pathKey, verbKey);

    resData.components['x-stackQL-resources'][resource]['methods'][operationId] = {};
    resData.components['x-stackQL-resources'][resource]['methods'][operationId]['operation'] = {};
    resData.components['x-stackQL-resources'][resource]['methods'][operationId]['response'] = {};
    resData.components['x-stackQL-resources'][resource]['methods'][operationId]['operation']['$ref'] = opRef;
    resData.components['x-stackQL-resources'][resource]['methods'][operationId]['operation']['opId'] = methodKeyVal;
    resData.components['x-stackQL-resources'][resource]['methods'][operationId]['response']['mediaType'] = 'application/json';
    resData.components['x-stackQL-resources'][resource]['methods'][operationId]['response']['openAPIDocKey'] = respCode;
    
    // get objectKey if exists (get only)
    if (verbKey == 'get' || operationId == 'get_iam_policy'){

      let objectKey: string | boolean = false;

      if(apiPaths[pathKey][verbKey]['x-stackQL-objectKey']){
        objectKey = apiPaths[pathKey][verbKey]['x-stackQL-objectKey'];
      } else {
        objectKey = getObjectKey(providerName, service, resource, operationId, debug);
      }

      if (objectKey) {
        resData.components['x-stackQL-resources'][resource]['methods'][operationId]['response']['objectKey'] = objectKey;
        // add hidden method for unaltered response
        resData.components['x-stackQL-resources'][resource]['methods'][`_${operationId}`] = {};
        resData.components['x-stackQL-resources'][resource]['methods'][`_${operationId}`]['operation'] = {};
        resData.components['x-stackQL-resources'][resource]['methods'][`_${operationId}`]['response'] = {};
        resData.components['x-stackQL-resources'][resource]['methods'][`_${operationId}`]['operation']['$ref'] = opRef;
        resData.components['x-stackQL-resources'][resource]['methods'][`_${operationId}`]['response']['mediaType'] = 'application/json';
        resData.components['x-stackQL-resources'][resource]['methods'][`_${operationId}`]['response']['openAPIDocKey'] = respCode;
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
    operationId: string,
    service: string,
    resource: string,
    pathKey: string,
    verbKey: string,
    providerName: string,
    methodKeyVal: string,
    _debug: boolean,
  ): any {
    const pattern = /\{(\+)?[\w]*\}/g;
    switch (getSqlVerb(op, operationId, verbKey, providerName, service, resource)) {
      case 'select':
        resData['components']['x-stackQL-resources'][resource]['sqlVerbs']['select'].push(
          {
            '$ref': `#/components/x-stackQL-resources/${resource}/methods/${operationId}`,
            'path': pathKey,
            'numTokens': (pathKey.match(pattern) || []).length,
            'tokens': (pathKey.match(pattern) || []).join(','),
            'enabled': true,
            'methodKey': methodKeyVal ? methodKeyVal : 'not found',
            'respSchema': getRespSchemaName(op, service),
          }
        );
        break;
      case 'insert':
        resData['components']['x-stackQL-resources'][resource]['sqlVerbs']['insert'].push(
          {
            '$ref': `#/components/x-stackQL-resources/${resource}/methods/${operationId}`,
            'path': pathKey,
            'numTokens': (pathKey.match(pattern) || []).length,
            'tokens': (pathKey.match(pattern) || []).join(','),
            'enabled': true,
            'methodKey': methodKeyVal ? methodKeyVal : 'not found',            
          }
        );
        break;
      case 'delete':
        resData['components']['x-stackQL-resources'][resource]['sqlVerbs']['delete'].push(
          {
            '$ref': `#/components/x-stackQL-resources/${resource}/methods/${operationId}`,
            'path': pathKey,
            'numTokens': (pathKey.match(pattern) || []).length,
            'tokens': (pathKey.match(pattern) || []).join(','),
            'enabled': true,
            'methodKey': methodKeyVal ? methodKeyVal : 'not found',
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

function getSqlVerb(op: any, operationId: string, verbKey: string, providerName: string, service: string, resource: string): string {
    
    // check if there is a verb in the provider
    const providerVerb = getSqlVerbforProvider(operationId, verbKey, providerName, service, resource);

    if (providerVerb) {
        return providerVerb;
    } else if (op['x-stackQL-verb']) {
        return op['x-stackQL-verb'];
    } else {
        let verb = 'exec';
        switch (verbKey) {
          case 'get': {
            if (includes(operationId, ['get', 'list'])){
              verb = 'select';
            }
            if (startsOrEndsWith(operationId, [
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
            // if response code is 204 then exec
            if (op.responses['204'] && !op.responses['200']) {
              verb = 'exec';
            }
            // if there are no 2xx response codes then exec
            // if (!Object.keys(op.responses).find(respCode => respCode.startsWith('2'))) {
            //   verb = 'exec';
            // }
            const responseKeys = Object.keys(op.responses);
            if (!responseKeys.some(respCode => respCode.startsWith('2')) && !responseKeys.includes('default')) {
                verb = 'exec';
            }            
            break;
          }  
          case 'post':
            if (includes(operationId, ['create', 'insert']) && !includes(operationId, ['recreate'])){
              verb = 'insert';
            }
            if (startsOrEndsWith(operationId, [
              'add',
              // 'post',
            ])){
              verb = 'insert';
            }
            break;
          case 'delete':
            if (includes(operationId, ['delete', 'remove']) && !includes(operationId, ['undelete'])){
              verb = 'delete';
            }
            break;  
          default:
            verb = 'exec';
        }
        return verb;
    }
}