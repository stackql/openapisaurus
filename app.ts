#!/usr/bin/env deno run --allow-net --allow-read app.ts split --inputdir=fred --outputdir=fred2 --verbose

// chmod +x app.ts
// ln -s app.ts /usr/local/bin/openapisaurus
// openapisaurus --name=John --age=30 --foo=bar positional-arg

import { parse } from "https://deno.land/std/flags/mod.ts";
import * as types from "./types.ts";
import { splitApiDoc } from "./split.ts";
import { yellow, red } from "https://deno.land/std@0.178.0/fmt/colors.ts";;

const banner = String.raw`
 ___   ___  ___  ___  ___ _ ___   (_)
/ _ \ / _ \/ -_)/ _ \/ _  // _ \ / /
\___// .__/\__//_//_/\_,_// .__//_/
    /_/                  /_/   
	⠀⠀⠀⠀⠀⠀⢀⣀⡤⠤⠤⠤⠤⣄⣀⠀⠀⠀⠀⠀
	⠀⠀⠀⠀⣠⠞⠉⠀⠀⠀⠀⠀⠀⠀⠈⠓⢦⡀⠀⠀
	⠀⠀⢠⠞⠁⣤⣶⣿⣿⡿⢿⣿⣶⣄⠀⠀⠀⠙⣆⠀
	⠀⢀⡎⠀⣾⣿⣿⣿⣿⣷⣴⣿⣿⣿⣷⠀⠀⠀⠘⣆
	⠀⢸⠁⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⢹
	⠀⢸⠀⠀⠈⠙⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⢸
	⠀⠸⡆⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⣿⣇⠀⠀⡞
	⠀⠀⠹⡄⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⣿⠿⢀⡼⠁
	⠀⠀⠀⠙⠦⣀⠀⠀⠀⠀⠀⣿⠿⠿⠋⢁⡤⠏⠀⠀
	⠀⠀⠀⠀⠀⠈⠑⠶⠤⣄⣀⣀⠤⠴⠒⠉⠀⠀⠀⠀
  ___ ___ _ __ __ ____ __ __ ___
 (_-</ _  // // // __// // /(_-<
/___/\_,_/ \_,_//_/   \_,_//___/
`;

const banner2 = String.raw` 
 ___   ___  ___  ___  ___ _ ___   (_)___ ___ _ __ __ ____ __ __ ___
/ _ \ / _ \/ -_)/ _ \/ _  // _ \ / /(_-</ _  // // // __// // /(_-<
\___// .__/\__//_//_/\_,_// .__//_//___/\_,_/ \_,_//_/   \_,_//___/
   /_/                  /_/                                       
`

const usage = {
  program: `${banner}
  Usage: 
    ${yellow('openapisaurus <command> [options]')}

  Commands:
    split   Split an OpenAPI spec into multiple service scoped documents.
    dev     Generate stackql provider development provider docs.
    build   Build deployable stackql provider docs. 
  `,
  split: `${banner2}
  Usage: 
    ${yellow('openapisaurus split <apiDoc> <flags>')}  

  Arguments:
    apiDoc  [REQUIRED] OpenAPI specification to be split.

  Flags:
    --providerName      [REQUIRED] Name of the provider.
    --svcDiscriminator  [REQUIRED] JSONPath expression to extract the service name from the OpenAPI spec.
    --exclude           [OPTIONAL] JSONPath expression for paths to exclude from processing.
    --outputDir         [OPTIONAL] Directory to write the generated stackql provider development documents to. (defaults to cwd)
    --overwrite         [OPTIONAL] Overwrite existing files. (defaults to false)
    --verbose           [OPTIONAL] Verbose output (defaults to false).
  `,
  dev: `${banner2}
  Usage: 
    ${yellow('openapisaurus dev <apiDoc> <flags>')}

  Arguments:
    apiDoc  [REQUIRED] OpenAPI specification to be split.
  `,
  build: `${banner2}
  Usage: 
    ${yellow('openapisaurus build <apiDoc> <flags>')}

  Arguments:
    apiDoc  [REQUIRED] OpenAPI specification to be split.
  `,
};

const args = parse(Deno.args);
const command = args._[0];

function parseSplitArgs(args: any): types.splitArgs | false {
  
  // TESTS : 
  // deno run --allow-net --allow-read app.ts split ref/myprovider --providerName=myprovider --svcdiscriminator='$["tags"][0]' --verbose
  // (FAIL) deno run --allow-net --allow-read app.ts split ref/myprovider
  // (FAIL) deno run --allow-net --allow-read app.ts split --providerName=myprovider --svcdiscriminator='$["tags"][0]' --verbose

  /*
deno run \
--allow-net \
--allow-read \
--allow-write \
app.ts split \
../../local-registry/ref/fivetran/swagger.json \
--providerName=myprovider \
--svcdiscriminator='["tags"][0]' \
--overwrite \
--verbose 
  */

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

function parseDevArgs(args: any): any | false {

  return false;
}

function parseBuildArgs(args: any): any | false {
  return false;

}

switch (command) {
  case "split":
    const splitArgs = parseSplitArgs(args);
    splitArgs ? await splitApiDoc(splitArgs) : null;
    break;
  case "dev":
    parseDevArgs(args) ? console.log("dev docs") : console.log("show help");
    break;
  case "build":
    parseBuildArgs(args) ? console.log("build docs") : console.log("show help");
    break;
  case "help":
    console.log(`${usage.program}`);
    break;    
  default:
    console.log(`${usage.program}`);
    break;
}