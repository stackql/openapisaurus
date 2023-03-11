import { red } from "https://deno.land/std@0.178.0/fmt/colors.ts";
import { usage } from "./usage.ts";
import * as types from "../types.ts";

export function parseSplitArgs(args: any): types.splitArgs | false {

    if (args._.length !== 2) {
      console.log(`${red('ERROR: need to provide an apiDoc to split.')}
      ${usage.split}
      `);
      return false;
    }
  
    // positional args
    const apiDoc = args._[1];
  
    if (apiDoc === 'help'){
      console.log(`${usage.split}`);
      return false;
    }
    
    // mandatory named args
    let providerName: any;
    let svcDiscriminator: any;
  
    if ('providerName' in args){
      providerName = args.providerName;
    } else if('providername' in args) {
      providerName = args.providername;
    } else {
      console.log(`${red('ERROR: providerName not provided')}
      ${usage.split}
      `);
      return false;
    }
  
    if ('svcDiscriminator' in args){
      svcDiscriminator = args.svcDiscriminator;
    } else if('svcdiscriminator' in args) {
      svcDiscriminator = args.svcdiscriminator;    
    } else {
      console.log(`${red('ERROR: svcDiscriminator not provided')}
      ${usage.split}
      `);
      return false;
    }
  
    // optional named args
    let outputDir: string = args.outputDir || Deno.cwd();
    let exclude: string | false = args.exclude || false;
    let verbose: boolean = args.verbose || false;
    let overwrite: boolean = args.overwrite || false;
  
    const splitArgs: types.splitArgs = {
      apiDoc: apiDoc,
      providerName: providerName,
      svcDiscriminator: svcDiscriminator,
      exclude: exclude,
      outputDir: outputDir,
      overwrite: overwrite,
      verbose: verbose,
    };
  
    return splitArgs;
}
  
export function parseDevArgs(args: any): types.devArgs | false {
  
    if (args._.length !== 2) {
      console.log(`${red('ERROR: need to provide an apiDocDir containing OpenAPI docs to process.')}
      ${usage.split}
      `);
      return false;
    }
  
    // positional args
    const apiDocDir = args._[1];
  
    if (apiDocDir === 'help'){
      console.log(`${usage.dev}`);
      return false;
    }
    
    // mandatory named args
    let providerName: any;
  
    if ('providerName' in args){
      providerName = args.providerName;
    } else if('providername' in args) {
      providerName = args.providername;
    } else {
      console.log(`${red('ERROR: providerName not provided')}
      ${usage.split}
      `);
      return false;
    }
  
    // optional named args
    let resDiscriminator: string = args.resDiscriminator || 'path_tokens';
    let providerConfig: string = args.providerConfig || '{ "auth": { "type": "null_auth" }}';
    let methodKey: string = args.methodKey || 'operationId';
    let verbose: boolean = args.verbose || false;
    let overwrite: boolean = args.overwrite || false;
  
    const devArgs: types.devArgs = {
      apiDocDir: apiDocDir,
      providerName: providerName,
      resDiscriminator: resDiscriminator,
      providerConfig: providerConfig,
      methodKey: methodKey,
      overwrite: overwrite,
      verbose: verbose,
    };  
    
    return devArgs;
}
  
export function parseBuildArgs(args: any): any | false {
    return false;
}