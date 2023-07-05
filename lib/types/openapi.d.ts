interface IOpenAPIDoc {
    openapi: string;
    info: IOpenAPIInfo;
    servers?: IOpenAPIServer[];
    paths: IOpenAPIPaths;
    components?: IOpenAPIComponents;
    security?: IOpenAPISecurityRequirement[];
    tags?: IOpenAPITag[];
    externalDocs?: IOpenAPIExternalDocumentation;
}

// interface IOpenAPIInfo {
//     title: string;
//     description?: string;
//     termsOfService?: string;
//     contact?: IOpenAPIContact;
//     license?: IOpenAPILicense;
//     version: string;
// }

interface IOpenAPIInfo {
    title: string;
    version: string;
    [key: string]: unknown;  // This allows additional properties with any name and type
  }

interface IOpenAPIContact {
    name?: string;
    url?: string;
    email?: string;
}

interface IOpenAPILicense {
    name: string;
    url?: string;
}

interface IOpenAPIServer {
    url: string;
    description?: string;
    variables?: { [key: string]: IOpenAPIServerVariable };
}

interface IOpenAPIServerVariable {
    enum?: string[];
    default: string;
    description?: string;
}

interface IOpenAPIPaths {
    [path: string]: IOpenAPIPathItem;
}

interface IOpenAPIPathItem {
    $ref?: string;
    summary?: string;
    description?: string;
    get?: IOpenAPIOperation;
    put?: IOpenAPIOperation;
    post?: IOpenAPIOperation;
    delete?: IOpenAPIOperation;
    options?: IOpenAPIOperation;
    head?: IOpenAPIOperation;
    patch?: IOpenAPIOperation;
    trace?: IOpenAPIOperation;
    servers?: IOpenAPIServer[];
    parameters?: IOpenAPIParameter[];

    // index signature
    [key: string]: IOpenAPIOperation | string | IOpenAPIServer[] | IOpenAPIParameter[] | undefined;
}


export interface IOpenAPIOperation {
    tags?: string[];
    summary?: string;
    description?: string;
    externalDocs?: IOpenAPIExternalDocumentation;
    operationId?: string;
    parameters?: IOpenAPIParameter[];
    requestBody?: IOpenAPIRequestBody;
    responses: IOpenAPIResponses;
    callbacks?: IOpenAPICallbacks;
    deprecated?: boolean;
    security?: IOpenAPISecurityRequirement[];
    servers?: IOpenAPIServer[];
}

interface IOpenAPIParameter {
    name: string;
    in: string;
    description?: string;
    required?: boolean;
    deprecated?: boolean;
    allowEmptyValue?: boolean;
    style?: string;
    explode?: boolean;
    allowReserved?: boolean;
    schema?: IOpenAPISchema;
    example?: unknown;
    examples?: { [key: string]: IOpenAPIExample };
    content?: { [mediaType: string]: IOpenAPIMediaType };
}

interface IOpenAPIRequestBody {
    description?: string;
    content: { [mediaType: string]: IOpenAPIMediaType };
    required?: boolean;
}

interface IOpenAPIResponses {
    [statusCode: string]: IOpenAPIResponse;
}

interface IOpenAPIResponse {
    description: string;
    headers?: { [headerName: string]: IOpenAPIHeader };
    content?: { [mediaType: string]: IOpenAPIMediaType };
    links?: { [linkName: string]: IOpenAPILink };
}

interface IOpenAPIComponents {
    schemas?: { [schemaName: string]: IOpenAPISchema };
    responses?: { [responseName: string]: IOpenAPIResponse };
    parameters?: { [parameterName: string]: IOpenAPIParameter };
    examples?: { [exampleName: string]: IOpenAPIExample };
    requestBodies?: { [requestBodyName: string]: IOpenAPIRequestBody };
    headers?: { [headerName: string]: IOpenAPIHeader };
    securitySchemes?: { [securitySchemeName: string]: IOpenAPISecurityScheme };
    links?: { [linkName: string]: IOpenAPILink };
    callbacks?: { [callbackName: string]: IOpenAPICallback };
}

interface IOpenAPISchema {
    type?: string;
    properties?: {
        [propertyName: string]: IOpenAPISchema;
    };
}

interface IOpenAPISecurityRequirement {
    [name: string]: string[];
}

interface IOpenAPITag {
    name: string;
    description?: string;
    externalDocs?: IOpenAPIExternalDocumentation;
}

interface IOpenAPIExternalDocumentation {
    description?: string;
    url: string;
}

interface IOpenAPICallback {
    [expression: string]: IOpenAPIPathItem;
}

interface IOpenAPICallbacks {
    [callbackName: string]: IOpenAPICallback | string;
}

interface IOpenAPIExample {
    summary?: string;
    description?: string;
    value?: unknown;
    externalValue?: string;
}

interface IOpenAPIMediaType {
    schema?: IOpenAPISchema;
    example?: unknown;
    examples?: { [exampleName: string]: IOpenAPIExample | string };
    encoding?: { [encodingName: string]: IOpenAPIEncoding };
}

interface IOpenAPIHeader {
    description?: string;
    required?: boolean;
    deprecated?: boolean;
    allowEmptyValue?: boolean;
    style?: string;
    explode?: boolean;
    allowReserved?: boolean;
    schema?: IOpenAPISchema;
    example?: unknown;
    examples?: { [exampleName: string]: IOpenAPIExample | string };
    content?: { [mediaType: string]: IOpenAPIMediaType };
}

interface IOpenAPILink {
    operationRef?: string;
    operationId?: string;
    parameters?: { [parameterName: string]: unknown };
    requestBody?: unknown;
    description?: string;
    server?: IOpenAPIServer;
}

interface IOpenAPISecurityScheme {
    type: string;
    description?: string;
    name?: string;
    in?: string;
    scheme?: string;
    bearerFormat?: string;
    flows?: IOpenAPIOAuthFlows;
    openIdConnectUrl?: string;
}

interface IOpenAPIOAuthFlows {
    implicit?: IOpenAPIOAuthFlow;
    password?: IOpenAPIOAuthFlow;
    clientCredentials?: IOpenAPIOAuthFlow;
    authorizationCode?: IOpenAPIOAuthFlow;
}

interface IOpenAPIOAuthFlow {
    authorizationUrl: string;
    tokenUrl: string;
    refreshUrl?: string;
    scopes: { [scopeName: string]: string };
}

interface IOpenAPIEncoding {
    contentType?: string;
    headers?: { [headerName: string]: IOpenAPIHeader | string };
    style?: string;
    explode?: boolean;
    allowReserved?: boolean;
}

export { IOpenAPIDoc, IOpenAPIPaths, IOpenAPIPathItem };

