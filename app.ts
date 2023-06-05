// deno modules
import { parse } from "https://deno.land/std@0.190.0/flags/mod.ts";
// relative imports
import { usage } from "./lib/program/usage.ts";
import { 
  parseSplitArgs,
  parseDevArgs,
  parseBuildArgs,
  parseFormatArgs,
} from "./lib/program/args.ts";
import { splitApiDoc } from "./commands/split.ts";
import { generateDevDocs } from "./commands/provider-dev.ts";
import { buildDocs } from "./commands/provider-build.ts";
import { formatApiSpec } from "./commands/format-spec.ts";

const args = parse(Deno.args);
const command = args._[0];

switch (command) {
  case "split": {
    const splitArgs = parseSplitArgs(args);
    splitArgs ? await splitApiDoc(splitArgs) : null;
    break;
  }
  case "dev": {
    const devArgs = parseDevArgs(args);
    devArgs ? await generateDevDocs(devArgs) : null;
    break;
  }
  case "build": {
    const buildArgs = parseBuildArgs(args);
    buildArgs ? await buildDocs(buildArgs) : null;
    break;
  }
  case "format": {
    const formatArgs = parseFormatArgs(args);
    formatArgs ? await formatApiSpec(formatArgs) : null;
    break;    
  }
  case "help": 
    console.log(`${usage.program}`);
    break;    
  default:
    console.log(`${usage.program}`);
    break;
}