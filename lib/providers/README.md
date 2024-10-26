## Provider Specifc Expections and Overrides

This directory contains provider specific exceptions and overrides.  Steps to implement include:

1. Create a new provider TypeScript file in this directory.  The file name should be the same as the provider name.
2. Export the provider in the `index.ts` in this directory.

## Provider Specific Exceptions Object Structure

Add the provider specific exceptions object to the provider TypeScript file.  Use the following as a template:

```typescript
export const servicesMap = {}

export const resourcesMap = {
    assistants: {
        submitToolOuputsToRun: 'runs',
        createThreadAndRun: 'threads',
    },
    fine_tuning: {
        listPaginatedFineTuningJobs: 'jobs',
    },
}

export const stackqlMethodNameMap = {}

export const objectKeysAndSqlVerbsMap = {
    assistants: {
        threads: {
            create_thread_and_run: {
                sqlVerb: 'exec',
            },
        },
    },
    chat: {
        completions: {
            create_chat_completion: {
                sqlVerb: 'select',
            },
        },
    },
    models: {
        models: {
            list_models: {
                objectKey: '$.data',
            },
        },    
    }
}
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

//
// assign an operationId to a resource
//
export const resourcesMap = {
    a_service: {
        an_operation_id: 'a_resource',
    },
}

//
// assign an operationId to a stackql method name
//
export const stackqlMethodNameMap = {
    a_service: {
        an_operation_id: 'a_method_name',
    },
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
