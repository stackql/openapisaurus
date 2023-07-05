// deno modules
import { readSync } from "https://deno.land/x/openapi@0.1.0/mod.ts";
<<<<<<< HEAD:commands/provider-dev.ts
import { ensureDirSync, existsSync } from 'https://deno.land/std/fs/mod.ts';
import * as yaml from 'https://deno.land/x/js_yaml_port/js-yaml.js';
// relative imports
import * as types from "../lib/types/args.d.ts";
import { logger } from "../lib/util/logging.ts";
=======
import * as types from "./types.ts";
import { logger } from "./util/logging.ts";
import { providerVersion } from "./util/constants.ts";
>>>>>>> 7292644cf998af3cefa325c880f0f3a17e3cd1ed:provider-dev.ts
import {
  initProviderData,
  initResData,
  updateProviderData,
} from "./util/dev-functions/utils.ts";
import { existsSync } from "https://deno.land/std/fs/mod.ts";
import * as yaml from "https://deno.land/x/js_yaml_port/js-yaml.js";
import { parseServiceDoc } from "./util/dev-functions/service-dev.ts";

export async function generateDevDocs(
  devArgs: types.devArgs
): Promise<boolean> {
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
  const svcName = devArgs.serviceName;

  const providerDocDir = `${apiDocDirRoot}/${providerName}/${providerVersion}`;
  const svcDir = `${providerDocDir}/services`;
  logger.info(
    `generating StackQL resource definitions for services in ${svcDir}`
  );

  const providerDoc = `${providerDocDir}/provider.yaml`;

  // init provider doc
  let providerData = initProviderData(
    providerName,
    providerVersion,
<<<<<<< HEAD:commands/provider-dev.ts
    operations,
  } from "../lib/functions/constants.ts";
import { 
    initProviderData,
    initResData,
    getResourceName,
    addResource,
    getOperationId,
    addOperation,
    updateProviderData,
    addSqlVerb,
} from "../lib/functions/dev-functions.ts";

export async function generateDevDocs(devArgs: types.IDevArgs): Promise<boolean> {
=======
    providerConfig
  );

  const serviceDirs: Deno.DirEntry[] = [];
  for await (const dirEntry of Deno.readDir(svcDir)) {
    serviceDirs.push(dirEntry);
  }
>>>>>>> 7292644cf998af3cefa325c880f0f3a17e3cd1ed:provider-dev.ts

  for await (const dirEntry of serviceDirs) {
    if (!dirEntry.isDirectory) {
      continue;
    }
    const service = dirEntry.name;

    if(svcName && svcName !== service) {
        logger.info(`skipping service ${service}...`)
        continue;
    }
    logger.info(`processing ${service}...`);
    const svcDoc = `${svcDir}/${service}/${service}.yaml`;
    const resDoc = `${svcDir}/${service}/${service}-resources.yaml`;

    let resData = initResData();

    const serviceVersion = providerVersion;

    // read service doc
    const apiDoc = readSync(svcDoc);
    if (!apiDoc) {
      logger.error(`failed to parse ${svcDoc}`);
      return false;
    }
    // iterate over paths
    resData = parseServiceDoc({
      apiDoc,
      dir: svcDoc,
      debug,
      logger,
      providerName,
      service,
      resDiscriminator,
      methodKey,
      overwrite,
      resData,
    });

<<<<<<< HEAD:commands/provider-dev.ts
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
        const componentsSchemas = apiDoc.components.schemas;
        logger.info(`iterating over ${Object.keys(apiPaths).length} paths`);

        Object.keys(apiPaths).forEach(pathKey => {
            debug ? logger.debug(`processing path ${pathKey}`) : null;
            Object.keys(apiPaths[pathKey]).forEach(verbKey => {
                debug ? logger.debug(`processing operation ${pathKey}:${verbKey}`) : null;

                if (operations.includes(verbKey)){
                    try {
                        // get resource name
                        const [resource, resTokens] = getResourceName(providerName, apiPaths[pathKey][verbKey], service, resDiscriminator, pathKey, debug, logger);

                        logger.info(`processing resource: ${resource}`);
    
                        if (!resData['components']['x-stackQL-resources'].hasOwnProperty(resource)){
                            // first occurance of the resource, init resource
                            resData = addResource(resData, providerName, service, resource, resTokens);
                        }
                        
                        const existingOpIds = Object.keys(resData['components']['x-stackQL-resources'][resource]['methods']);

                        // get unique operation id 
                        let methodKeyVal = apiPaths[pathKey][verbKey][methodKey];
                        
                        if (!methodKeyVal){
                            logger.warning(`methodKey (${methodKey}) not found for ${pathKey}:${verbKey}, defaulting to ${verbKey}`);
                            methodKeyVal = verbKey;
                        }
                        
                        debug ? logger.debug(`processing operationId : ${methodKeyVal}...`) : null;

                        let operationId = getOperationId(providerName, apiPaths, pathKey, verbKey, existingOpIds, methodKey, service, resource, debug, logger);
                      
                        debug ? logger.debug(`updated operationId : ${operationId}...`) : null;

                        // add operation to resource
                        resData = addOperation(resData, service, resource, operationId, apiPaths, componentsSchemas, pathKey, verbKey, providerName, debug);
    
                        // map sqlVerbs for operation
                        resData = addSqlVerb(apiPaths[pathKey][verbKey], resData, operationId, service, resource, pathKey, verbKey, providerName);
    
                    } catch (e) {
                        if (e !== 'Break') throw e
                    }
                }

            });
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
                if (resData['components']['x-stackQL-resources'].hasOwnProperty(parentResource)){
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
=======
    // rehome lifecycle operations into parent resource
    Object.keys(resData["components"]["x-stackQL-resources"]).forEach(
      (resource) => {
        debug
          ? logger.debug(
              `checking operation ${resource} for orphaned methods...`
            )
          : null;
        let hasSqlVerbs = false;
        const sqlVerbs =
          resData["components"]["x-stackQL-resources"][resource]["sqlVerbs"];
        Object.keys(sqlVerbs).forEach((sqlVerb) => {
          if (sqlVerbs[sqlVerb].length > 0) {
            hasSqlVerbs = true;
          }
>>>>>>> 7292644cf998af3cefa325c880f0f3a17e3cd1ed:provider-dev.ts
        });
        if (!hasSqlVerbs) {
          // no sqlVerbs, move lifecycle operations to parent resource
          const resTokens =
            resData["components"]["x-stackQL-resources"][resource]["resTokens"];
          const parentResource = resTokens
            .slice(0, resTokens.length - 1)
            .join("_");
          // check if parent resource exists
          if (
            resData["components"]["x-stackQL-resources"].hasOwnProperty(
              parentResource
            )
          ) {
            debug
              ? logger.debug(
                  `reassigning all methods from ${resource} to ${parentResource}...`
                )
              : null;
            // reassign all methods to parent resource
            const methods =
              resData["components"]["x-stackQL-resources"][resource]["methods"];
            Object.keys(methods).forEach((method) => {
              resData["components"]["x-stackQL-resources"][parentResource][
                "methods"
              ][method] = methods[method];
            });
            // delete resource
            delete resData["components"]["x-stackQL-resources"][resource];
          } else {
            debug
              ? logger.debug(
                  `cannot reassign methods for ${resource} (${parentResource} does not exist)`
                )
              : null;
          }
        }
      }
    );

    if (existsSync(resDoc) && !overwrite) {
      logger.error(`${resDoc} exists and overwrite is false`);
      return false;
    } else {
      Deno.writeTextFileSync(resDoc, yaml.dump(resData, { lineWidth: -1 }));
      logger.info(`${resDoc} written`);
    }

    // update provider doc
    providerData = updateProviderData(
      providerData,
      providerName,
      providerVersion,
      service,
      apiDoc.info.title,
      apiDoc.info.description
    );

    // end resources for loop
  }

  // write out provider doc
  if (existsSync(providerDoc) && !overwrite) {
    logger.error(`${providerDoc} exists and overwrite is false`);
    return false;
  } else {
    Deno.writeTextFileSync(
      providerDoc,
      yaml.dump(providerData, { lineWidth: -1 })
    );
    logger.info(`${providerDoc} written`);
  }

  return true;
}
