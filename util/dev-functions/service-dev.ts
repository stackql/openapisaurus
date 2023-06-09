import { Document } from "https://deno.land/x/openapi@0.1.0/parser/deps.ts";
import { logDebug } from "../logging.ts";
import { operations } from "../constants.ts";
import { Verbs, addOperation, addResource, addSqlVerb, getOperationId, getResourceName } from "./utils.ts";
import { PathItemObject } from "https://deno.land/x/openapi@0.1.0/mod.ts";


export function parseServiceDoc({
  apiDoc,
  dir,
  providerName,
  service,
  resDiscriminator,
  debug,
  logger,
  resData,
  methodKey
}: {
  apiDoc: Document;
  dir: string;
  debug: boolean;
  logger: any;
  providerName: string;
  service: string;
  resDiscriminator: string;
  methodKey: string;
  overwrite: boolean;
  resData: Record<string, any>;
}) {
  const apiPaths = apiDoc.paths;
  if (!apiDoc.components) {
    throw new Error(`No components found in service doc ${dir}`);
  }
  const componentsSchemas = apiDoc.components.schemas;

  logger.info(`iterating over ${Object.keys(apiPaths).length} paths`);

  Object.keys(apiPaths).forEach((pathKey) => {
    logDebug(`processing path ${pathKey}`, debug);

    if (!apiPaths[pathKey]) {
      throw new Error(`No path found for ${pathKey}`);
    }

    Object.keys(apiPaths[pathKey] as PathItemObject).forEach((verbKey) => {
      logDebug(`processing operation ${pathKey}:${verbKey}`, debug);
    
      if (operations.includes(verbKey) && apiPaths[pathKey]) {
        const verb = verbKey as Verbs;
        const path = apiPaths[pathKey] as PathItemObject;

        const operation = path[verb];

        if (!operation) {
          throw new Error(`No operation found for verb ${verb} on path ${pathKey}`);
        }

        try {
          // get resource name
          const [resource, resTokens] = getResourceName(
            providerName,
            operation,
            service,
            resDiscriminator,
            pathKey,
            debug,
            logger
          );

          logger.info(`processing resource: ${resource}`);

          if (
            !resData["components"]["x-stackQL-resources"].hasOwnProperty(
              resource
            )
          ) {
            // first occurance of the resource, init resource
            resData = addResource(
              resData,
              providerName,
              service,
              resource,
              resTokens
            );
          }

          const existingOpIds = Object.keys(
            resData["components"]["x-stackQL-resources"][resource]["methods"]
          );

          // get unique operation id
          let methodKeyVal = operation[methodKey];

          if (!methodKeyVal) {
            logger.warning(
              `methodKey (${methodKey}) not found for ${pathKey}:${verbKey}, defaulting to ${verbKey}`
            );
            methodKeyVal = verbKey;
          }

          debug
            ? logger.debug(`processing operationId : ${methodKeyVal}...`)
            : null;

          const operationId = getOperationId({
            apiPaths,
            pathKey,
            verbKey,
            existingOpIds,
            methodKey,
            service,
            resource,
          });

          logDebug(`updated operationId : ${operationId}...`, debug)

          // add operation to resource
          resData = addOperation(
            resData,
            service,
            resource,
            operationId,
            apiPaths,
            componentsSchemas,
            pathKey,
            verbKey,
            providerName,
            debug
          );

          // map sqlVerbs for operation
          resData = addSqlVerb(
            verb,
            resData,
            operationId,
            service,
            resource,
            pathKey,
            verbKey,
            providerName
          );
        } catch (e) {
          if (e !== "Break") throw e;
        }
      }
    });
  });
  return resData;
}
