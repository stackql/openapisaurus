import {
  getMeaningfulPathTokens,
  snakeToTitleCase,
  getAllPathTokens,
  convertLowerCaseToTitleCase,
  getAllValuesForKey,
} from "./shared.ts";
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

export function getResourceName(providerName: string, operation: string, service: string, resDiscriminator: string, pathKey: string): string {
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

export function addOperation(
    resData: any,
    serviceDirName: string,
    resource: string,
    operationId: string,
    apiPaths: any,
    componentsSchemas: any,
    pathKey: string,
    verbKey: string,
    providerName: string
  ): any {
    const respCode = getResponseCode(apiPaths[pathKey][verbKey]?.responses);
    const schemaObj = apiPaths[pathKey][verbKey].responses[respCode].content['application/json'].schema;
    resData.components['x-stackQL-resources'][resource]['methods'][operationId] = {};
    resData.components['x-stackQL-resources'][resource]['methods'][operationId]['operation'] = {};
    resData.components['x-stackQL-resources'][resource]['methods'][operationId]['response'] = {};
    resData.components['x-stackQL-resources'][resource]['methods'][operationId]['operation']['$ref'] = getOperationRef(serviceDirName, pathKey, verbKey);
    resData.components['x-stackQL-resources'][resource]['methods'][operationId]['response']['mediaType'] = 'application/json';
    resData.components['x-stackQL-resources'][resource]['methods'][operationId]['response']['openAPIDocKey'] = respCode;
    // schemaObj ? resData.components['x-stackQL-resources'][resource]['methods'][operationId]['response']['objectKey'] = getRespSchemaPath(schemaObj, componentsSchemas) : null;
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
    resource: string,
    pathKey: string,
    verbKey: string,
    providerName: string
  ): any {
    const pattern = /\{(\+)?[\w]*\}/g;
    switch (getSqlVerb(op, operationId, verbKey, providerName)) {
      case 'select':
        resData['components']['x-stackQL-resources'][resource]['sqlVerbs']['select'].push(
          {
            '$ref': `#/components/x-stackQL-resources/${resource}/methods/${operationId}`,
            'path': pathKey,
            'numTokens': (pathKey.match(pattern) || []).length,
            'tokens': (pathKey.match(pattern) || []).join(','),
            'enabled': true,
            'respSchema': getRespSchemaName(op),
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
  
function getRespSchemaName(op: any): string[] {
    for (let respCode in op.responses) {
      if (respCode.startsWith('2')) {
        return getAllValuesForKey(op.responses[respCode], "$ref", ['examples', 'description', 'headers']);
      }
    }
    return [];
}
  
function getSqlVerb(op: any, operationId: string, verbKey: string, providerName: string): string {
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
        return verb;
    }
}

// testing

interface SchemaObj {
  [key: string]: any;
  type?: string;
  items?: SchemaObj;
  properties?: { [key: string]: SchemaObj };
  $ref?: string;
}

function getRespSchemaPath(schemaObj: any, schemaComponents: any, path: string = ""): string {
  if (schemaObj && 'type' in schemaObj) {
    if (schemaObj.type === "array") {
      return `${path}.items`;
    }
  }
  if (schemaObj && '$ref' in schemaObj) {
    const refPath = schemaObj.$ref.replace("#/components/schemas/", "");
    const refObj = schemaComponents[refPath];
    return getRespSchemaPath(refObj, `${path}`);
  }
  if (schemaObj && 'properties' in schemaObj) {
    for (const prop in schemaObj.properties) {
      const subPath = `${path}.properties.${prop}`;
      const subSchemaObj = schemaObj.properties[prop];
      const subSchemaResult = getRespSchemaPath(subSchemaObj, subPath);
      if (subSchemaResult) {
        return subSchemaResult;
      }
    }
  }
  if (schemaObj && 'items' in schemaObj) {
    return getRespSchemaPath(schemaObj.items, `${path}.items`);
  }
  return "";
}