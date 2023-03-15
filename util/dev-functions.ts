import { search } from "https://deno.land/x/jmespath/index.ts";
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
} from "./providers.ts";
import { logger } from "./logging.ts";

export function initProviderData(providerName: string, providerVersion: string, providerConfig: any) {
    let providerData: {
      id: string;
      name: string;
      version: string;
      providerServices: Record<string, unknown>;
      config: Record<string, unknown>;
    } = {
      id: providerName,
      name: providerName,
      version: providerVersion,
      providerServices: {},
      config: providerConfig,
    };
    return providerData;
}

export function initResData(): Record<string, any> {
    let resData: Record<string, any> = {};
    resData['components'] = {};
    resData['components']['x-stackQL-resources'] = {};
    return resData;
}

export function getResourceName(providerName: string, operation: string, service: string, resDiscriminator: string, pathKey: string, debug: boolean, logger: any): string {
    let resourceName = service;
    if(resDiscriminator == 'path_tokens'){
        let resTokens: string[] = [];
        let pathTokens = getMeaningfulPathTokens(pathKey);
        pathTokens.forEach(token => {
          if (token != service && token.length > 0){
            resTokens.push(token);
          }       
          resourceName = resTokens.length > 0 ? resTokens.join('_') : service;
        });
    } else {
      let resValue = search(operation, resDiscriminator)[0];
      resourceName = resValue ? camelToSnake(resValue) : service;
    }
    resourceName = updateResourceName(providerName, service, resourceName, debug, logger);
    return resourceName;
}

export function addResource(resData: any, providerName: string, service: string, resource: string): any {
    resData.components['x-stackQL-resources'][resource] = {
      id: `${providerName}.${service}.${resource}`,
      name: resource,
      title: snakeToTitleCase(resource),
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
    apiPaths: Record<string, Record<string, Record<string, string>>>,
    pathKey: string,
    verbKey: string,
    existingOpIds: string[],
    methodKey: string,
    service: string,
    resource: string
  ): string {
    let operationId = apiPaths[pathKey][verbKey][methodKey];
    if (operationId) {
      if (operationId.includes('/')) {
        operationId = operationId.split('/')[1];
      }
      operationId = operationId.replace(/-/g, '_').replace(/\./g, '_');
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
        let pathParams = (pathKey.match(/\{[\w]*\}/g) || ['by_noparams']);
        let opSuffixes: string[] = [];
        for (let ix in pathParams) {
          opSuffixes.push(`by_${pathParams[ix].replace(/\{|\}/g, '')}`);
        }
        operationId = `${operationId}_${opSuffixes.join('_')}`;
      }
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
    componentsSchemas: any,
    pathKey: string,
    verbKey: string,
    providerName: string,
    debug: boolean,
  ): any {

    const respCode = getResponseCode(apiPaths[pathKey][verbKey]?.responses);
    const opRef = getOperationRef(service, pathKey, verbKey);

    resData.components['x-stackQL-resources'][resource]['methods'][operationId] = {};
    resData.components['x-stackQL-resources'][resource]['methods'][operationId]['operation'] = {};
    resData.components['x-stackQL-resources'][resource]['methods'][operationId]['response'] = {};
    resData.components['x-stackQL-resources'][resource]['methods'][operationId]['operation']['$ref'] = opRef;
    resData.components['x-stackQL-resources'][resource]['methods'][operationId]['response']['mediaType'] = 'application/json';
    resData.components['x-stackQL-resources'][resource]['methods'][operationId]['response']['openAPIDocKey'] = respCode;
    // get objectKey if exists
    const objectKey = getObjectKey(providerName, service, resource, operationId, debug);
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
    return resData;
}

export function updateProviderData(
    providerData, 
    providerName,
    providerVersion,
    service, 
    serviceTitle, 
    serviceDescription){
        providerData.providerServices[service] = {};
        providerData.providerServices[service].description = convertLowerCaseToTitleCase(snakeToTitleCase(serviceDescription));
        providerData.providerServices[service].id = `${service}:${providerVersion}`;
        providerData.providerServices[service].name = service;
        providerData.providerServices[service].preferred = true;
        providerData.providerServices[service].service = {};
        providerData.providerServices[service].service['$ref'] = `${providerName}/${providerVersion}/services/${service}.yaml`;
        providerData.providerServices[service].title = convertLowerCaseToTitleCase(snakeToTitleCase(serviceTitle));
        providerData.providerServices[service].version = providerVersion;
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
    providerName: string
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
            'enabled': true
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
            'enabled': true
          }
        );
        break;
      default:
        break;
    };
    return resData;
}

function getResponseCode(responses: any): string {
    let respcode = '200';
    if (responses) {
      Object.keys(responses).forEach(respKey => {
        if (respKey.startsWith('2')) {
          if (responses[respKey]?.content?.['application/json']?.schema) {
            respcode = respKey;
          }
        }
      });
    }
    return respcode;
}
  
function getOperationRef(service: string, pathKey: string, verbKey: string): string {
    return `${service}.yaml#/paths/${pathKey.replace(/\//g, '~1')}/${verbKey}`;
}
  
function getRespSchemaName(op: any, service: string): any[] {
    for (let respCode in op.responses) {
      if (respCode.startsWith('2')) {
        return getAllValuesForKey(service, op.responses[respCode], "$ref", ['examples', 'description', 'headers']);
      }
    }
    return [];
}
  
function getSqlVerb(op: any, operationId: string, verbKey: string, providerName: string, service: string, resource: string): string {
    if (op['x-stackQL-verb']) {
        return op['x-stackQL-verb'];
    } else {
        let verb: string = 'exec';
        if (operationId.includes('recreate') || operationId.startsWith('undelete') || verbKey === 'patch' || verbKey === 'put') {
            verb = 'exec';
        } else if (verbKey === 'delete') {
            if (operationId.includes('delete') || operationId.startsWith('remove')) {
                verb = 'delete';
            }
        } else if (verbKey === 'post') {
            if (operationId.includes('create') || operationId.startsWith('insert') || operationId.startsWith('add') || operationId.startsWith('post')) {
                verb = 'insert';
            }
        } else if (operationId.includes('get') || operationId.startsWith('list') || operationId.startsWith('select') || operationId.startsWith('read') || operationId.endsWith('list')) {
            verb = 'select';
        }
        // if its still exec, check if there is a verb in the provider
        const providerVerb = getSqlVerbforProvider(operationId, verbKey, providerName, service, resource);
        if (providerVerb) {
            verb = providerVerb;
        }
        return verb;
    }
}
