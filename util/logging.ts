import * as log from "https://deno.land/std/log/mod.ts";

await log.setup({
    handlers: {
      console: new log.handlers.ConsoleHandler("DEBUG"),
    },
  
    loggers: {
      "openapisaurus": {
        level: "DEBUG",
        handlers: ["console"],
      },
    },
  });

export const logger = log.getLogger('openapisaurus');

export function logDebug(msg: string, debug: boolean){
    debug && logger.debug(msg);
}