// deno modules
import { JSONValue } from "https://deno.land/x/jmespath@v0.2.2/index.ts";
import { read } from "https://deno.land/x/openapi@0.1.0/mod.ts";
import { ensureDirSync, existsSync } from "https://deno.land/std@0.190.0/fs/mod.ts";
import * as yaml from "https://deno.land/x/js_yaml_port@3.14.0/js-yaml.js";
// relative imports
import { logger } from "../lib/util/logging.ts";
import { createDestDir } from "../lib/util/fs.ts";
import {
    providerVersion,
    operations,
    nonOperations,
    componentsChildren,
  } from "../lib/functions/constants.ts";
import { 
    isOperationExcluded,
    retServiceNameAndDesc,
    initService,
    getAllRefs,
    addRefsToComponents,
    addMissingObjectTypes
} from "../lib/functions/split-functions.ts";
import * as types from "../lib/types/args.d.ts";
import { IOpenAPIDoc, IOpenAPIPaths, IOpenAPIPathItem, IOpenAPIOperation } from "../lib/types/openapi.d.ts";

export async function splitApiDoc(splitArgs: types.ISplitArgs): Promise<boolean> {
    
    logger.info(`splitting doc for ${splitArgs.providerName}`);
    splitArgs.verbose ? logger.debug(`splitArgs: ${JSON.stringify(splitArgs)}`) : null;

    const apiDoc = await read(splitArgs.apiDoc) as IOpenAPIDoc;
    if (!apiDoc){
        logger.error(`failed to parse ${splitArgs.apiDoc}`);
        return false;
    }

    // valid doc, lets go
    const providerName = splitArgs.providerName;
    const svcDiscriminator = splitArgs.svcDiscriminator;
    const outputDir = splitArgs.outputDir;
    const exclude = splitArgs.exclude;
    const overwrite = splitArgs.overwrite;
    const debug = splitArgs.verbose;

    // create destDir
    const destDir = `${outputDir}/${providerName}/${providerVersion}`;
    if(!createDestDir(destDir, overwrite)){
        return false
    }
    
    // iterate over paths
    const apiPaths: IOpenAPIPaths = apiDoc.paths;

    logger.info(`iterating over ${Object.keys(apiPaths).length} paths`);
    let services: { [key: string]: IOpenAPIDoc } = {};
    let opCounter = 0;
    
    Object.keys(apiPaths).forEach(pathKey => {
        debug ? logger.debug(`processing path ${pathKey}`) : null;
        Object.keys(apiPaths[pathKey] as IOpenAPIPathItem).forEach(async verbKey => {
            
            opCounter += 1;
            logger.info(`operations processed : ${opCounter}`);
            debug ? logger.debug(`processing operation ${pathKey}:${verbKey}`) : null;

            // if verbKey in operations, then process
            if (operations.includes(verbKey) && !isOperationExcluded(exclude, apiPaths[pathKey][verbKey] as JSONValue, svcDiscriminator)){
                // determine service using discriminator
                const [service, serviceDesc]: [string, string] = await retServiceNameAndDesc(providerName, apiPaths[pathKey][verbKey] as JSONValue, pathKey, svcDiscriminator, debug);
                logger.info(`service name : ${service}`);
                debug ? logger.debug(`service desc : ${serviceDesc}`) : null;

                if (!Object.prototype.hasOwnProperty.call(services, service)){ // if (!services.hasOwnProperty(service))
                
                    // fisrt occurance of the service, init service map
                    debug ? logger.debug(`first occurance of ${service}`) : null;

                    services = initService(services, componentsChildren, service, serviceDesc, apiDoc);

                }

                // add operation to service
                if (!Object.prototype.hasOwnProperty.call(services[service]['paths'], pathKey)){ // if (!services[service]['paths'].hasOwnProperty(pathKey))
                    debug ? logger.debug(`first occurance of ${pathKey}`) : null;
                    services[service]['paths'][pathKey] = {};
                }
                services[service]['paths'][pathKey][verbKey] = apiPaths[pathKey][verbKey];

                // get all refs for operation
                const opRefs = getAllRefs(apiPaths[pathKey][verbKey]);
                debug ? logger.debug(`found ${opRefs.length} refs for ${service}`) : null;

                // add refs to components in service map
                addRefsToComponents(opRefs, services[service], apiDoc.components, debug);

                // get internal refs

                const internalRefDepth = 3;
                for (let i = 0; i < internalRefDepth; i++){
                    const intRefs = getAllRefs(services[service]['components']);
                    debug ? logger.debug(`found ${intRefs.length} INTERNAL refs for service ${service}`) : null;
                    addRefsToComponents(intRefs, services[service], apiDoc.components, debug);
                }

                // get internal refs for deeply nested schemas

                const schemaMaxRefDepth = 10;
                for (let i = 0; i < schemaMaxRefDepth; i++){
                    let intRefs = getAllRefs(services[service]?.['components']);
                    intRefs = intRefs.filter((ref: string) => {
                        const refKey = ref.split('/').pop();
                        return refKey ? !Object.prototype.hasOwnProperty.call(services[service]?.['components']?.['schemas'], refKey) : false;
                    });  
    
                    debug ? logger.debug(`found ${intRefs.length} INTERNAL schema refs for service ${service}`) : null;
                    if(intRefs.length > 0){
                        debug ? logger.debug(`adding ${intRefs.length} INTERNAL schema refs for service ${service}`) : null;
                        addRefsToComponents(intRefs, services[service], apiDoc.components, debug);
                    } else {
                        debug ? logger.debug(`Exiting INTERNAL schema refs for ${service}`) : null;
                        break;
                    }
                }

            }
        });
    });

    // add non operations to each service
    Object.keys(services).forEach(service => {
        Object.keys(services[service]['paths']).forEach(pathKey => {
            debug ? logger.debug(`adding non operations to ${service} for path ${pathKey}`) : null;
            for (const nonOpIx in nonOperations){
                debug ? logger.debug(`looking for non operation ${nonOperations[nonOpIx]} in ${service} under path ${pathKey}`) : null;
                if(apiPaths[pathKey][nonOperations[nonOpIx]]){
                    debug ? logger.debug(`adding ${nonOperations[nonOpIx]} to ${service} for path ${pathKey}`) : null;                    
                    // services[service]['paths'][pathKey][nonOperations[nonOpIx]] = apiPaths[pathKey][nonOperations[nonOpIx]];
                    // interim fix
                    if(nonOperations[nonOpIx] === 'parameters'){
                        Object.keys(services[service]['paths'][pathKey]).forEach(verbKey => {
                            const pathItem = services[service]['paths'][pathKey][verbKey];
                            if (typeof pathItem === 'object' && pathItem !== null && 'parameters' in pathItem) {
                                (pathItem as IOpenAPIOperation)['parameters'] = apiPaths[pathKey]['parameters'];
                            }
                        });
                    }
                }
            }
        });
    });

    // update paths, fix missing type: object

    Object.keys(services).forEach(service => {
        debug ? logger.debug(`updating paths for ${service}`) : null;
        services[service]['paths'] = addMissingObjectTypes(services[service]['paths']);
    });
       
    // write out service docs
    Object.keys(services).forEach((service: string) => {
      logger.info(`writing out openapi doc for [${service}]`);
      const svcDir = `${outputDir}/${providerName}/${providerVersion}/services/${service}`;
      const outputFile = `${svcDir}/${service}.yaml`;
      if (!existsSync(svcDir)) {
        ensureDirSync(svcDir);
      }
      Deno.writeTextFileSync(outputFile, yaml.dump(services[service], {lineWidth: -1}));
    });
    

    return true;
}

