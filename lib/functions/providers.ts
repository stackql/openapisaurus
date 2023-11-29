// deno-lint-ignore-file no-explicit-any
import * as providers from '../providers/index.ts';

interface Provider {
    servicesMap: Record<string, string>;
    resourcesMap: Record<string, any>;
    objectKeysAndSqlVerbs: Record<string, any>;
    methodNameMap: Record<string, any>;
    methodNameTransforms: Record<string, any>;
}

const typedProviders = providers as unknown as Record<string, Provider>;

export function updateServiceName(
    providerName: string, 
    inServiceName: string, 
    debug: boolean, 
    logger: any
): string {
    debug ? logger.debug(`checking for service name updates for [${inServiceName}] in [${providerName}]...`) : null;
    let outServiceName = inServiceName;
    if (providerName in typedProviders) {
        debug ? logger.debug(`provider data found for ${providerName}`) : null;
        outServiceName = typedProviders[providerName].servicesMap[inServiceName] || inServiceName;
        debug ? logger.debug(`service name changed from ${inServiceName} to ${outServiceName}`) : null;
    }
    return outServiceName;
}

function getResourceNameFromOperationId(data: any, operationId: string, debug: boolean, logger: any): string | false {
    debug ? logger.debug(`running getResourceNameFromOperationId for ${operationId}...`) : null;
    if ('opIdMap' in data) {
        if (operationId in data['opIdMap']) {
            debug ? logger.debug(`operationId data found for ${operationId}`) : null;
            return data['opIdMap'][operationId];
        }
    }
    return false;
}

function getNewResourceNameFromExisting(data: any, resourceName: string, debug: boolean, logger: any): string | false {
    debug ? logger.debug(`running getNewResourceNameFromExisting for ${resourceName}...`) : null;
    if ('nameMap' in data) {
        if (resourceName in data['nameMap']) {
            debug ? logger.debug(`resourceName data found for ${resourceName}`) : null;
            return data['nameMap'][resourceName];
        }
    }
    return false;
}

export function updateResourceName(providerName: string, service: string, inResourceName: string, operation: any, debug: boolean, logger: any): string {
    debug ? logger.debug(`checking for resource name updates for [${inResourceName}] in [${providerName}.${service}]...`) : null;
    let outResourceName = inResourceName;
    if (providerName in typedProviders) {
        debug ? logger.debug(`provider data found for ${providerName}`) : null;
        if (service in typedProviders[providerName].resourcesMap) {
            debug ? logger.debug(`service data found for ${providerName}.${service}`) : null;
            // try to get new name from operationId
            const nameFromOpIdOrNull = getResourceNameFromOperationId(typedProviders[providerName].resourcesMap[service], operation.operationId, debug, logger); 
            if (!nameFromOpIdOrNull) {
                // try to get new name from existing name
                const nameFromExistingOrNull = getNewResourceNameFromExisting(typedProviders[providerName].resourcesMap[service], inResourceName, debug, logger);
                if (nameFromExistingOrNull) {
                    outResourceName = nameFromExistingOrNull;
                    debug ? logger.debug(`resource name changed from ${inResourceName} to ${outResourceName} via name mapping`) : null;
                }
            } else {
                outResourceName = nameFromOpIdOrNull;
                debug ? logger.debug(`resource name changed from ${inResourceName} to ${outResourceName} via operationId`) : null;
            }
        }
    }

    return outResourceName;
}

export function getObjectKeyforProvider(providerName: string, service: string, resource: string, operationId: string, _debug: boolean) : string | false {
    if (providerName in typedProviders) {
        const providerObjectKeysAndSqlVerbs = typedProviders[providerName].objectKeysAndSqlVerbs;
        
        let objectKey = '_defaultObjectKey';

        if ('_defaultObjectKey' in providerObjectKeysAndSqlVerbs) {
            objectKey = providerObjectKeysAndSqlVerbs['_defaultObjectKey'];
        }

        if (service in providerObjectKeysAndSqlVerbs) {
            if (resource in providerObjectKeysAndSqlVerbs[service]) {
                if (operationId in providerObjectKeysAndSqlVerbs[service][resource]) {
                    if ('objectKey' in providerObjectKeysAndSqlVerbs[service][resource][operationId]){
                        objectKey = providerObjectKeysAndSqlVerbs[service][resource][operationId]['objectKey'];
                    }
                }
            }
        }

        if (objectKey === '_defaultObjectKey') {
            return false;
        } else {
            return objectKey;
        } 
    }
    return false;
}

export function getSqlVerbforProvider(operationId: string, _verbKey: string, providerName: string, service: string, resource: string): string | false {
    if (providerName in typedProviders) {
        if (service in typedProviders[providerName].objectKeysAndSqlVerbs) {
            if (resource in typedProviders[providerName].objectKeysAndSqlVerbs[service]) {
                if (operationId in typedProviders[providerName].objectKeysAndSqlVerbs[service][resource]) {
                    if ('sqlVerb' in typedProviders[providerName].objectKeysAndSqlVerbs[service][resource][operationId]){
                        return typedProviders[providerName].objectKeysAndSqlVerbs[service][resource][operationId]['sqlVerb'];
                    }
                }
            }
        }
    }
    return false;
}

export function updateStackQLMethodNameforProvider(providerName: string, service: string, resource: string, stackQLMethodName: string): string {
    if (providerName in typedProviders) {
        if (service in typedProviders[providerName].methodNameMap) {
            if (resource in typedProviders[providerName].methodNameMap[service]) {
                if (stackQLMethodName in typedProviders[providerName].methodNameMap[service][resource]) {
                        return typedProviders[providerName].methodNameMap[service][resource][stackQLMethodName];
                }
            }
        }
    }
    return stackQLMethodName;
}

export function performMethodNameTransformsforProvider(providerName: string, service: string, operationId: string): string {
    if (providerName in typedProviders) {
        const providerTransforms = typedProviders[providerName].methodNameTransforms;

        // Check if a specific service transform is defined
        if (service in providerTransforms) {
            return providerTransforms[service](operationId);
        } 
        // Check if a general transform for all services is defined
        else if ('allServices' in providerTransforms) {
            return providerTransforms['allServices'](operationId);
        }
    }
    return operationId; // return operationId if no specific transform is found
}