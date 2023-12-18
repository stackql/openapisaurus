## Provider Specifc Expections and Overrides

This directory contains provider specific exceptions and overrides.  Steps to implement include:

1. Create a new provider TypeScript file in this directory.  The file name should be the same as the provider name.
2. Export the provider in the `index.ts` in this directory.

## Provider Specific Exceptions Object Structure

Add the provider specific exceptions object to the provider TypeScript file.  Use the following as a template:

```typescript
export const servicesMap = {}

export const resourcesMap = {}

export const stackqlMethodNameMap = {}

export const objectKeysAndSqlVerbs = {}
```


The provider specific exceptions object structure is as follows:

```typescript
//
// rename or skip services in the provider
//
export const servicesMap = {
    service_to_be_skipped: 'skip',
    service_to_be_renamed: 'new_service_name',
}

export const resourcesMap = {
    service: {
        nameMap: {
            resource_name_to_be_changed: 'new_resource_name',
            resource_name_to_be_skipped: 'skip_this_resource',
        },
        opIdMap: {
            an_operation_id: 'resource_name',
            an_operation_id_to_be_skipped: 'skip_this_resource',
        },
    },
}

//
// get or update the stackql method name for an operation
//
export const stackqlMethodNameMap = {

    // 1. return a method name if found for a service and operation id
    methodNameByOpIdMap: {
        a_service: {
            an_operation_id: 'a_method_name',
            // ...
        }
    },

    // 2. return a method name if found for a service using a transform function
    methodNameTransforms: {
        a_service: (operationId: string) => {
            return `transformed_${operationId}`;
        },
        allServices: (operationId: string) => {
            return `general_transformed_${operationId}`;
        },
    },
    
    // 3. rename a method name if found for a service and resource
    methodNameMap: {
        a_service: {
            a_resource: {
                a_stackql_method_name: 'a_new_stackql_method_name',
                // ...
            }
        }
    }
}

//
// return an object key and/or a sql verb for a service -> resource -> method
//
export const objectKeysAndSqlVerbs = {

    // 1. return an exact match if found for sqlVerb and objectKey
    a_service: {
        a_resource: {
            a_stackql_method_name: {
                objectKey: '$.something',
                sqlVerb: 'select',
            },
        },
    },

    // 2. use an expression if available to return an object key
    _objectKeyExpression: (service: string, resource: string, stackQLMethodName: string) => {
        // return something or false
        return false;
    },
    
    // 3. use a default object key if available
    _defaultObjectKey: '$.something',
}
```
