#!/usr/bin/env deno run --allow-net --allow-read app.ts split --inputdir=fred --outputdir=fred2 --verbose

// chmod +x app.ts
// ln -s app.ts /usr/local/bin/openapisaurus
// openapisaurus --name=John --age=30 --foo=bar positional-arg

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

import { parse } from "https://deno.land/std/flags/mod.ts"
const args = parse(Deno.args);
const command = args._[0];

const usage = {
  program: `${banner}
  Usage: openapisaurus <command> [options]

  Commands:
    split   Split an OpenAPI spec into multiple service scoped documents.
    dev     Generate stackql provider development provider docs.
    build   Build deployable stackql provider docs. 
  `,
  split: `${banner2}
  Usage: openapisaurus split <apiDoc> <flags>

  Arguments:
    apiDoc  [REQUIRED] OpenAPI specification to be split.

  `,
  dev: `${banner2}
  Usage: openapisaurus dev <apiDoc> <flags>

  Arguments:
    apiDoc  [REQUIRED] OpenAPI specification to be split.
  `,
  build: `${banner2}
  Usage: openapisaurus build <apiDoc> <flags>

  Arguments:
    apiDoc  [REQUIRED] OpenAPI specification to be split.
  `,
};



function parseSplitArgs(args: any): any | false {
  
  // TESTS : 
  // deno run --allow-net --allow-read app.ts split ref/myprovider --providerName=myprovider --svcdiscriminator='$["tags"][0]' --verbose
  // deno run --allow-net --allow-read app.ts split fred --inputdir=fred --outputdir=fred2 --verbose

  if (args._.length !== 2) {
    console.log(usage.split);
    return false;
  }

  // positional args
  const apiDoc = args._[1];
  
  // mandatory named args
  let providerName: any;
  let svcdiscriminator: any;

  if ('providerName' in args) {
    providerName = args.providerName;
  } else {
    console.log(`ERROR: providerName not provided
    ${usage.split}
    `);
    return false;
  }

  if ('svcdiscriminator' in args) {
    svcdiscriminator = args.svcdiscriminator;
  } else {
    console.log(`ERROR: svcdiscriminator not provided
    ${usage.split}
    `);
    return false;
  }

  // optional named args
  let outputdir: string = Deno.cwd();

  return {
    apiDoc: apiDoc, 
    providerName: providerName,
    svcdiscriminator: svcdiscriminator,
    outputdir: outputdir,
  };
}

//       {
//         name: 'output',
//         alias: 'o',
//         type: String,
//         typeLabel: '{underline directory}',
//         description: '[OPTIONAL] Directory to write the generated stackql provider development documents to. (defaults to cwd)',
//       },
//       {
//         name: 'overwrite',
//         type: Boolean,
//         description: overwriteDesc,
//       },        
//       {
//         name: 'debug',
//         alias: 'd',
//         type: Boolean,
//         description: debugDesc,
//       },        
//     ]
//   }



function parseDevArgs(args: any): any | false {

  return false;
}

function parseBuildArgs(args: any): any | false {
  return false;

}

switch (command) {
  case "split":
    parseSplitArgs(args) ? console.log("split docs") : console.log("show help");
    console.log(args);
    break;
  case "dev":
    parseDevArgs(args) ? console.log("dev docs") : console.log("show help");
    break;
  case "build":
    parseBuildArgs(args) ? console.log("build docs") : console.log("show help");
    break;
  case "help":
    console.log(args);
    break;    
  default:
    console.log(`${usage.program}`);
    break;
}



console.log(command);
