interface ISplitArgs {
    apiDoc: string,
    providerName: string,
    svcDiscriminator: string,
    exclude: string | false,
    outputDir: string,
    overwrite: boolean,
    verbose: boolean,
  }
  
  interface IDevArgs {
      apiDocDir: string;
      providerName: string;
      resDiscriminator: string;
      providerConfig: string;
      methodKey: string;
      overwrite: boolean;
      verbose: boolean;
  }
  
  interface IBuildArgs {
    apiDocDir: string;
    providerName: string | undefined;
    outputDir: string | undefined;
    servers: string | false;
    overwrite: boolean;
    verbose: boolean;
  }
  
  interface IFormatArgs {
    apiDoc: string;
    outputFileName: string;
    overwrite: boolean;
    verbose: boolean;
  }

export { 
    ISplitArgs, 
    IDevArgs,
    IBuildArgs,
    IFormatArgs
};
