import * as log from "https://deno.land/std/log/mod.ts";
import { search } from "https://deno.land/x/jmespath/index.ts";

import { 
    existsSync, 
    mkdirSync 
} from "https://deno.land/std@0.170.0/fs/mod.ts";

await log.setup({
    handlers: {
      console: new log.handlers.ConsoleHandler("DEBUG"),
    },
  
    loggers: {
      "openapisaurus": {
        level: "DEBUG",
        handlers: ["console"],
      },
    },
  });

function camelToSnake(inStr: string): string {

    const prepStr = inStr.replace(/([A-Z])([A-Z]+)/g, function(match: any, first: any, rest: string) {
      return first + rest.toLowerCase();
    });

    let str = prepStr.replace(/\s+/g, '').replace(/-/g, '_');

    return str.replace(/\.?([A-Z])/g, function(x: string, y: string) {
        return "_" + y.toLowerCase();
    }).replace(/^_/, "").replace(/_{2,}/g, "_");
}

function isMeaningfulToken(token: string, excludeParams: boolean = true): boolean {
    if (excludeParams && token.startsWith('{')) {
      return false;
    } 
    if (token.match(/[v]\d/) || token.match(/^\d/) || token == 'rest' || token == 'api' || token.length == 0) {
      return false;
    } else {
      return true;
    }
  }

function getMeaningfulPathTokens(pathKey: string): string[] {
    let path = pathKey.replace(/\./g, '/').replace(/-/g, '_');
    let outTokens: string[] = [];
    let inTokens: string[] = path.split('/');
    
    inTokens.forEach((token: string) => {
      if (isMeaningfulToken(token)) {
        outTokens.push(token);
      }
    });
  
    return outTokens;
  }

//
// EXPORTS
//

export const logger = log.getLogger('openapisaurus');

export const providerVersion = 'v00.00.00000';

export const operations = [
    'get',
    'put',
    'post',
    'delete',
    'options',
    'head',
    'patch',
    'trace',
];

export const nonOperations = [
    'servers',
    'parameters',
];

export const componentsChildren = [
    'schemas', 
    'parameters', 
    'responses', 
    'securitySchemes', 
    'callbacks', 
    'examples', 
    'requestBodies', 
    'headers', 
    'links',
];

export function createDestDir(dir: string, overwrite: boolean): boolean {
    logger.info(`checking if dest dir (${dir}) exists...`);
    if (existsSync(dir) && !overwrite) {
        logger.error(`destination Dir: ${dir} already exists`);
        return false;
    } else {
        logger.info(`creating destination dir: ${dir}`);
        Deno.mkdir(dir, { recursive: true });
        return true;
    }
}

export function isOperationExcluded(exOption: any, operation: any, discriminator: string): boolean {
  if (exOption) {
    if (search(operation, discriminator) == exOption) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export function retServiceNameAndDesc(providerName: string, operation: any, pathKey: string, discriminator: string, tags: any[]): [string, string] {
    
    if (discriminator.startsWith('svcName:')) {
      return [discriminator.split(':')[1], discriminator.split(':')[1]];
    } else {
      let thisSvc = 'svc';
      if (discriminator == 'path_tokens') {
        thisSvc = getMeaningfulPathTokens(pathKey)[0] || thisSvc;
      } else {
        thisSvc = search(operation, discriminator)[0] ? search(operation, discriminator)[0].replace(/-/g, '_') : getMeaningfulPathTokens(pathKey)[0];
      }
      const serviceName = camelToSnake(thisSvc);
      return [serviceName, serviceName];
    }
  }
  
export function initService(
    services: Record<string, any>,
    componentsChildren: string[],
    service: string,
    serviceDesc: string,
    api: Record<string, any>
  ): Record<string, any> {
    services[service] = {};
    services[service]['openapi'] = api.openapi || '3.0.0';
    services[service]['servers'] = api.servers;
    services[service]['info'] = {};
    for (let infoKey in api.info) {
      if (infoKey !== 'title' || infoKey !== 'description') {
        services[service]['info'][infoKey] = api.info[infoKey];
      }
    }
    services[service]['info']['title'] = `${api.info.title} - ${service}`;
    services[service]['info']['description'] = serviceDesc;
    services[service]['security'] = api.security;
    api.tags ? services[service]['tags'] = api.tags : null;
    api.externalDocs ? services[service]['externalDocs'] = api.externalDocs : null;
    services[service]['components'] = {};
    for (let compChild in componentsChildren) {
      if(componentsChildren[compChild] == 'schemas'){
        services[service]['components']['schemas'] = {};
      } else {
        api.components[componentsChildren[compChild]] ? services[service]['components'][componentsChildren[compChild]] = api.components[componentsChildren[compChild]] : null;
      }
    }
    services[service]['paths'] = {};
  
    // update info for service
    return services;
  }
  
export function getAllRefs(obj: any, refs: string[] = []): string[] {
    for (let k in obj) {
      if (typeof obj[k] === "object") {
        getAllRefs(obj[k], refs);
      } else {
        if (k === "$ref") {
          refs.push(obj[k]);
        }
      }
    }
    return refs;
  }
  
export function addRefsToComponents(refs: string[], service: any, apiComp: any, debug: boolean = false): void {
    for (let ref of refs) {
        debug ? logger.debug(`processing ${ref}`) : null;
        let refTokens = ref.split('/');
        if (refTokens[1] === 'components') {
            let thisSection = refTokens[2];
            let thisKey = refTokens[3];
            if (componentsChildren.includes(thisSection)) {
              if(!service['components'][thisSection][thisKey]){
                debug ? logger.debug(`adding [${thisKey}] to [components/${thisSection}]`) : null;
                service['components'][thisSection][thisKey] = apiComp[thisSection][thisKey];
              }
            }
        }
    }
  }
  
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

function snakeToTitleCase(str: string): string {
  let words = str.split('_');
  let titleCase = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return titleCase;
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

function getAllPathTokens(pathKey: string): string[] {
  let path = pathKey.replace(/\./g, '/').replace(/-/g, '_');
  let outTokens: string[] = [];
  let inTokens = path.split('/');
  inTokens.forEach(token => {
    if (isMeaningfulToken(token, false)) {
      outTokens.push(token.replace(/{/, '_').replace(/}/, ''));
    }
  });
  return outTokens;
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

export function addOperation(
  resData: any,
  serviceDirName: string,
  resource: string,
  operationId: string,
  apiPaths: any,
  pathKey: string,
  verbKey: string,
  providerName: string
): any {
  resData.components['x-stackQL-resources'][resource]['methods'][operationId] = {};
  resData.components['x-stackQL-resources'][resource]['methods'][operationId]['operation'] = {};
  resData.components['x-stackQL-resources'][resource]['methods'][operationId]['response'] = {};
  resData.components['x-stackQL-resources'][resource]['methods'][operationId]['operation']['$ref'] = getOperationRef(serviceDirName, pathKey, verbKey);
  resData.components['x-stackQL-resources'][resource]['methods'][operationId]['response']['mediaType'] = 'application/json';
  resData.components['x-stackQL-resources'][resource]['methods'][operationId]['response']['openAPIDocKey'] = getResponseCode(apiPaths[pathKey][verbKey]?.responses);
  return resData;
}

function convertLowerCaseToTitleCase(str) {
  return str.replace(/\b([a-z])/g, function(match, p1) {
    return p1.toUpperCase();
  });
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