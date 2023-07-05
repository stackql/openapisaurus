export interface splitArgs {
    apiDoc: string;
    providerName: string;
    svcDiscriminator: string;
    outputDir: string;
    overwrite: boolean;
    verbose: boolean;
}

export interface devArgs {
    apiDocDir: string;
    providerName: string;
    resDiscriminator: string;
    providerConfig: string;
    methodKey: string;
    overwrite: boolean;
    verbose: boolean;
    serviceName?: string;
}

export interface buildArgs {
  apiDocDir: string;
  providerName: string;
  outputDir: string;
  servers: string | false;
  overwrite: boolean;
  verbose: boolean;
}