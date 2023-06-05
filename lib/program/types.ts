export interface splitArgs {
  apiDoc: string,
  providerName: string,
  svcDiscriminator: string,
  exclude: string | false,
  outputDir: string,
  overwrite: boolean,
  verbose: boolean,
}

export interface devArgs {
    apiDocDir: string;
    providerName: string;
    resDiscriminator: string;
    providerConfig: string;
    methodKey: string;
    overwrite: boolean;
    verbose: boolean;
}

export interface buildArgs {
  apiDocDir: string;
  providerName: string | undefined;
  outputDir: string | undefined;
  servers: string | false;
  overwrite: boolean;
  verbose: boolean;
}

export interface formatArgs {
  apiDoc: string;
  outputFileName: string;
  overwrite: boolean;
  verbose: boolean;
}
