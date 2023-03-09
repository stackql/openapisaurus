import { readSync } from "https://deno.land/x/openapi@0.1.0/mod.ts";
import * as types from "./types.ts";
import { 
    logger,
    providerVersion,
    operations,
    createDestDir,
    isOperationExcluded,
    retServiceNameAndDesc,
} from "./shared.ts";

export async function splitApiDoc(splitArgs: types.splitArgs): Promise<boolean> {
    
    logger.info(`splitting doc for ${splitArgs.providerName}`);
    splitArgs.verbose ? logger.debug(`splitArgs: ${JSON.stringify(splitArgs)}`) : null;

    const apiDoc = readSync(splitArgs.apiDoc);
    if (!apiDoc){
        return false;
    }

    // valid do, lets go
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
    const apiPaths = apiDoc.paths;

    logger.info(`iterating over ${Object.keys(apiPaths).length} paths`);
    let services = {};
    
    Object.keys(apiPaths).forEach(pathKey => {
        debug ? logger.debug(`processing path ${pathKey}`) : null;
        Object.keys(apiPaths[pathKey]).forEach(verbKey => {
            debug ? logger.debug(`processing operation ${pathKey}:${verbKey}`) : null;

            // if verbKey in operations, then process
            if (operations.includes(verbKey) && !isOperationExcluded(exclude, apiPaths[pathKey][verbKey], svcDiscriminator)){
                // determine service using discriminator
                let [service, serviceDesc] = retServiceNameAndDesc(providerName, apiPaths[pathKey][verbKey], pathKey, svcDiscriminator, apiDoc.tags);
                logger.info(`service name : ${service}`);
                debug ? logger.debug(`service desc : ${serviceDesc}`) : null;

                if (!services.hasOwnProperty(service)){
                    // fisrt occurance of the service, init service map
                    debug ? logger.debug(`first occurance of ${service}`) : null;

                    services = initService(services, componentsChildren, service, serviceDesc, api);

                }

                // add operation to service
                if (!services[service]['paths'].hasOwnProperty(pathKey)){
                    log('debug', `first occurance of ${pathKey}`, options.debug);
                    services[service]['paths'][pathKey] = {};
                    services[service]['paths'][pathKey][verbKey] = apiPaths[pathKey][verbKey];
                } else {
                    services[service]['paths'][pathKey][verbKey] = apiPaths[pathKey][verbKey];
                };

                // get all refs for operation
                let opRefs = getAllRefs(apiPaths[pathKey][verbKey]);
                log('debug', `found ${opRefs.length} refs for ${service}`, options.debug);

                // add refs to components in service map
                addRefsToComponents(opRefs, services[service], api.components, options.debug);

                // get internal refs
                let internalRefDepth = 3;
                for (let i = 0; i < internalRefDepth; i++){
                    let intRefs = getAllRefs(services[service]['components']);
                    log('debug', `found ${intRefs.length} INTERNAL refs`, options.debug);
                    addRefsToComponents(intRefs, services[service], api.components, options.debug);
                }

                // get internal refs for deeply nested schemas
                let schemaMaxRefDepth = 10;
                for (let i = 0; i < schemaMaxRefDepth; i++){
                    let intRefs = getAllRefs(services[service]['components']);
                    intRefs = intRefs.filter(ref => !services[service]['components']['schemas'].hasOwnProperty(ref.split('/').pop()));
                    log('debug', `found ${intRefs.length} INTERNAL schema refs`, options.debug);
                    if(intRefs.length > 0){
                        log('debug', `adding ${intRefs.length} INTERNAL schema refs`, options.debug);
                        addRefsToComponents(intRefs, services[service], api.components, options.debug);
                    } else {
                        log('debug', `Exiting INTERNAL schema refs for ${service}`, options.debug);
                        break;
                    }
                }                

            }
        });
    });




    return true;
}

