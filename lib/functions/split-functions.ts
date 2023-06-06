// deno modules
import { search, JSONValue } from "https://deno.land/x/jmespath@v0.2.2/index.ts";
// relative imports
import { 
  IOpenAPISchema, 
  IOpenAPIPaths 
} from "../types/openapi.d.ts";
import {
    componentsChildren,
} from "./constants.ts";
import {
    getMeaningfulPathTokens,
    camelToSnake,
} from "./shared.ts";
import {
  updateServiceName,
} from "./providers.ts";
import { logger } from "../util/logging.ts";
import { IOpenAPIDoc, IOpenAPIPaths, IOpenAPIPathItem } from "../lib/types/openapi.d.ts";

export function isOperationExcluded(exOption: unknown, operation: JSONValue, discriminator: string): boolean {
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

export async function retServiceNameAndDesc(providerName: string, operation: JSONValue, pathKey: string, discriminator: string, debug: boolean): Promise<[string,string]> {
    
    if (discriminator.startsWith('svcName:')) {
      return [discriminator.split(':')[1], discriminator.split(':')[1]];
    } else {
      let thisSvc = 'svc';
      if (discriminator == 'path_tokens') {
        thisSvc = getMeaningfulPathTokens(pathKey)[0] || thisSvc;
      } else {
        console.log(search(operation, discriminator)[0]);
        thisSvc = search(operation, discriminator)[0] ? search(operation, discriminator)[0].replace(/-/g, '_').replace(/\//g, '_') : getMeaningfulPathTokens(pathKey)[0];
      }
      const serviceDesc = thisSvc;
      const serviceName = await updateServiceName(providerName, camelToSnake(thisSvc), debug, logger);
      return [serviceName, serviceDesc];
    }
}

export function initService(
    services: { [key: string]: IOpenAPIDoc },
    componentsChildren: string[],
    service: string,
    serviceDesc: string,
    api: IOpenAPIDoc
  ): { [key: string]: IOpenAPIDoc } {
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
    api.security ? services[service]['security'] = api.security : null;
    api.tags ? services[service]['tags'] = api.tags : null;
    api.externalDocs ? services[service]['externalDocs'] = api.externalDocs : null;
    services[service]['components'] = {};
    for (let compChild in componentsChildren) {
      if(componentsChildren[compChild] == 'schemas'){
        services[service]['components']['schemas'] = {};
      } else if(componentsChildren[compChild] == 'responses') {
        services[service]['components']['responses'] = {};
      } else {
        api.components[componentsChildren[compChild]] ? services[service]['components'][componentsChildren[compChild]] = api.components[componentsChildren[compChild]] : null;
      }
    }
    services[service]['paths'] = {};
  
    // update info for service
    return services;
}

export function getAllRefs(obj: unknown, refs: string[] = []): string[] {
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

export function addRefsToComponents(refs: string[], service: unknown, apiComp: unknown, debug: boolean = false): void {
    for (let ref of refs) {
        debug ? logger.debug(`processing ${ref}`) : null;
        let refTokens = ref.split('/');
        if (refTokens[1] === 'components') {
            let thisSection = refTokens[2];
            let thisKey = refTokens[3];
            if (componentsChildren.includes(thisSection)) {
              if(!service['components'][thisSection][thisKey]){
                debug ? logger.debug(`adding [${thisKey}] to [components/${thisSection}]`) : null;
                apiComp[thisSection][thisKey] ? service['components'][thisSection][thisKey] = apiComp[thisSection][thisKey] : null;
              }
            }
        }
    }
}

export function addMissingObjectTypes(paths: OpenAPIPaths): OpenAPIPaths {
  const newPaths: OpenAPIPaths = JSON.parse(JSON.stringify(paths));

  Object.values(newPaths).forEach((pathItem) => {
    Object.values(pathItem).forEach((operation) => {
      Object.values(operation.responses).forEach((response) => {
        recursivelyAddObjectType(response.content?.['application/json']?.schema);
      });
    });
  });

  return newPaths;

  function recursivelyAddObjectType(schema?: OpenAPISchema): void {
    if (!schema) {
      return;
    }

    if (schema.properties && !schema.type) {
      schema.type = 'object';
    }

    Object.values(schema.properties || {}).forEach((property) => {
      if (!property.type && property.properties) {
        property.type = 'object';
      }
      recursivelyAddObjectType(property.properties);
    });
  }
}