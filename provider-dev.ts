import { readSync } from "https://deno.land/x/openapi@0.1.0/mod.ts";
import * as types from "./types.ts";
import { 
    logger,
    providerVersion,
    operations,
    // nonOperations,
    // createDestDir,
    // isOperationExcluded,
    // retServiceNameAndDesc,
    // componentsChildren,
    // initService,
    // getAllRefs,
    // addRefsToComponents
    initProviderData,
    initResData,
    getResourceName,
    addResource,
} from "./shared.ts";
import { ensureDirSync, existsSync } from 'https://deno.land/std/fs/mod.ts';
import * as yaml from 'https://deno.land/x/js_yaml_port/js-yaml.js';

export async function generateDevDocs(devArgs: types.devArgs): Promise<boolean> {

    devArgs.verbose ? logger.debug(`devArgs: ${JSON.stringify(devArgs)}`) : null;

    let providerConfig: any;
    try {
      providerConfig = JSON.parse(devArgs.providerConfig);
    } catch (e) {
        logger.error(`failed to parse ${devArgs.providerConfig}`);
        return false;
    }

    const apiDocDirRoot = devArgs.apiDocDir;
    const providerName = devArgs.providerName;
    const resDiscriminator = devArgs.resDiscriminator;
    const methodKey = devArgs.methodKey;
    const overwrite = devArgs.overwrite;
    const debug = devArgs.verbose;
    
    const providerDocDir = `${apiDocDirRoot}/${providerName}/${providerVersion}`;
    const svcDir = `${providerDocDir}/services`;

    logger.info(`generating StackQL resource definitions for services in ${svcDir}`);

    const providerDoc = `${providerDocDir}/provider.yaml`;

    // init provider doc
    let providerData = initProviderData(providerName, providerVersion, providerConfig);

    const serviceDirs: Deno.DirEntry[] = await Deno.readDir(svcDir);
    for await (const dirEntry of serviceDirs) {
        if (!dirEntry.isDirectory) {
            continue;
        }
        const service = dirEntry.name;
        logger.info(`processing ${service}...`);
        const svcDoc = `${svcDir}/${service}/${service}.yaml`;
        const resDoc = `${svcDir}/${service}/${service}-resources.yaml`;

        let resData = initResData();

        const serviceVersion = providerVersion;

        // read service doc
        const apiDoc = readSync(svcDoc);
        if (!apiDoc){
            logger.error(`failed to parse ${svcDoc}`);
            return false;
        }

        // iterate over paths
        const apiPaths = apiDoc.paths;
        logger.info(`iterating over ${Object.keys(apiPaths).length} paths`);

        Object.keys(apiPaths).forEach(pathKey => {
            debug ? logger.debug(`processing path ${pathKey}`) : null;
            Object.keys(apiPaths[pathKey]).forEach(verbKey => {
                debug ? logger.debug(`processing operation ${pathKey}:${verbKey}`) : null;

                if (operations.includes(verbKey)){
                    try {
                        // get resource name
                        let resource = getResourceName(providerName, apiPaths[pathKey][verbKey], service, resDiscriminator, pathKey);
                        logger.info(`processing resource: ${resource}`);
    
                        if (!resData['components']['x-stackQL-resources'].hasOwnProperty(resource)){
                            // first occurance of the resource, init resource
                            resData = addResource(resData, providerName, service, resource);
                        }
                        
                        const existingOpIds = Object.keys(resData['components']['x-stackQL-resources'][resource]['methods']);

                        // get unique operation id 
                        let operationId = apiPaths[pathKey][verbKey][methodKey];
                        
                        if (!operationId){
                            logger.error(`methodKey (${methodKey}) not found for ${pathKey}:${verbKey}`);
                            throw 'Break';
                        }
                        
                        debug ? logger.debug(`processing operationId : ${operationId}...`) : null;

                        // let operationId = getOperationId(apiPaths, pathKey, verbKey, existingOpIds, methodKey, service, resource);
                      
                        // if(operationId){
                        //     log('info', `operationId : [${operationId}]`);
                        // } else {
                        //     throw 'Break';
                        // }
                        
                        // // add operation to resource
                        // resData = addOperation(resData, serviceDirName, resource, operationId, api, pathKey, verbKey, providerName);
    
                        // // map sqlVerbs for operation
                        // resData = addSqlVerb(api.paths[pathKey][verbKey], resData, operationId, resource, pathKey, verbKey, providerName);
    
                    } catch (e) {
                        if (e !== 'Break') throw e
                    }
                }

            });
        });                




    }
    


    return true;
}