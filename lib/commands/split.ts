import { read } from "https://deno.land/x/openapi@0.1.0/mod.ts";
import { ensureDirSync, existsSync } from "https://deno.land/std@0.190.0/fs/mod.ts";
import * as yaml from "https://deno.land/x/js_yaml_port@3.14.0/js-yaml.js";
import * as types from "../types/types.ts";
import { createDestDir } from "../util/fs.ts";
import { logger } from "../util/logging.ts";
import {
    providerVersion,
    operations,
    nonOperations,
    componentsChildren,
  } from "../types/constants.ts";
import { 
    isOperationExcluded,
    retServiceNameAndDesc,
    initService,
    getAllRefs,
    addRefsToComponents,
    addMissingObjectTypes
} from "../functions/split-functions.ts";

export async function splitApiDoc(splitArgs: types.splitArgs): Promise<boolean> {
    
    logger.info(`splitting doc for ${splitArgs.providerName}`);
    splitArgs.verbose ? logger.debug(`splitArgs: ${JSON.stringify(splitArgs)}`) : null;

    const apiDoc =  await read(splitArgs.apiDoc);
    if (!apiDoc){
        logger.error(`failed to parse ${splitArgs.apiDoc}`);
        return false;
    }

    // valid doc, lets go
    const providerName = splitArgs.providerName;
    const svcDiscriminator = splitArgs.svcDiscriminator;
    const exclude = splitArgs.exclude;
    const outputDir = splitArgs.outputDir;
    const overwrite = splitArgs.overwrite;
    const debug = splitArgs.verbose;

    // create destDir
    const destDir = `${outputDir}/${providerName}/${providerVersion}`;
    if(!createDestDir(destDir, overwrite)){
        return false
    }
    
    // iterate over paths
    const apiPaths = apiDoc.paths;

    logger.info(`iterating over ${Object.keys(apiPaths).length} paths`);
      
    let services: types.Service = {};

    let opCounter = 0;
    
    Object.keys(apiPaths).forEach(pathKey => {
        debug ? logger.debug(`processing path ${pathKey}`) : null;
        const pathItem = apiPaths[pathKey];
        if (pathItem) {
            Object.keys(pathItem).forEach(verbKey => {
                opCounter += 1;
                logger.info(`operations processed : ${opCounter}`);
                debug ? logger.debug(`processing operation ${pathKey}:${verbKey}`) : null;
    
                const opItem = pathItem[verbKey as keyof typeof pathItem];

                if(opItem){
                // if verbKey in operations, then process
                    if (operations.includes(verbKey) && !isOperationExcluded(exclude, opItem, svcDiscriminator)){
                        // determine service using discriminator
                        const [service, serviceDesc] = retServiceNameAndDesc(providerName, opItem, pathKey, svcDiscriminator, apiDoc.tags || [], debug, logger);
                        // if service is 'skip' bypass
                        if (service == 'skip') {
                            logger.warning(`skipping  service : ${service}`);
                            return;
                        }
                        logger.info(`service name : ${service}`);
                        debug ? logger.debug(`service desc : ${serviceDesc}`) : null;
        
                        if (!Object.prototype.hasOwnProperty.call(services, service)) {                            
                            // fisrt occurance of the service, init service map
                            debug ? logger.debug(`first occurance of ${service}`) : null;
        
                            services = initService(services, componentsChildren, service, serviceDesc, apiDoc);
        
                        }
        
                        // add operation to service
                        if (!Object.prototype.hasOwnProperty.call(services[service]['paths'], pathKey)) {
                            debug ? logger.debug(`first occurrence of ${pathKey}`) : null;
                            services[service]['paths'][pathKey] = {};
                            services[service]['paths'][pathKey][verbKey] = opItem;
                        } else if (!Object.prototype.hasOwnProperty.call(services[service]['paths'][pathKey], verbKey)) {
                            services[service]['paths'][pathKey][verbKey] = opItem;
                        }
        
                        // get all refs for operation
                        const opRefs = getAllRefs(opItem);
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
                            let intRefs = getAllRefs(services[service]['components']);
                            intRefs = intRefs.filter((ref: string) => !Object.hasOwnProperty.call(services[service]['components']['schemas'], ref.split('/').pop() || ""));

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
                }
            });            
        }
    });

    // add non operations to each service
    Object.keys(services).forEach(service => {
        if(services[service]['paths']) {
            Object.keys(services[service]['paths']).forEach(pathKey => {
                debug ? logger.debug(`adding non operations to ${service} for path ${pathKey}`) : null;
                for (const nonOpIx in nonOperations){
                    debug ? logger.debug(`looking for non operation ${nonOperations[nonOpIx]} in ${service} under path ${pathKey}`) : null;
                    const pathItem: types.PathItem | undefined = apiPaths[pathKey];
                    if (pathItem && nonOperations[nonOpIx] in pathItem) {
                        debug ? logger.debug(`adding ${nonOperations[nonOpIx]} to ${service} for path ${pathKey}`) : null;                    
                        // interim fix
                        if(nonOperations[nonOpIx] == 'parameters'){
                            if(services[service]['paths'][pathKey]) {
                                Object.keys(services[service]['paths'][pathKey]).forEach(verbKey => {
                                    services[service]['paths'][pathKey][verbKey]['parameters'] = pathItem['parameters'];
                                });
                            }
                        }
                    }
                }
            });
        }
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

