import * as providers from './providers/index.ts';

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
 
export function updateResourceName(providerName: string, service: string, inResourceName: string, debug: boolean, logger: any): string {
    debug ? logger.debug(`checking for resource name updates for [${inResourceName}] in [${providerName}.${service}]...`) : null;
    let outResourceName = inResourceName;
    if (providerName in providers) {
        debug ? logger.debug(`provider data found for ${providerName}`) : null;
        if (service in providers[providerName].resourcesMap) {
            debug ? logger.debug(`service data found for ${providerName}.${service}`) : null;
            outResourceName = providers[providerName].resourcesMap[service][inResourceName] || inResourceName;
            debug ? logger.debug(`service name changed from ${inResourceName} to ${outResourceName}`) : null;
        }
    }
    return outResourceName;
}

export function getObjectKeyforProvider(providerName: string, service: string, resource: string, operationId: string, debug: boolean) : string | false {
    if (providerName in providers) {
        if (service in providers[providerName].objectKeysAndSqlVerbs) {
            if (resource in providers[providerName].objectKeysAndSqlVerbs[service]) {
                if (operationId in providers[providerName].objectKeysAndSqlVerbs[service][resource]) {
                    if ('objectKey' in providers[providerName].objectKeysAndSqlVerbs[service][resource][operationId]){
                        return providers[providerName].objectKeysAndSqlVerbs[service][resource][operationId]['objectKey'];
                    }
                }
            }
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

