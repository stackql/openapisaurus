// deno-lint-ignore-file no-explicit-any
import { readSync } from "https://deno.land/x/openapi@0.1.0/mod.ts";
import * as types from "../types/types.ts";
import { logger } from "../util/logging.ts";
import {
    providerVersion,
    operations,
  } from "../types/constants.ts";
import { 
    initProviderData,
    initResData,
    getResourceName,
    addResource,
    getStackQLMethodName,
    addOperation,
    updateProviderData,
    addSqlVerb,
} from "../functions/dev-functions.ts";
import { existsSync } from "https://deno.land/std@0.190.0/fs/mod.ts";
import * as yaml from "https://deno.land/x/js_yaml_port@3.14.0/js-yaml.js";

export async function generateDevDocs(devArgs: types.devArgs): Promise<boolean> {

    devArgs.verbose ? logger.debug(`devArgs: ${JSON.stringify(devArgs)}`) : null;

    let providerConfig: any;
    try {
      providerConfig = JSON.parse(devArgs.providerConfig);
    } catch (_e) {
        logger.error(`failed to parse ${devArgs.providerConfig}`);
        return false;
    }

    const apiDocDirRoot = devArgs.apiDocDir;
    const providerName = devArgs.providerName;
    const resDiscriminator = devArgs.resDiscriminator;
    const operationIdKey = devArgs.operationIdKey;
    const overwrite = devArgs.overwrite;
    const debug = devArgs.verbose;
    
    const providerDocDir = `${apiDocDirRoot}/${providerName}/${providerVersion}`;
    const svcDir = `${providerDocDir}/services`;

    logger.info(`generating StackQL resource definitions for services in ${svcDir}`);

    const providerDoc = `${providerDocDir}/provider.yaml`;

    // init provider doc
    // let providerData = initProviderData(providerName, providerVersion, providerConfig);
    let providerData: types.ProviderData = initProviderData(providerName, providerVersion, providerConfig);

    const serviceDirs: Deno.DirEntry[] = [];
    for await (const dirEntry of Deno.readDir(svcDir)) {
        serviceDirs.push(dirEntry);
    }

    for await (const dirEntry of serviceDirs) {
        if (!dirEntry.isDirectory) {
            continue;
        }
        const service = dirEntry.name;
        logger.info(`processing ${service}...`);
        const svcDoc = `${svcDir}/${service}/${service}.yaml`;
        const resDoc = `${svcDir}/${service}/${service}-resources.yaml`;

        let resData = initResData();

        const _serviceVersion = providerVersion;

        // read service doc
        const apiDoc = readSync(svcDoc);
        if (!apiDoc){
            logger.error(`failed to parse ${svcDoc}`);
            return false;
        }

        // iterate over paths
        const apiPaths = apiDoc.paths;

        // check if components and schemas are defined
        if (!apiDoc.components || !apiDoc.components.schemas) {
            logger.error('No components or schemas defined in the API document');
            return false;
        }

        const componentsSchemas = apiDoc.components.schemas;

        logger.info(`iterating over ${Object.keys(apiPaths).length} paths`);

        Object.keys(apiPaths).forEach(pathKey => {
            debug ? logger.debug(`processing path ${pathKey}`) : null;
            const pathItem = apiPaths[pathKey];
            if (pathItem) {
                Object.keys(pathItem).forEach(verbKey => {
                    debug ? logger.debug(`processing operation ${pathKey}:${verbKey}`) : null;
    
                    const opItem = pathItem[verbKey as keyof typeof pathItem];

                    if(opItem){
                        if (operations.includes(verbKey)){
                            try {

                                //
                                // get unique operation id
                                //
                                let thisOperationId = (opItem as any)[operationIdKey];
                                
                                if (!thisOperationId){
                                    logger.warning(`operationIdKey (${operationIdKey}) not found for ${pathKey}:${verbKey}, defaulting to ${verbKey}`);
                                }
                                
                                debug ? logger.debug(`processing operationId : ${thisOperationId}...`) : null;

                                //
                                // get resource name
                                //
                                const [resource, resTokens] = getResourceName(
                                                                providerName, 
                                                                opItem, 
                                                                service,
                                                                thisOperationId, 
                                                                resDiscriminator, 
                                                                pathKey, 
                                                                debug, 
                                                                logger);

                                if (resource === 'skip_this_resource') {
                                    logger.info(`skipping resource: ${resource}`);
                                } else {
                                    logger.info(`processing resource: ${resource}`);
        
                                    if (!Object.prototype.hasOwnProperty.call(resData['components']['x-stackQL-resources'], resource)){
                                        //
                                        // first occurrence of the resource, init resource
                                        //
                                        resData = addResource(resData, 
                                                                providerName, 
                                                                service, 
                                                                resource, 
                                                                resTokens);
                                    }

                                    //
                                    // get stackQL method name
                                    //
                                    const stackQLMethodName = getStackQLMethodName(opItem, 
                                                                        thisOperationId, 
                                                                        providerName, 
                                                                        service,
                                                                        debug, 
                                                                        logger,
                                                                    );
                                  
                                    debug ? logger.debug(`stackQL method name : ${stackQLMethodName}...`) : null;

                                    // check if method already exists
                                    const existingMethodNames = Object.keys(resData['components']['x-stackQL-resources'][resource]['methods']);
                                    if (existingMethodNames.includes(stackQLMethodName)){
                                        logger.error(`method ${stackQLMethodName} already exists for ${resource}`);
                                        throw 'Break';
                                    }
                                    
                                    //
                                    // add operation to resource
                                    //
                                    resData = addOperation(resData, 
                                                            service, 
                                                            resource, 
                                                            stackQLMethodName, 
                                                            apiPaths, 
                                                            componentsSchemas, 
                                                            pathKey, 
                                                            verbKey, 
                                                            providerName, 
                                                            thisOperationId, 
                                                            debug,
                                                            logger,
                                                        );
                                    //    
                                    // map sqlVerbs for operation
                                    //
                                    resData = addSqlVerb(opItem, 
                                                        resData, 
                                                        stackQLMethodName, 
                                                        service, 
                                                        resource, 
                                                        pathKey, 
                                                        verbKey, 
                                                        providerName, 
                                                        thisOperationId, 
                                                        debug,
                                                        logger,
                                                    );
                                }
                            } catch (e) {
                                if (e !== 'Break') throw e
                            }
                        }
                    }
                });
            }
        });   
        
        // rehome lifecycle operations into parent resource
        Object.keys(resData['components']['x-stackQL-resources']).forEach(resource => {
            debug ? logger.debug(`checking operation ${resource} for orphaned methods...`) : null;
            let hasSqlVerbs = false;
            const sqlVerbs = resData['components']['x-stackQL-resources'][resource]['sqlVerbs'];
            Object.keys(sqlVerbs).forEach(sqlVerb => {
                if (sqlVerbs[sqlVerb].length > 0){
                    hasSqlVerbs = true;
                }
            });
            if (!hasSqlVerbs){
                // no sqlVerbs, move lifecycle operations to parent resource
                const resTokens = resData['components']['x-stackQL-resources'][resource]['resTokens']
                const parentResource = resTokens.slice(0, resTokens.length - 1).join('_');
                // check if parent resource exists
                if (Object.prototype.hasOwnProperty.call(resData['components']['x-stackQL-resources'], parentResource)){
                    debug ? logger.debug(`reassigning all methods from ${resource} to ${parentResource}...`) : null;
                    // reassign all methods to parent resource
                    const methods = resData['components']['x-stackQL-resources'][resource]['methods'];
                    Object.keys(methods).forEach(method => {
                        resData['components']['x-stackQL-resources'][parentResource]['methods'][method] = methods[method];
                    });
                    // delete resource
                    delete resData['components']['x-stackQL-resources'][resource];
                } else {
                    debug ? logger.debug(`cannot reassign methods for ${resource} (${parentResource} does not exist)`) : null;
                }
            }
        });

        if (existsSync(resDoc) && !overwrite) {
            logger.error(`${resDoc} exists and overwrite is false`);
            return false;
        } else {
            Deno.writeTextFileSync(resDoc, yaml.dump(resData, {lineWidth: -1}));
            logger.info(`${resDoc} written`);
        }

        // update provider doc
        providerData = updateProviderData(
            providerData, 
            providerName,
            providerVersion,
            service, 
            apiDoc.info.title, 
            apiDoc.info.description ?? "");

        // end resources for loop
    }
    
    // write out provider doc
    if (existsSync(providerDoc) && !overwrite){
        logger.error(`${providerDoc} exists and overwrite is false`);
        return false;
    } else {
        Deno.writeTextFileSync(providerDoc, yaml.dump(providerData, {lineWidth: -1}));
        logger.info(`${providerDoc} written`);
    }

    return true;
}