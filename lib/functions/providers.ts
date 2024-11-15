// deno-lint-ignore-file no-explicit-any
import * as providers from '../providers/index.ts';
// import { plural, singular } from "https://deno.land/x/deno_plural/mod.ts";

interface Provider {
    servicesMap: Record<string, string>;
    resourcesMap: Record<string, any>;
    stackqlMethodNameMap: Record<string, any>;
    objectKeysAndSqlVerbsMap: Record<string, any>;
    nonDataFields: string[];
}

const typedProviders = providers as unknown as Record<string, Provider>;

export function updateServiceName(
    providerName: string,
    inServiceName: string,
    debug: boolean,
    logger: any
): string {
    debug ? logger.debug(`checking for service name updates for [${inServiceName}] in [${providerName}]...`) : null;

    // Check if the provider exists in the typedProviders object and retrieve the mapped service name.
    const outServiceName = typedProviders[providerName]?.servicesMap[inServiceName] ?? inServiceName;

    debug ? logger.debug(`service name changed from ${inServiceName} to ${outServiceName}`) : null;
    return outServiceName;
}

// RESOURCE_NAME
export function getResourceNameFromOperationId(
    providerName: string, 
    serviceName: string, 
    operationId: string, 
    debug: boolean, 
    logger: any): string | false {

    const logPrefix = 'RESOURCE_NAME';

    debug ? logger.debug(`[${logPrefix}] checking for resource name from service [${serviceName}], operationId [${operationId}] in [${providerName}]...`) : null;

    // Check if the provider exists in the typedProviders object and teh service exists, then retrieve the mapped resource name, otherwise return false.
    const outResourceName = typedProviders[providerName]?.resourcesMap?.[serviceName]?.[operationId] ?? false;

    if (outResourceName) {
        debug ? logger.debug(`[${logPrefix}] resource name found for ${serviceName} in ${providerName}`) : null;
    }
    return outResourceName;
}

// METHOD_NAME
export function getStackQLMethodNameforProvider(
    providerName: string, 
    service: string, 
    operationId: string, 
    debug: boolean,
    logger: any, 
): string | false {

    const logPrefix = 'METHOD_NAME';

    debug ? logger.debug(`[${logPrefix}] checking for stackQL method name for service [${service}], operationId [${operationId}] in provider [${providerName}]...`) : null;

    // Access the provider's stackqlMethodNameMap if it exists
    const provider = typedProviders[providerName];
    const methodName = provider?.stackqlMethodNameMap?.[service]?.[operationId] ?? false;

    if (methodName) {
        debug ? logger.debug(`[${logPrefix}] found method name: ${methodName} for operationId: ${operationId} in service: ${service}`): null;
        return methodName;
    } 

    return false;
}

// OBJECT_KEY
export function getNonDataFieldsForProvider(
    providerName: string,
    debug: boolean,
    logger: any,    
): string[] {

    const provider = typedProviders[providerName];
    return provider?.nonDataFields ?? [];

}

// OBJECT_KEY
export function getObjectKeyforProvider(
    providerName: string, 
    service: string, 
    resource: string, 
    stackQLMethodName: string, 
    debug: boolean,
    logger: any,
    ): string | false {

    const logPrefix = 'OBJECT_KEY';

    debug ? logger.debug(`[${logPrefix}] checking for object key for provider [${providerName}], service [${service}], method [${stackQLMethodName}]...`): null;

    const provider = typedProviders[providerName];
    const objectKey = provider?.objectKeysAndSqlVerbsMap?.[service]?.[resource]?.[stackQLMethodName]?.objectKey ?? false;
    
    if (objectKey) {
        debug ? logger.debug(`[${logPrefix}] found objectKey: ${objectKey} for method: ${stackQLMethodName} in service: ${service}`): null;
        return objectKey;
    } 

    return false;
}

// SQL_VERB
export function getSqlVerbforProvider(
    providerName: string, 
    service: string, 
    resource: string, 
    stackQLMethodName: string, 
    debug: boolean,
    logger: any, 
    ): string | false {

    const logPrefix = 'SQL_VERB';

    debug ? logger.debug(`[${logPrefix}] checking for sqlverb for provider [${providerName}], service [${service}], resource [${resource}], method [${stackQLMethodName}]...`): null;

    const provider = typedProviders[providerName];

    const sqlVerb = provider?.objectKeysAndSqlVerbsMap?.[service]?.[resource]?.[stackQLMethodName]?.sqlVerb ?? false;
    
    if (sqlVerb) {
        debug ? logger.debug(`[${logPrefix}] found sqlVerb: ${sqlVerb} for method: ${stackQLMethodName} in service: ${service}, resource: ${resource}`): null;
        return sqlVerb;
    } 

    return false;

}