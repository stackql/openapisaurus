export const objectKeysAndSqlVerbs = {
    chat: {
        chat_completions: {
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

export const servicesMap = {}

// export const resourcesMap = {}

export const stackqlMethodNameMap = {
    methodNameByOpIdMap: {},
    methodNameTransforms: {},
    methodNameMap: {},
}
