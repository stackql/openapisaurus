// deno-lint-ignore-file no-explicit-any
import { readSync } from "https://deno.land/x/openapi@0.1.0/mod.ts";
import * as yaml from "https://deno.land/x/js_yaml_port@3.14.0/js-yaml.js";
import { existsSync } from "https://deno.land/std@0.190.0/fs/mod.ts";
import * as types from "../types/types.ts";
import { logger } from "../util/logging.ts";
import { createDestDir } from "../util/fs.ts";
import { providerVersion } from "../types/constants.ts";
import { fixSchemaIssues, fixPathIssues } from "../functions/build-functions.ts";

export async function buildDocs(buildArgs: types.buildArgs): Promise<boolean> {

    buildArgs.verbose ? logger.debug(`buildArgs: ${JSON.stringify(buildArgs)}`) : null;

    const apiDocDirRoot = buildArgs.apiDocDir;
    const providerName = buildArgs.providerName;
    const servers = buildArgs.servers;
    const outputDir = buildArgs.outputDir;
    const overwrite = buildArgs.overwrite;
    const debug = buildArgs.verbose;
    
    const inputDir = `${apiDocDirRoot}/${providerName}/${providerVersion}`;
    const destDir = `${outputDir}/${providerName}/${providerVersion}`;

    let serversObj = [];
    if (servers){
        try {
            serversObj = JSON.parse(servers);
            logger.info(`servers will be replaced with ${JSON.stringify(serversObj)}`);
        } catch (_e) {
            logger.error(`invalid servers value: ${servers}, not JSON`);
            return false
        }
    }
    
    // check if dest dir exists and create
    if(!createDestDir(`${destDir}/services`, overwrite)){
        return false
    }

    // check for provider.yaml doc
    if (!existsSync(`${inputDir}/provider.yaml`)) {
        logger.error(`${inputDir}/provider.yaml does not exist`);
        Deno.exit(1);
    } else {
        logger.info(`${inputDir}/provider.yaml exists`);
    }

    // check for services dir
    if (!existsSync(`${inputDir}/services`)){
        logger.error(`${inputDir}/services does not exist`);
        return false
    }

    // write out provider.yaml to target
    try {
        logger.info(`writing out ${inputDir}/provider.yaml`);
        const data = Deno.readTextFileSync(`${inputDir}/provider.yaml`);
        Deno.writeTextFileSync(`${destDir}/provider.yaml`, data);
    } catch (e) {
        logger.error(`failed to write ${destDir}/provider.yaml`);
        console.log(e);
        return false;
    }
    
    // iterate through services dir
    const svcDir = `${inputDir}/services`;
    for await (const dirEntry of Deno.readDir(svcDir)) {
        if (!dirEntry.isDirectory) {
            continue;
        }
        const service = dirEntry.name;
        logger.info(`processing ${service}...`);

        // check provider data if we should skip this service
        

        const outputData: Record<string, any> = {};

        // get openapi doc
        const openapiDocFile = `${inputDir}/services/${service}/${service}.yaml`;
        if (!existsSync(openapiDocFile)){
            logger.error(`${openapiDocFile} does not exist`);            
            return false
        }

        // parse openapi doc
        const api: Record<string, any> = readSync(openapiDocFile);
        if (!api){
            logger.error(`failed to parse ${openapiDocFile}`);
            return false;
        }        
        
        Object.keys(api).forEach(openapiKey => {
            outputData[openapiKey] = api[openapiKey];
        });
        

        // fix AllOf issue
        outputData['components']['schemas'] = fixSchemaIssues(outputData['components']['schemas']);

        // fix path request body issue
        outputData['paths'] = fixPathIssues(outputData['paths']);

        // replace servers?
        if (servers){
            outputData['servers'] = serversObj;
        }

        // get stackql resource definitions
        logger.info(`processing resource definitions for ${service}...`);
        const resourceDefs = yaml.load(Deno.readTextFileSync(`${inputDir}/services/${service}/${service}-resources.yaml`));

        // iterate through resources remove dev keys
        const xStackQLResources = resourceDefs['components']['x-stackQL-resources'];
        try {
            Object.keys(xStackQLResources).forEach(xStackQLResKey => {
                // delete resTokens
                delete xStackQLResources[xStackQLResKey]['resTokens'];
                
                // clean up pointers
                Object.keys(xStackQLResources[xStackQLResKey]['methods']).forEach(methodName => {
                    const newOp = xStackQLResources[xStackQLResKey]['methods'][methodName]['operation']['$ref'].split('#/').pop();
                    xStackQLResources[xStackQLResKey]['methods'][methodName]['operation'] =
                    {
                        '$ref': `#/${newOp}`
                    };
                });
                
                const newSqlVerbs: types.NewSqlVerbs = {}; 
                  
                Object.keys(xStackQLResources[xStackQLResKey]['sqlVerbs']).forEach((sqlVerb: string) => {

                    debug ? logger.debug(`processing ${service}/${xStackQLResKey}/${sqlVerb}`) : null;
                  
                    const newSqlVerb: { $ref: string }[] = [];
                    const tokens: string[] = [];
                  
                    // Sort by numTokens in descending order
                    xStackQLResources[xStackQLResKey]['sqlVerbs'][sqlVerb].sort((a: types.SqlVerbObj, b: types.SqlVerbObj) => b.numTokens - a.numTokens);
                  
                    xStackQLResources[xStackQLResKey]['sqlVerbs'][sqlVerb].forEach((sqlVerbObj: types.SqlVerbObj) => {
                      if (sqlVerbObj.enabled) {
                        tokens.push(sqlVerbObj.tokens);
                        const thisRef: { $ref: string } = { $ref: sqlVerbObj.$ref };
                        newSqlVerb.push(thisRef);
                      }
                    });
                  
                    // check if tokens are unique
                    if (tokens.length !== new Set(tokens).size) {
                      logger.error(`unreachable routes in ${service}/${xStackQLResKey}, with tokens: ${tokens}`);
                      logger.error(`tokens.length: ${tokens.length}, new Set(tokens).size: ${new Set(tokens).size}`);
                      logger.error(`tokens: ${JSON.stringify(tokens)}`);    
                      throw 'Break';
                    }
                  
                    newSqlVerbs[sqlVerb] = newSqlVerb;
                  });                

                xStackQLResources[xStackQLResKey]['sqlVerbs'] = newSqlVerbs;
            });
            
            outputData['components']['x-stackQL-resources'] = xStackQLResources
            const outputFile = `${destDir}/services/${service}.yaml`;
            logger.info(`writing service doc to ${outputFile}...`);
            Deno.writeTextFileSync(outputFile, yaml.dump(outputData, {lineWidth: -1}));
        } catch (e) {
            logger.error(e);
            return false
        }            

    }     
    return true;

}