import * as log from "https://deno.land/std/log/mod.ts";
import { search } from "https://deno.land/x/jmespath/index.ts";

import { 
    existsSync, 
    mkdirSync 
} from "https://deno.land/std@0.170.0/fs/mod.ts";

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

function camelToSnake(inStr: string): string {
    let str = inStr.replace(/-/g, '_').replace(/ /g, '_');

    return str.replace(/\.?([A-Z])/g, function(x: string, y: string) {
        return "_" + y.toLowerCase();
    }).replace(/^_/, "");
}
  
function isMeaningfulToken(token: string, excludeParams: boolean = true): boolean {
    if (excludeParams && token.startsWith('{')) {
      return false;
    } 
    if (token.match(/[v]\d/) || token.match(/^\d/) || token == 'rest' || token == 'api' || token.length == 0) {
      return false;
    } else {
      return true;
    }
  }

function getMeaningfulPathTokens(pathKey: string): string[] {
    let path = pathKey.replace(/\./g, '/').replace(/-/g, '_');
    let outTokens: string[] = [];
    let inTokens: string[] = path.split('/');
    
    inTokens.forEach((token: string) => {
      if (isMeaningfulToken(token)) {
        outTokens.push(token);
      }
    });
  
    return outTokens;
  }

//
// EXPORTS
//

export const logger = log.getLogger('openapisaurus');

export const providerVersion = 'v1v00.00.00000';

export const operations = [
    'get',
    'put',
    'post',
    'delete',
    'options',
    'head',
    'patch',
    'trace',
];

export function createDestDir(dir: string, overwrite: boolean): boolean {
    logger.info(`checking if dest dir (${dir}) exists...`);
    if (existsSync(dir) && !overwrite) {
        logger.error(`destination Dir: ${dir} already exists`);
        return false;
    } else {
        logger.info(`creating destination dir: ${dir}`);
        Deno.mkdir(dir, { recursive: true });
        return true;
    }
}

export function isOperationExcluded(exOption: any, operation: any, discriminator: string): boolean {
  if (exOption) {
    if (search(operation, discriminator) == exOption) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export function retServiceNameAndDesc(providerName: string, operation: any, pathKey: string, discriminator: string, tags: any[]): [string, string] {
    
    if (discriminator.startsWith('svcName:')) {
      return [discriminator.split(':')[1], discriminator.split(':')[1]];
    } else {
      let thisSvc = 'svc';
      if (discriminator == 'path_tokens') {
        thisSvc = getMeaningfulPathTokens(pathKey)[0] || thisSvc;
      } else {
        console.log(discriminator);
        thisSvc = search(operation, discriminator)[0] ? search(operation, discriminator)[0].replace(/-/g, '_') : getMeaningfulPathTokens(pathKey)[0];
      }
      const serviceName = camelToSnake(thisSvc);
      return [serviceName, serviceName];
    }
  }
  
