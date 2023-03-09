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
    }).replace(/^_/, "");
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

export const providerVersion = 'v1v00.00.00000';

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
            debug ? logger.debug(`adding [${thisKey}] to [components/${thisSection}]`) : null;
            if (componentsChildren.includes(thisSection)) {
                service['components'][thisSection][thisKey] = apiComp[thisSection][thisKey];
            }
        }
    }
  }
  