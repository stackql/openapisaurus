import { search } from "https://deno.land/x/jmespath/index.ts";
import {
    componentsChildren,
} from "./constants.ts";
import {
    getMeaningfulPathTokens,
    camelToSnake,
} from "./shared.ts";
import { logger } from "./logging.ts";

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

interface OpenAPIPaths {
  [path: string]: OpenAPIPathItem;
}

interface OpenAPIPathItem {
  [httpMethod: string]: OpenAPIOperation;
}

interface OpenAPIOperation {
  responses: {
    [statusCode: string]: OpenAPIResponse;
  };
}

interface OpenAPIResponse {
  content?: {
    [mediaType: string]: OpenAPIContent;
  };
}

interface OpenAPIContent {
  schema?: OpenAPISchema;
}

interface OpenAPISchema {
  type?: string;
  properties?: {
    [propertyName: string]: OpenAPISchema;
  };
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
