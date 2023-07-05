// deno modules
import { readSync } from "https://deno.land/x/openapi@0.1.0/mod.ts";
import * as yaml from 'https://deno.land/x/js_yaml_port/js-yaml.js';
import { existsSync } from 'https://deno.land/std/fs/mod.ts';
// relative imports
import * as types from "../lib/types/args.d.ts";
import { logger } from "../lib/util/logging.ts";
import { createDestDir } from "../lib/util/fs.ts";
import { providerVersion } from "../lib/functions/constants.ts";
import { fixAllOffIssue } from "../lib/functions/build-functions.ts";

export async function buildDocs(buildArgs: types.IBuildArgs): Promise<boolean> {

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
        } catch (e) {
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
    };

    // write out provider.yaml to target
    try {
        logger.info(`writing out ${inputDir}/provider.yaml`);
        const data = Deno.readTextFileSync(`${inputDir}/provider.yaml`, { encoding: 'utf8' });
        Deno.writeTextFileSync(`${destDir}/provider.yaml`, data);
    } catch (e) {
        logger.error(`failed to write ${destDir}/provider.yaml`);
        console.log(e);
        return false;
    }
    
    // iterate through services dir
    const svcDir = `${inputDir}/services`;
    const serviceDirs: Deno.DirEntry[] = await Deno.readDir(svcDir);
    for await (const dirEntry of serviceDirs) {
        if (!dirEntry.isDirectory) {
            continue;
        }
        const service = dirEntry.name;
        logger.info(`processing ${service}...`);

        let outputData = {};

        // get openapi doc
        let openapiDocFile = `${inputDir}/services/${service}/${service}.yaml`;
        if (!existsSync(openapiDocFile)){
            logger.error(`${openapiDocFile} does not exist`);            
            return false
        };

        // parse openapi doc
        const api = readSync(openapiDocFile);
        if (!api){
            logger.error(`failed to parse ${openapiDocFile}`);
            return false;
        }        

        // add openapi data from service doc to outputData
        Object.keys(api).forEach(openapiKey => {
            outputData[openapiKey] = api[openapiKey];
        });

        // fix AllOf issue
        outputData['components']['schemas'] = fixAllOffIssue(outputData['components']['schemas']);

        // replace servers?
        if (servers){
            outputData['servers'] = serversObj;
        }

        // get stackql resource definitions
        logger.info(`processing resource definitions for ${service}...`);
        let resourceDefs = yaml.load(Deno.readTextFileSync(`${inputDir}/services/${service}/${service}-resources.yaml`, 'utf8'));

        // iterate through resources remove dev keys
        let xStackQLResources = resourceDefs['components']['x-stackQL-resources'];
        try {
            Object.keys(xStackQLResources).forEach(xStackQLResKey => {
                // delete resTokens
                delete xStackQLResources[xStackQLResKey]['resTokens'];
                
                // clean up pointers
                Object.keys(xStackQLResources[xStackQLResKey]['methods']).forEach(methodName => {
                    let newOp = xStackQLResources[xStackQLResKey]['methods'][methodName]['operation']['$ref'].split('#/').pop();
                    xStackQLResources[xStackQLResKey]['methods'][methodName]['operation'] =
                    {
                        '$ref': `#/${newOp}`
                    };
                });
                let newSqlVerbs = {};
                Object.keys(xStackQLResources[xStackQLResKey]['sqlVerbs']).forEach(sqlVerb => {
                    let newSqlVerb = [];
                    let tokens = [];
                    xStackQLResources[xStackQLResKey]['sqlVerbs'][sqlVerb].forEach(sqlVerbObj => {
                        if (sqlVerbObj['enabled'] === true){
                            tokens.push(sqlVerbObj['tokens']);
                            var thisRef = {};
                            thisRef['$ref'] = sqlVerbObj['$ref'];
                            newSqlVerb.push(thisRef);
                        };
                    });
                    // check if tokens are unique
                    if (tokens.length !== new Set(tokens).size){
                        logger.error(`unreachable routes in ${service}/${xStackQLResKey}, with tokens: ${tokens}`);
                        throw 'Break';
                    };
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