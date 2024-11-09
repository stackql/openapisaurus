// deno-lint-ignore-file no-explicit-any
import { search } from "https://deno.land/x/jmespath@v0.2.2/index.ts";
import {
    componentsChildren,
} from "../types/constants.ts";
import * as types from "../types/types.ts";
import {
    getMeaningfulPathTokens,
    camelToSnake,
    parseDSL,
    applyTransformations,
} from "./shared.ts";
import {
  updateServiceName,
} from "./providers.ts";
import { logger } from "../util/logging.ts";

function findDescription(thisSvc, tags) {
  // Convert thisSvc to a string, safely handling null or undefined
  thisSvc = thisSvc != null ? String(thisSvc) : '';

  for (const tag of tags) {
      // Convert tag.name and tag.description to strings regardless of their original type
      const tagName = String(tag.name).trim().toLowerCase();
      const tagDescription = String(tag.description);

      if (tagName === thisSvc.trim().toLowerCase()) {
          return tagDescription; // Return the description of the matching tag
      }
  }

  console.log(`INFO: No matching tag found for ${thisSvc}.`);
  return thisSvc; // Return thisSvc if no tags match
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

export function retServiceNameAndDesc(providerName: string, operation: any, pathKey: string, discriminator: string, _tags: any[], debug: boolean, logger: any): [string, string] {
    
  let thisSvc;

  if (discriminator.startsWith('svcName:')) {

    // service name is specified
    thisSvc = discriminator.split(':')[1];
    debug ? logger.debug(`service name explicitly supplied : ${thisSvc}`) : null; 
    return [thisSvc, thisSvc];

  } else if (discriminator === 'path_tokens'){

    // path tokens requested      
    thisSvc = getMeaningfulPathTokens(pathKey)[0] || thisSvc;
    debug ? logger.debug(`path tokens requested, initial resolved service token : ${thisSvc}`) : null;     

  } else {

    // svcDiscriminator must have been supplied
    debug ? logger.debug(`svcDiscriminator supplied : ${discriminator}`) : null; 
    
    const { searchResults, transformString } = parseDSL(discriminator, operation); 

    debug ? logger.debug(`searchResults : ${searchResults}`) : null; 
    // debug ? logger.debug(`transformString : ${transformString}`) : null; 

    if (transformString !== undefined) {
      thisSvc = applyTransformations(searchResults.every(item => Array.isArray(item)) ? searchResults.flat() : searchResults, transformString);
    } else if (searchResults.length == 1){
      thisSvc = searchResults[0];
    } else {
      logger.warning(`searchResults returned more than one result: ${searchResults}`);
    }

    debug ? logger.debug(`Resolved service name: ${thisSvc}`) : null;

  }

  const serviceDesc = findDescription(thisSvc, _tags);
  const serviceName = updateServiceName(providerName, camelToSnake(thisSvc), debug, logger);
  return [serviceName, serviceDesc];

}

export function initService(
    services: types.Service,
    componentsChildren: string[],
    service: string,
    serviceDesc: string,
    api: Record<string, any>
  ): types.Service {
    services[service] = {};
    services[service]['openapi'] = api.openapi || '3.0.0';
    services[service]['servers'] = api.servers;
    services[service]['info'] = {};
    for (const infoKey in api.info) {
      if (infoKey !== 'title' && infoKey !== 'description') {
        services[service]['info'][infoKey] = api.info[infoKey];
      }
    }
    services[service]['info']['title'] = `${api.info.title} - ${service}`;
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

export function getAllRefs(obj: any, refs: string[] = []): string[] {
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

export function addRefsToComponents(refs: string[], service: any, apiComp: any, debug = false): void {
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

export function addMissingObjectTypes(paths: types.OpenAPIPaths): types.OpenAPIPaths {
  const newPaths: types.OpenAPIPaths = JSON.parse(JSON.stringify(paths));

  Object.values(newPaths).forEach((pathItem) => {
    Object.values(pathItem).forEach((operation) => {
      Object.values(operation.responses).forEach((response) => {
        recursivelyAddObjectType(response.content?.['application/json']?.schema);
      });
    });
  });

  return newPaths;

  function recursivelyAddObjectType(schema?: types.OpenAPISchema): void {
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
