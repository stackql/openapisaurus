import { logDebug } from './logging.ts';
import providers from './providers/index.ts';

export function updateServiceName(providerName: string, inServiceName: string, debug: boolean, logger: any): string {
    logDebug(`checking for service name updates for [${inServiceName}] in [${providerName}]...`, debug);
    let outServiceName = inServiceName;
    if (providerName in providers) {
        const provider = (providers as any)[providerName]
        logDebug(`provider data found for ${providerName}`, debug);
        outServiceName = provider.servicesMap[inServiceName] || inServiceName;
        logDebug(`service name changed from ${inServiceName} to ${outServiceName}`, debug);
    }
    return outServiceName;
}

function getResourceNameFromOperationId(data: any, operationId: string, debug: boolean): string | false {
    debug = true
    logDebug(`running getResourceNameFromOperationId for ${operationId}...`, debug);
    if ('opIdMap' in data) {
        if (operationId in data['opIdMap']) {
            logDebug(`operationId data found for ${operationId}`, debug);
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

export function updateResourceName({ providerName, service, inResourceName, operationId, debug, logger }: { providerName: string, service: string, inResourceName: string, operationId: string, debug: boolean, logger: any }): string {
    debug = true;
    logDebug(`checking for resource name updates for [${inResourceName}] in [${providerName}.${service}]...`, debug);
    let outResourceName = inResourceName;
    if (providerName in providers) {
        const provider = (providers as any)[providerName]
        logDebug(`provider data found for ${providerName}`, debug);
        if (service in provider.resourcesMap) {
            logDebug(`service data found for ${providerName}.${service}`, debug);
            // try to get new name from operationId
            const nameFromOpIdOrNull = getResourceNameFromOperationId(provider.resourcesMap[service], operationId, debug);
            if (!nameFromOpIdOrNull) {
                // try to get new name from existing name
                const nameFromExistingOrNull = getNewResourceNameFromExisting(provider.resourcesMap[service], inResourceName, debug, logger);
                if (nameFromExistingOrNull) {
                    outResourceName = nameFromExistingOrNull;
                    logDebug(`resource name changed from ${inResourceName} to ${outResourceName} via name mapping`, debug);
                }
            } else {
                outResourceName = nameFromOpIdOrNull;
                logDebug(`resource name changed from ${inResourceName} to ${outResourceName} via operationId`, debug);
            }
        }
    }

    return outResourceName;
}

export function getObjectKeyforProvider(providerName: string, service: string, resource: string, operationId: string, debug: boolean): string | false {

    if (providerName in providers) {
        const provider = (providers as any)[providerName];
        const providerObjectKeysAndSqlVerbs = provider.objectKeysAndSqlVerbs;
        if(!providerObjectKeysAndSqlVerbs) return false;
        let objectKey = '_defaultObjectKey';

        if ('_defaultObjectKey' in providerObjectKeysAndSqlVerbs) {
            objectKey = providerObjectKeysAndSqlVerbs['_defaultObjectKey'];
        }

        if (service in providerObjectKeysAndSqlVerbs) {
            if (resource in providerObjectKeysAndSqlVerbs[service]) {
                if (operationId in providerObjectKeysAndSqlVerbs[service][resource]) {
                    if ('objectKey' in providerObjectKeysAndSqlVerbs[service][resource][operationId]) {
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


export function getSqlVerbForProvider({operationId, verbKey, providerName, service, resource}: {
    operationId: string;
    verbKey: string;
    providerName: string;
    service: string;
    resource: string;
}): string | false {
    if (!(providerName in providers)) return false;
    const provider = (providers as any)[providerName];
    if(!provider) return false;
    if (!(service in provider.objectKeysAndSqlVerbs)) return false;
    if (!(resource in provider.objectKeysAndSqlVerbs[service])) return false;
    if(!provider.objectKeysAndSqlVerbs[service][resource]) return false;
    if (!(operationId in provider.objectKeysAndSqlVerbs[service][resource])) return false;
    if (!('sqlVerb' in provider.objectKeysAndSqlVerbs[service][resource][operationId])) return false;

    return provider.objectKeysAndSqlVerbs[service][resource][operationId]['sqlVerb'];
}

