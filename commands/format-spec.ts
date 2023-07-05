// deno modules
import { readSync } from "https://deno.land/x/openapi@0.1.0/mod.ts";
import { existsSync } from "https://deno.land/std@0.190.0/fs/mod.ts";
import * as yaml from "https://deno.land/x/js_yaml_port@3.14.0/js-yaml.js";
// relative imports
import * as types from "../lib/types/args.d.ts";
import { logger } from "../lib/util/logging.ts";

// function to recursively process openapi spec
function processSpec(spec: Record<string, unknown>) {
  for (const key in spec) {
    if (typeof spec[key] === "object" && spec[key] !== null) {
      processSpec(spec[key] as Record<string, unknown>);
    }

    if (key === "description" || key === "summary") {
      // remove html tags and extra empty lines
      spec[key] = (spec[key] as string).replace(/(<([^>]+)>)/ig, "").replace(
        /^\s*\n/gm,
        "",
      );
    }

    if (key === "summary" && spec["description"] === undefined) {
      spec["description"] = spec[key];
    }
  }
}

export async function formatApiSpec(
  formatArgs: types.IFormatArgs,
): Promise<boolean> {
  await Promise.resolve();
  try {
    formatArgs.verbose
      ? logger.debug(`formatArgs: ${JSON.stringify(formatArgs)}`)
      : null;

    const { apiDoc, outputFileName, overwrite, verbose } = formatArgs;

    // check if file exists
    if (!existsSync(apiDoc)) {
      throw new Error(`File ${apiDoc} does not exist.`);
    }

    verbose ? logger.info(`reading ${apiDoc}...`) : null;

    const apiData = readSync(apiDoc);
    if (!apiData) {
      logger.error(`failed to parse ${apiDoc}`);
      return false;
    }

    processSpec(apiData as Record<string, unknown>);

    verbose ? logger.info(`writing out to ${outputFileName}...`) : null;

    if (existsSync(outputFileName) && !overwrite) {
      throw new Error(
        `File ${outputFileName} already exists. Overwrite is set to false.`,
      );
    }

    Deno.writeTextFileSync(
      outputFileName,
      yaml.dump(apiData, { lineWidth: -1 }),
    );

    return true;
  } catch (error) {
    logger.error(`failed to format spec : ${error}`);
    return false;
  }
}
