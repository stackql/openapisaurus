import { parse } from "https://deno.land/std@0.190.0/flags/mod.ts";
import { usage } from "./lib/program/usage.ts";
import { splitApiDoc } from "./lib/commands/split.ts";
import { generateDevDocs } from "./lib/commands/provider-dev.ts";
import { buildDocs } from "./lib/commands/provider-build.ts";
import { formatApiSpec } from "./lib/commands/format-spec.ts";
import { 
  parseSplitArgs,
  parseDevArgs,
  parseBuildArgs,
  parseFormatArgs,
} from "./lib/program/args.ts";

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
  case "help": {
    console.log(`${usage.program}`);
    break;    
  }
  default:
    console.log(`${usage.program}`);
    break;
}