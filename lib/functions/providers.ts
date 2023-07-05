// deno modules

// relative imports
import { logger } from "../util/logging.ts";
import type { IProviderData, IServicesMap, IServiceDescriptions } from '../types/providers.d.ts';
import * as providers from '../providers/index.ts';

//
// renames a service if it exists in the provider data
// used to combine services or to clean up service names
//
export function updateServiceName(providerName: string, inServiceName: string, debug: boolean): string {
    debug ? logger.debug(`checking for service name updates for [${inServiceName}] in [${providerName}]...`) : null;
    let outServiceName = inServiceName;
    
    debug ? logger.debug(`getting provider data for ${providerName}`) : null;

    const servicesMap = (providers[providerName as keyof typeof providers].servicesMap) as IServicesMap;

    if (servicesMap) {
        outServiceName = servicesMap[inServiceName] || inServiceName;
    }

    debug ? logger.debug(`service name changed from ${inServiceName} to ${outServiceName}`) : null;
    
    return outServiceName;
}

//
// renames a service if it exists in the provider data
// used to combine services or to clean up service names
//
export function getServiceDescription(providerName: string, serviceName: string, debug: boolean): string {
    debug ? logger.debug(`checking for service decsription for [${serviceName}] in [${providerName}]...`) : null;
    let outServiceDesc = serviceName;
    
    debug ? logger.debug(`getting provider data for ${providerName}`) : null;

    const serviceDescriptions = (providers[providerName as keyof typeof providers].serviceDescriptions) as IServiceDescriptions;

    if (serviceDescriptions) {
        outServiceDesc = serviceDescriptions[serviceName] || outServiceDesc;
    }

    debug ? logger.debug(`service desc "${outServiceDesc}" added for  ${providerName}.${serviceName}`) : null;
    
    return outServiceDesc;
}




//
// renames a resource given an operationId, if it exists in the provider data
// used to re-home methods (operations) to other resources
//
function getResourceNameFromOperationId(data: IResourceData, operationId: string, debug: boolean, logger: typeof Logger): string | false {
    debug ? logger.debug(`running getResourceNameFromOperationId for ${operationId}...`) : null;
    const operationName = data.opIdMap[operationId];
    if (operationName) {
        debug ? logger.debug(`operationId data found for ${operationId}`) : null;
        return operationName;
    }
    return false;
}

//
// renames a resource given an existing resource name, if it exists in the provider data
// used to rename resources to combine operations or for hygiene
//
function getNewResourceNameFromExisting(data: IResourceData, resourceName: string, debug: boolean, logger: typeof Logger): string | false {
    debug ? logger.debug(`running getNewResourceNameFromExisting for ${resourceName}...`) : null;
    const newName = data.nameMap[resourceName];
    if (newName) {
        debug ? logger.debug(`resourceName data found for ${resourceName}`) : null;
        return newName;
    }
    return false;
}

type Operation = {
    operationId: string;
    [key: string]: unknown;
};

export async function updateResourceName(providerName: string, service: string, inResourceName: string, operation: Operation, debug: boolean, logger: typeof Logger): Promise<string> {
    debug ? logger.debug(`checking for resource name updates for [${inResourceName}] in [${providerName}.${service}]...`) : null;
    let outResourceName = inResourceName;
    
    const providers = await import(`../providers/${providerName}.ts`);
    
    debug ? logger.debug(`provider data found for ${providerName}`) : null;
    if (service in providers.default.resourcesMap) {
        debug ? logger.debug(`service data found for ${providerName}.${service}`) : null;
        // try to get new name from operationId
        const nameFromOpIdOrNull = getResourceNameFromOperationId(providers.default.resourcesMap[service], operation.operationId, debug, logger); 
        if (!nameFromOpIdOrNull) {
            // try to get new name from existing name
            const nameFromExistingOrNull = getNewResourceNameFromExisting(providers.default.resourcesMap[service], inResourceName, debug, logger);
            if (nameFromExistingOrNull) {
                outResourceName = nameFromExistingOrNull;
                debug ? logger.debug(`resource name changed from ${inResourceName} to ${outResourceName} via name mapping`) : null;
            }
        } else {
            outResourceName = nameFromOpIdOrNull;
            debug ? logger.debug(`resource name changed from ${inResourceName} to ${outResourceName} via operationId`) : null;
        }
    }
    return outResourceName;
}

export async function updateOperationIdName(providerName: string, service: string, debug: boolean, logger: typeof Logger): Promise<string> {
    debug ? logger.debug(`checking for resource name updates for [${inResourceName}] in [${providerName}.${service}]...`) : null;
    let outResourceName = inResourceName;

    const providers = await import(`../providers/${providerName}.ts`);

    debug ? logger.debug(`provider data found for ${providerName}`) : null;
    if (service in providers.default.resourcesMap) {
        debug ? logger.debug(`service data found for ${providerName}.${service}`) : null;
        // try to get new name from operationId
        const nameFromOpIdOrNull = getResourceNameFromOperationId(providers.default.resourcesMap[service], operation.operationId, debug, logger); 
        if (!nameFromOpIdOrNull) {
            // try to get new name from existing name
            const nameFromExistingOrNull = getNewResourceNameFromExisting(providers.default.resourcesMap[service], inResourceName, debug, logger);
            if (nameFromExistingOrNull) {
                outResourceName = nameFromExistingOrNull;
                debug ? logger.debug(`resource name changed from ${inResourceName} to ${outResourceName} via name mapping`) : null;
            }
        } else {
            outResourceName = nameFromOpIdOrNull;
            debug ? logger.debug(`resource name changed from ${inResourceName} to ${outResourceName} via operationId`) : null;
        }
    }
    return outResourceName;
}

export async function getObjectKeyforProvider(providerName: string, service: string, resource: string, operationId: string): Promise<string | false> {
    const providers = await import(`../providers/${providerName}.ts`);
    const providerObjectKeysAndSqlVerbs = providers.default.objectKeysAndSqlVerbs;
    
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

export async function getSqlVerbforProvider(operationId: string, providerName: string, service: string, resource: string): Promise<string | false> {
    const providers = await import(`../providers/${providerName}.ts`);

    if (service in providers.default.objectKeysAndSqlVerbs) {
        if (resource in providers.default.objectKeysAndSqlVerbs[service]) {
            if (operationId in providers.default.objectKeysAndSqlVerbs[service][resource]) {
                if ('sqlVerb' in providers.default.objectKeysAndSqlVerbs[service][resource][operationId]){
                    return providers.default.objectKeysAndSqlVerbs[service][resource][operationId]['sqlVerb'];
                }
            }
        }
    }
    return false;
}
