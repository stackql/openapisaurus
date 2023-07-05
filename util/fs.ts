import { 
    existsSync, 
    mkdirSync 
} from "https://deno.land/std@0.170.0/fs/mod.ts";
import { logger } from "./logging.ts";

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
