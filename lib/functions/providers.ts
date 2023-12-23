// deno-lint-ignore-file no-explicit-any
import * as providers from '../providers/index.ts';

interface Provider {
    servicesMap: Record<string, string>;
    resourcesMap: Record<string, any>;
    stackqlMethodNameMap: Record<string, any>;
    objectKeysAndSqlVerbs: Record<string, any>;
    // methodNameByOpIdMap: Record<string, any>;
    // methodNameMap: Record<string, any>;
    // methodNameTransforms: Record<string, any>;
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

        console.log(typedProviders[providerName].servicesMap[inServiceName]);
        
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

export function getStackQLMethodNameforProvider(providerName: string, service: string, resource: string, operationId: string): string {
    if (providerName in typedProviders) {
        const providerData = typedProviders[providerName].stackqlMethodNameMap;

        // 1. Check if there is a method listed by opid in the provider
        if (service in providerData.methodNameByOpIdMap && operationId in providerData.methodNameByOpIdMap[service]) {
            return providerData.methodNameByOpIdMap[service][operationId];
        }

        // 2. Perform provider specific transforms on opid
        if (service in providerData.methodNameTransforms) {
            return providerData.methodNameTransforms[service](operationId);
        } else if ('allServices' in providerData.methodNameTransforms) {
            return providerData.methodNameTransforms['allServices'](operationId);
        }

        // 3. Check for final provider name overrides
        if (service in providerData.methodNameMap && resource in providerData.methodNameMap[service] && operationId in providerData.methodNameMap[service][resource]) {
            return providerData.methodNameMap[service][resource][operationId];
        }
    }
    return operationId; // Default to operationId if no specific method name is found
}

export function getObjectKeyforProvider(providerName: string, service: string, resource: string, stackQLMethodName: string, _debug: boolean): string | false {
    if (providerName in typedProviders) {
        const providerObjectKeysAndSqlVerbs = typedProviders[providerName].objectKeysAndSqlVerbs;

        const getObjectKey = () => {
			// have an extact match, return it
            if (service in providerObjectKeysAndSqlVerbs) {
                if (resource in providerObjectKeysAndSqlVerbs[service]) {
                    if (stackQLMethodName in providerObjectKeysAndSqlVerbs[service][resource]) {
                        return providerObjectKeysAndSqlVerbs[service][resource][stackQLMethodName]['objectKey'];
                    }
                }
            }

			// have an expression, use it if it returns something
            if ('_objectKeyExpression' in providerObjectKeysAndSqlVerbs) {
				if(providerObjectKeysAndSqlVerbs['_objectKeyExpression'](service, resource, stackQLMethodName)){
					return providerObjectKeysAndSqlVerbs['_objectKeyExpression'](service, resource, stackQLMethodName);
				}
            }

			// provider default declared, use this
            if ('_defaultObjectKey' in providerObjectKeysAndSqlVerbs) {
                return providerObjectKeysAndSqlVerbs['_defaultObjectKey'];
            }

            return false;
        };

        const objectKey = getObjectKey();

        return objectKey;
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

// export function getStackQLMethodNameforProviderByOpId(providerName: string, service: string, operationId: string): string | undefined {
//     if (providerName in typedProviders) {
//         if (service in typedProviders[providerName].methodNameByOpIdMap) {
//             if (operationId in typedProviders[providerName].methodNameByOpIdMap[service]) {
//                 return typedProviders[providerName].methodNameByOpIdMap[service][operationId];
//             }
//         }
//     }
//     return undefined;
// }

// export function updateStackQLMethodNameforProvider(providerName: string, service: string, resource: string, stackQLMethodName: string): string {
//     if (providerName in typedProviders) {
//         if (service in typedProviders[providerName].methodNameMap) {
//             if (resource in typedProviders[providerName].methodNameMap[service]) {
//                 if (stackQLMethodName in typedProviders[providerName].methodNameMap[service][resource]) {
//                         return typedProviders[providerName].methodNameMap[service][resource][stackQLMethodName];
//                 }
//             }
//         }
//     }
//     return stackQLMethodName;
// }

// export function performMethodNameTransformsforProvider(providerName: string, service: string, operationId: string): string {
//     if (providerName in typedProviders) {
//         const providerTransforms = typedProviders[providerName].methodNameTransforms;

//         // Check if a specific service transform is defined
//         if (service in providerTransforms) {
//             return providerTransforms[service](operationId);
//         } 
//         // Check if a general transform for all services is defined
//         else if ('allServices' in providerTransforms) {
//             return providerTransforms['allServices'](operationId);
//         }
//     }
//     return operationId; // return operationId if no specific transform is found
// }