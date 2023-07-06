import { logger } from "./logging.ts";

export function createDestDir(dir: string, overwrite: boolean): boolean {
    try {
        logger.info(`creating destination dir: ${dir}`);
        Deno.mkdir(dir, { recursive: true });
        return true;
    } catch (error) {
        if (error instanceof Deno.errors.AlreadyExists && overwrite) {
            logger.info(`destination dir: ${dir} already exists, but overwrite is enabled`);
            return true;
        }
        logger.error(`Error creating destination dir: ${dir}`);
        return false;
    }
}
