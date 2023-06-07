//
// service name mapping
//
export interface IServicesMap {
    [originalServiceName: string]: string;
}

//
// service descriptions
//
export interface IServiceDescriptions {
    [serviceName: string]: string;
}

//
// resource name mapping by name or operationId
//
interface INameMap {
    [inResourceName: string]: string;
}

interface IOpIdMap {
    [opId: string]: string;
}

interface IServiceResourceMap {
    nameMap?: INameMap;
    opIdMap?: IOpIdMap;
}

export interface IResourcesMap {
    [service: string]: IServiceResourceMap;
}

//
// rename methods based on operationId
//
interface IOperationMethodMap {
    [operationId: string]: string;
}

interface IResourceMethodMap {
    [resource: string]: IOperationMethodMap;
}

export interface IMethodNameMap {
    [service: string]: IResourceMethodMap;
}

//
// map object keys and sql verbs
//
interface OperationDetail {
    objectKey?: string;
    sqlVerb?: string;
}
  
interface ResourceDetail {
    [resource: string]: {
      [operation: string]: OperationDetail;
    };
}
  
interface IObjectKeysAndSqlVerbs {
    _defaultObjectKey?: string;
    services: {
        [service: string]: ResourceDetail;
    }
}

//
// provider data
//
export interface IProviderData {
    servicesMap?: IServicesMap;
    resourcesMap?: IResourcesMap;
    methodNameMap?: IMethodNameMap;
    objectKeysAndSqlVerbs?: IObjectKeysAndSqlVerbs;
}