import { readSync } from "https://deno.land/x/openapi@0.1.0/mod.ts";

async function spliApiDoc(inputFile: string): Promise<string> {
    return readSync(inputFile);
}