// deno modules
import { search, JSONValue, JSONArray } from "https://deno.land/x/jmespath@v0.2.2/index.ts";
// relative imports
import {
    componentsChildren,
} from "./constants.ts";
import {
    getMeaningfulPathTokens,
    camelToSnake,
} from "./shared.ts";
import {
  updateServiceName,
  getServiceDescription,
} from "./providers.ts";
import { logger } from "../util/logging.ts";
import { IOpenAPIDoc, IOpenAPIPaths, IOpenAPIPathItem } from "../types/openapi.d.ts";

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

//
// returns a service name and a description given an input name
//
export function retServiceNameAndDesc(providerName: string, operation: JSONValue, pathKey: string, discriminator: string, debug: boolean): [string, string] {
  let thisSvcName = '';

  // single service processing
  if (discriminator.startsWith('svcName:')) {
    thisSvcName = discriminator.split(':')[1];
  }

  // get service name by path tokens (default) or discriminator
  if (discriminator === 'path_tokens') {
    thisSvcName = getMeaningfulPathTokens(pathKey)[0] || thisSvcName;
  } else {
      const searchResult: JSONArray = search(operation, discriminator) as JSONArray;
      if (searchResult.length > 0 && typeof searchResult[0] === 'string') {
        thisSvcName = searchResult[0].replace(/-/g, '_').replace(/\//g, '_');
      }
  }

  // if service name is not found by now, error and exit
  if (thisSvcName === '') {
    logger.error(`Unable to determine service name for ${pathKey} using discriminator ${discriminator}`);
    Deno.exit(1);
  }

  // update the service name based on the provider data
  const serviceName = updateServiceName(providerName, camelToSnake(thisSvcName), debug);
  const serviceDesc = getServiceDescription(providerName, serviceName, debug);

  return [serviceName, serviceDesc];
}

type PartialOpenAPIDoc = Partial<IOpenAPIDoc>;

interface IService {
  [key: string]: PartialOpenAPIDoc;
}

export function initService(
    services: IService,
    componentsChildren: string[],
    service: string,
    serviceDesc: string,
    api: IOpenAPIDoc
  ): { [key: string]: IOpenAPIDoc } {
    services[service] = {};
    services[service]['openapi'] = api.openapi || '3.0.0';
    services[service]['servers'] = api.servers;
    services[service]['info'] = {
      title: `${api.info.title} - ${service}`,   //ensure title is set
      version: api.info.version,  //ensure version is set
    };
  
    for (const infoKey in api.info) {
      if (infoKey !== 'title' && infoKey !== 'description') {
        services[service]['info'][infoKey] = api.info[infoKey];
      }
    }
  
    services[service]['info']['description'] = serviceDesc;

    api.security ? services[service]['security'] = api.security : null;
    api.tags ? services[service]['tags'] = api.tags : null;
    api.externalDocs ? services[service]['externalDocs'] = api.externalDocs : null;
    services[service]['components'] = {};
    for (const compChild in componentsChildren) {
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
    for (const k in obj) {
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
    for (const ref of refs) {
        debug ? logger.debug(`processing ${ref}`) : null;
        const refTokens = ref.split('/');
        if (refTokens[1] === 'components') {
            const thisSection = refTokens[2];
            const thisKey = refTokens[3];
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
