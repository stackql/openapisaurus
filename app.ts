import { parse } from "https://deno.land/std/flags/mod.ts";
import { usage } from "./util/usage.ts";
import { splitApiDoc } from "./split.ts";
import { generateDevDocs } from "./provider-dev.ts";
import { buildDocs } from "./provider-build.ts";
import { 
  parseSplitArgs,
  parseDevArgs,
  parseBuildArgs
} from "./util/args.ts";

const args = parse(Deno.args);
const command = args._[0];

switch (command) {
  case "split":
    const splitArgs = parseSplitArgs(args);
    splitArgs ? await splitApiDoc(splitArgs) : null;
    break;
  case "dev":
    const devArgs = parseDevArgs(args);
    devArgs ? await generateDevDocs(devArgs) : null;
    break;
  case "build":
    const buildArgs = parseBuildArgs(args);
    buildArgs ? await buildDocs(buildArgs) : null;
    break;
  case "help":
    console.log(`${usage.program}`);
    break;    
  default:
    console.log(`${usage.program}`);
    break;
}