import { readSync } from "https://deno.land/x/openapi@0.1.0/mod.ts";
import * as types from "./types.ts";
import { logger } from "./util/logging.ts";
import { providerVersion, operations } from "./util/constants.ts";
import {
  initProviderData,
  initResData,
  getResourceName,
  addResource,
  getOperationId,
  addOperation,
  updateProviderData,
  addSqlVerb,
} from "./util/dev-functions/utils.ts";
import { ensureDirSync, existsSync } from "https://deno.land/std/fs/mod.ts";
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
    providerConfig
  );

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
