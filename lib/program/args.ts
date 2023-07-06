// deno-lint-ignore-file no-explicit-any
import { red } from "https://deno.land/std@0.178.0/fmt/colors.ts";
import { usage } from "./usage.ts";
import * as types from "../types/types.ts";

//
// format args
//
export function parseFormatArgs(args: any): types.formatArgs | false {
  const apiDoc = args._[1];
  const outputFileName = args._[2];
  
  const formatArgs: types.formatArgs = {
    apiDoc: apiDoc,
    outputFileName: outputFileName,
    overwrite: true,
    verbose: true,
  };

  return formatArgs;

}

//
// split args
//
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
    const outputDir: string = args.outputDir || Deno.cwd();
    const exclude: string | false = args.exclude || false;
    const verbose: boolean = args.verbose || false;
    const overwrite: boolean = args.overwrite || false;
  
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

//
// dev args
//
export function parseDevArgs(args: any): types.devArgs | false {
  
    if (args._.length !== 2) {
      console.log(`${red('ERROR: need to provide an apiDocDir containing OpenAPI docs to process.')}
      ${usage.dev}
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
    let providerName: string;
  
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
    const resDiscriminator: string = args.resDiscriminator || 'path_tokens';
    const providerConfig: string = args.providerConfig || '{ "auth": { "type": "null_auth" }}';
    const methodKey: string = args.methodKey || 'operationId';
    const verbose: boolean = args.verbose || false;
    const overwrite: boolean = args.overwrite || false;
  
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

//
// build args
//
export function parseBuildArgs(args: any): any | false {

  if (args._.length !== 2) {
    console.log(`${red('ERROR: need to provide an apiDocDir containing OpenAPI specs and StackQL dev docs to process.')}
    ${usage.build}
    `);
    return false;
  }

  // positional args
  const apiDocDir = args._[1];

  if (apiDocDir === 'help'){
    console.log(`${usage.build}`);
    return false;
  }

  // mandatory named args
  let providerName: string;
  let outputDir: string;

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

  if ('outputDir' in args){
    outputDir = args.outputDir;
  } else if('outputdir' in args) {
    outputDir = args.outputdir;
  } else {
    console.log(`${red('ERROR: outputDir not provided')}
    ${usage.split}
    `);
    return false;
  }  

  // optional named args
  const servers: string | false = args.servers || false;
  const verbose: boolean = args.verbose || false;
  const overwrite: boolean = args.overwrite || false;

  const buildArgs: types.buildArgs = {
    apiDocDir: apiDocDir,
    providerName: providerName,
    outputDir: outputDir,
    servers: servers,
    overwrite: overwrite,
    verbose: verbose,
  };  

  return buildArgs;
}
