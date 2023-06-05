// deno modules
import * as log from "https://deno.land/std@0.190.0/log/mod.ts";

log.setup({
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