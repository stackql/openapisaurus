// deno modules
import { red } from "https://deno.land/std@0.178.0/fmt/colors.ts";
// relative imports
import { usage } from "./usage.ts";
import * as types from "./types.ts";

type ArgsType = { _: unknown[]; [key: string]: unknown };

//
// format args
//
export function parseFormatArgs(args: unknown): types.formatArgs | false {

  const typedArgs = args as ArgsType;

  switch (typedArgs._.length) {
    case 1:
      console.log(`${usage.format}`);
      return false;
    case 2:
      if (typedArgs._[1] === 'help'){
        console.log(`${usage.format}`);
        return false;
      } else {
        console.log(`${red('ERROR: need to provide an outputFileName argument.')}`);
        return false;
      }
    case 3:
      break;
    default:
      console.log(`${red('ERROR: too many arguments.')}`);
      return false;
  }

  // positional args
  const apiDoc = typedArgs._[1] as string;  // using type assertion
  const outputFileName = typedArgs._[2] as string;  // using type assertion

  // optional named args
  const verbose: boolean = typeof typedArgs.verbose === 'boolean' ? typedArgs.verbose : false;
  const overwrite: boolean = typeof typedArgs.overwrite === 'boolean' ? typedArgs.overwrite : false;
  
  const formatArgs: types.formatArgs = {
    apiDoc: apiDoc,
    outputFileName: outputFileName,
    overwrite: verbose,
    verbose: overwrite,
  };

  return formatArgs;

}

//
// split args
//
export function parseSplitArgs(args: unknown): types.splitArgs | false {

  const typedArgs = args as ArgsType;
  
  if (typedArgs._.length !== 2) {
    console.log(`${red('ERROR: need to provide an apiDoc to split.')}
    ${usage.split}
    `);
    return false;
  }

  // positional args
  const apiDoc = typedArgs._[1] as string;  // using type assertion

  if (apiDoc === 'help'){
    console.log(`${usage.split}`);
    return false;
  }
  
  // mandatory named args
  let providerName: string | undefined = undefined;
  let svcDiscriminator: string | undefined = undefined;
  
  if ('providerName' in typedArgs){
    providerName = typedArgs.providerName as string;
  } else if('providername' in typedArgs) {
    providerName = typedArgs.providername as string;
  }
  
  if ('svcDiscriminator' in typedArgs){
    svcDiscriminator = typedArgs.svcDiscriminator as string;
  } else if('svcdiscriminator' in typedArgs) {
    svcDiscriminator = typedArgs.svcdiscriminator as string;
  }
  
  if (!providerName || !svcDiscriminator) {
    console.log(`${red('ERROR: providerName or svcDiscriminator not provided')}${usage.split}`);
    return false;
  }

  // optional named args
  const outputDir: string = typeof typedArgs.outputDir === 'string' ? typedArgs.outputDir : Deno.cwd();
  const exclude: string | false = typeof typedArgs.exclude === 'string' ? typedArgs.exclude : false;
  const verbose: boolean = typeof typedArgs.verbose === 'boolean' ? typedArgs.verbose : false;
  const overwrite: boolean = typeof typedArgs.overwrite === 'boolean' ? typedArgs.overwrite : false;

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
export function parseDevArgs(args: unknown): types.devArgs | false {
  
  const typedArgs = args as ArgsType;

    if (typedArgs._.length !== 2) {
      console.log(`${red('ERROR: need to provide an apiDocDir containing OpenAPI docs to process.')}
      ${usage.dev}
      `);
      return false;
    }
  
    // positional args
    const apiDocDir = typedArgs._[1] as string;  // using type assertion
  
    if (apiDocDir === 'help'){
      console.log(`${usage.dev}`);
      return false;
    }
    
    // mandatory named args
    let providerName: string | undefined = undefined;
    if ('providerName' in typedArgs){
      providerName = typedArgs.providerName as string;
    } else if('providername' in typedArgs) {
      providerName = typedArgs.providername as string;
    } else {
      console.log(`${red('ERROR: providerName not provided')}${usage.split}`);
      return false;
    }

    // optional named args
    const resDiscriminator: string = typeof typedArgs.resDiscriminator === 'string' ? typedArgs.resDiscriminator : 'path_tokens';
    const providerConfig: string = typeof typedArgs.providerConfig === 'string' ? typedArgs.providerConfig : '{ "auth": { "type": "null_auth" }}';
    const methodKey: string = typeof typedArgs.methodKey === 'string' ? typedArgs.methodKey : 'operationId';
    const verbose: boolean = typeof typedArgs.verbose === 'boolean' ? typedArgs.verbose : false;
    const overwrite: boolean = typeof typedArgs.overwrite === 'boolean' ? typedArgs.overwrite : false;
  
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
export function parseBuildArgs(args: unknown): types.buildArgs | false {

  const typedArgs = args as ArgsType;

  if (typedArgs._.length !== 2) {
    console.log(`${red('ERROR: need to provide an apiDocDir containing OpenAPI specs and StackQL dev docs to process.')}
    ${usage.build}
    `);
    return false;
  }

  // positional args
  const apiDocDir = typedArgs._[1] as string;  // using type assertion
  
  if (apiDocDir === 'help'){
    console.log(`${usage.build}`);
    return false;
  }

  let providerName: string | undefined = undefined;
  let outputDir: string | undefined = undefined;
  
  if ('providerName' in typedArgs){
    providerName = typedArgs.providerName as string;
  } else if('providername' in typedArgs) {
    providerName = typedArgs.providername as string;
  }
  
  if ('outputDir' in typedArgs){
    outputDir = typedArgs.outputDir as string;
  } else if('outputdir' in typedArgs) {
    outputDir = typedArgs.outputdir as string;
  }

  // optional named args
  const servers: string | false = typeof typedArgs.servers === 'string' ? typedArgs.servers : false;
  const verbose: boolean = typeof typedArgs.verbose === 'boolean' ? typedArgs.verbose : false;
  const overwrite: boolean = typeof typedArgs.overwrite === 'boolean' ? typedArgs.overwrite : false;
  
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
