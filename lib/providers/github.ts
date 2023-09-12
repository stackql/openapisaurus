export const servicesMap = {
    emojis: 'skip',
    meta: 'skip',
}

export const resourcesMap = {
}

export const methodNameMap = {
}

export const objectKeysAndSqlVerbs = {
    teams: {
        orgs: {
            get_by_name: {
                sqlVerb: 'exec',
            },
        },
        teams: {
            get_legacy: {
                sqlVerb: 'exec',
            },
        },
    },
    repos: {
        languages: {
            list_languages: {
                sqlVerb: 'exec',
            },
        },
        rules_branches: {
            get_branch_rules: {
                sqlVerb: 'exec',
            },
        },
    },
}