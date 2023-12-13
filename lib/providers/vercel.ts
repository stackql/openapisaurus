export const servicesMap = {}

export const resourcesMap = {
    artifacts: {
        nameMap: {
            events: 'artifacts',
            status: 'artifacts',
        },
        opIdMap: {},
    },
    authentication: {
        nameMap: {
            registration: 'user_tokens',
            registration_verify: 'user_tokens',
        },
        opIdMap: {},
    },
    domains: {
        nameMap: {
            registry: 'domain_registry',
            buy: 'domains',
        },
        opIdMap: {},
    },
    deployments: {
        nameMap: {
            cancel: 'deployments',
        },
        opIdMap: {},
    },
    checks: {
        nameMap: {
            deployments_rerequest: 'deployments',
        },
        opIdMap: {},
    },
    integrations: {
        nameMap: {
            configurations: 'configuration',
        },
        opIdMap: {},
    },
    projects: {
        nameMap: {
            data_cache: 'projects',
            domains_verify: 'domains',
        },
        opIdMap: {},        
    },
    teams: {
        nameMap: {
            members_join: 'teams',
        },
        opIdMap: {},
    },
}

export const methodNameTransforms = {}

export const methodNameByOpIdMap = {}

export const methodNameMap = {}

export const objectKeysAndSqlVerbs = {
    aliases: {
        aliases: {
            list_aliases: {
                objectKey: '$.aliases',
            },
            list_deployment_aliases: {
                objectKey: '$.aliases',
            },
        },
        deployments: {
            list_deployment_aliases: {
                objectKey: '$.aliases',
            },
        }, 
    },
    authentication: {
        user_tokens: {
            get_auth_token: {
                get_auth_token: {
                    objectKey: '$.token',
                },
            },
            list_auth_tokens: {
                objectKey: '$.tokens',
            },
        },
    },
    deployments: {
        builds: {
            get_builds_for_deployment: {
                objectKey: '$.builds',
            },
        },
    },
    integrations: {
        git_namespaces: {
            git_namespaces: {
                sqlVerb: 'select',
            },
        },
        search_repo: {
            git_namespaces: {
                sqlVerb: 'select',
            },
        },
    },
    user: {
        events: {
            list_user_events: {
                objectKey: '$.events',
            },
        },
        user: {
            get_auth_user: {
                objectKey: '$.user',
            },
        },
    },
    dns: {
        domains_records: {
            get_records: {
                objectKey: '$._records',
            },
        },
    },
    domains: {
        domains: {
            get_domain: {
                objectKey: '$.domain',
            },
            get_domains: {
                objectKey: '$.domains',
            },
        },
    },
    project_members: {
        projects_members: {
            get_project_members: {
                objectKey: '$.members',
            },
        },
    },
    teams: {
        members: {
            get_team_members: {
                objectKey: '$.members',
            },
        },
    },
}