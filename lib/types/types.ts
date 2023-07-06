// deno-lint-ignore-file no-explicit-any
export interface splitArgs {
  apiDoc: string;
  providerName: string;
  svcDiscriminator: string;
  exclude: string | false;
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
}

export interface buildArgs {
  apiDocDir: string;
  providerName: string;
  outputDir: string;
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

export interface Service {
  [key: string]: any;
  paths?: { [key: string]: any };
  components?: {
    schemas?: { [key: string]: any };
  };
}

export interface PathItem {
  summary?: string;
  description?: string;
  get?: { [key: string]: any };
  put?: { [key: string]: any };
  post?: { [key: string]: any };
  delete?: { [key: string]: any };
  options?: { [key: string]: any };
  head?: { [key: string]: any };
  patch?: { [key: string]: any };
  trace?: { [key: string]: any };
  servers?: { [key: string]: any };
  parameters?: { [key: string]: any };
}

export interface OpenAPIPaths {
  [path: string]: OpenAPIPathItem;
}

export interface OpenAPIPathItem {
  [httpMethod: string]: OpenAPIOperation;
}

export interface OpenAPIOperation {
  responses: {
    [statusCode: string]: OpenAPIResponse;
  };
}

export interface OpenAPIResponse {
  content?: {
    [mediaType: string]: OpenAPIContent;
  };
}

export interface OpenAPIContent {
  schema?: OpenAPISchema;
}

export interface OpenAPISchema {
  type?: string;
  properties?: {
    [propertyName: string]: OpenAPISchema;
  };
}

export interface SqlVerbObj {
  $ref: string;
  path: string;
  numTokens: number;
  tokens: string;
  enabled: boolean;
  token: string;
  respSchema?: string;
}

export interface NewSqlVerbs {
  [key: string]: { $ref: string }[];
}

export interface ProviderData {
  id: string;
  name: string;
  version: string;
  config: Record<string, unknown>;
  providerServices: {
      [service: string]: {
          description?: string;
          id: string;
          name: string;
          preferred: boolean;
          service: {
              '$ref': string;
          };
          title: string;
          version: string;
      }
  }
}


