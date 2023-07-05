import * as providers from '../providers/index.ts';

export function updateServiceName(providerName: string, inServiceName: string, debug: boolean, logger: any): string {
    debug ? logger.debug(`checking for service name updates for [${inServiceName}] in [${providerName}]...`) : null;
    let outServiceName = inServiceName;
    if (providerName in providers) {
        debug ? logger.debug(`provider data found for ${providerName}`) : null;
        outServiceName = providers[providerName].servicesMap[inServiceName] || inServiceName;
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
    if (providerName in providers) {
        debug ? logger.debug(`provider data found for ${providerName}`) : null;
        if (service in providers[providerName].resourcesMap) {
            debug ? logger.debug(`service data found for ${providerName}.${service}`) : null;
            // try to get new name from operationId
            const nameFromOpIdOrNull = getResourceNameFromOperationId(providers[providerName].resourcesMap[service], operation.operationId, debug, logger); 
            if (!nameFromOpIdOrNull) {
                // try to get new name from existing name
                const nameFromExistingOrNull = getNewResourceNameFromExisting(providers[providerName].resourcesMap[service], inResourceName, debug, logger);
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

export function getObjectKeyforProvider(providerName: string, service: string, resource: string, operationId: string, debug: boolean) : string | false {

    if (providerName in providers) {
        const providerObjectKeysAndSqlVerbs = providers[providerName].objectKeysAndSqlVerbs;
        
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

export function getSqlVerbforProvider(operationId: string, verbKey: string, providerName: string, service: string, resource: string): string | false {
    if (providerName in providers) {
        if (service in providers[providerName].objectKeysAndSqlVerbs) {
            if (resource in providers[providerName].objectKeysAndSqlVerbs[service]) {
                if (operationId in providers[providerName].objectKeysAndSqlVerbs[service][resource]) {
                    if ('sqlVerb' in providers[providerName].objectKeysAndSqlVerbs[service][resource][operationId]){
                        return providers[providerName].objectKeysAndSqlVerbs[service][resource][operationId]['sqlVerb'];
                    }
                }
            }
        }
    }
    return false;
}

