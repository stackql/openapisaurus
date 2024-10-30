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

