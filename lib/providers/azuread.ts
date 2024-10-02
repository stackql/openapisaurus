export const stackqlMethodNameMap = {
    methodNameByOpIdMap: {},
    methodNameTransforms: {},
    methodNameMap: {},
}

export const servicesMap = {
    agreements: 'skip',
    agreement_acceptances: 'skip',
    app_catalogs: 'skip',
    application_templates: 'skip',
    audit_logs: 'skip',
    chats: 'skip',
    communications: 'skip',
    compliance: 'skip',
    connections: 'skip',
    contacts: 'skip',
    contracts: 'skip',
    data_policy_operations: 'skip',
    drives: 'skip',
    education: 'skip',
    employee_experience: 'skip',
    filter_operators: 'skip',
    functions: 'skip',
    information_protection: 'skip',
    invitations: 'skip',
    me: 'skip',
    places: 'skip',
    planner: 'skip',
    print: 'skip',
    privacy: 'skip',
    reports: 'skip',
    search: 'skip',
    security: 'skip',
    shares: 'skip',
    sites: 'skip',
    solutions: 'skip',
    admin: 'skip',
    // applications: 'skip',
    authentication_method_configurations: 'skip',
    authentication_methods_policy: 'skip',
    certificate_based_auth_configuration: 'skip',
    device_app_management: 'skip',
    device_management: 'skip',
    devices: 'skip',
    directory: 'skip',
    directory_objects: 'skip',
    directory_role_templates: 'skip',
    directory_roles: 'skip',
    domain_dns_records: 'skip',
    domains: 'skip',
    external: 'skip',
    group_lifecycle_policies: 'skip',
    group_setting_templates: 'skip',
    group_settings: 'skip',
    // groups: 'skip',
    identity: 'skip',
    identity_governance: 'skip',
    identity_protection: 'skip',
    identity_providers: 'skip',
    oauth2_permission_grants: 'skip',
    organization: 'skip',
    permission_grants: 'skip',
    policies: 'skip',
    role_management: 'skip',
    schema_extensions: 'skip',
    scoped_role_memberships: 'skip',
    // service_principals: 'skip',
    subscribed_skus: 'skip',
    subscriptions: 'skip',
    teams: 'skip',
    teams_templates: 'skip',
    teamwork: 'skip',
    tenant_relationships: 'skip',
    // users: 'skip',    
}

export const resourcesMap = {
    applications: {
        nameMap: {},
        opIdMap: {
            'applications.GetCount-8398': 'application',
            'applications.application.GetLogo': 'application',
        },
    },
    groups: {
        nameMap: {},
        opIdMap: {
            'groups.GetCount-044a': 'group',
        },
    },
    service_principals: {
        nameMap: {
            'service_principal_service_principal': 'service_principal',
        },
        opIdMap: {
            'servicePrincipals.GetCount-da6d': 'service_principal',
        },
    },
    users: {
        nameMap: {},
        opIdMap: {
            'users.GetCount-ee47': 'user',
        },
    },    
}

export const methodNameTransforms = {
    allServices: (operationId) => {
        return operationId.split('.').pop();
    },
}

export const methodNameByOpIdMap = {}

export const methodNameMap = {}

export const objectKeysAndSqlVerbs = {

    _objectKeyExpression: (service: string, resource: string, stackQLMethodName: string) => {
        if (stackQLMethodName.startsWith('list_')) {
            return '$.value';
        }
        return false;
    },

    applications: {
        // app_management_policies: {
        //     list_app_management_policies: {
        //         objectKey: '$.value',
        //     },
        // },
        application: {
            get_logo: {
                sqlVerb: 'exec',
            },
        },
        // owners: {
        //     list_owners: {
        //         objectKey: '$.value',
        //     },
        // },
        // token_issuance_policies: {
        //     list_token_issuance_policies: {
        //         objectKey: '$.value',
        //     },
        // },
        // token_lifetime_policies: {
        //     list_token_lifetime_policies: {
        //         objectKey: '$.value',
        //     },
        // },
    },
}