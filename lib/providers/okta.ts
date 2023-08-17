export const servicesMap = {
};

export const methodNameMap = {
    // {service}: {
    //     {resource}: {
    //         {operationId}: '{methodName}',
    //     },
    // },
};

export const resourcesMap = {
    application: {
        // nameMap: {
        //     'apps': 'apps',
        // },
        opIdMap: {
            'getDefaultProvisioningConnectionForApplication': 'connections',
            'setDefaultProvisioningConnectionForApplication': 'connections',
            'activateApplication' : 'apps',
            'deactivateApplication' : 'apps',
            'activateDefaultProvisioningConnectionForApplication' : 'connections',
            'deactivateDefaultProvisioningConnectionForApplication' : 'connections',
            'activateClientSecretForApplication' : 'secrets',
            'deactivateClientSecretForApplication' : 'secrets',
            'cloneApplicationKey' : 'keys',
            'generateApplicationKey' : 'keys',
        },
    },
    // authenticator: {
    //     nameMap: {

    //     },
    // },
    // authorization_server: { 
    //     nameMap: {

    //     }, 
    // },
    // domain: {
    //     nameMap: {

    //     },
    // },
    // event_hook: {
    //     nameMap: {

    //     },
    // },
    // feature: {
    //     nameMap: {

    //     },
    // },
    // group: {
    //     nameMap: {

    //     },
    // },
    // group_schema: {
    //     nameMap: {

    //     },
    // },
    // identity_provider: {
    //     nameMap: {

    //     },
    // },
    // inline_hook: {
    //     nameMap: {

    //     },
    // },
    // linked_object: {
    //     nameMap: {

    //     },
    // },
    // log: {
    //     nameMap: {

    //     },
    // },
    // network_zone: {
    //     nameMap: {

    //     },
    // },
    // org: {
    //     nameMap: {

    //     },
    // },
    // policy: {
    //     nameMap: {

    //     },
    // },
    // profile_mapping: {
    //     nameMap: {

    //     },
    // },
    // session: {
    //     nameMap: {

    //     },
    // },
    // subscription: {
    //     nameMap: {

    //     },
    // },
    // template: {
    //     nameMap: {

    //     },
    // },
    // threat_insight: {
    //     nameMap: {

    //     },
    // },
    // trusted_origin: {
    //     nameMap: {

    //     },
    // },
    // user: {
    //     nameMap: {

    //     },
    // },
    // user_factor: {
    //     nameMap: {

    //     },
    // },
    // user_schema: {
    //     nameMap: {

    //     },
    // },
    // user_type: {
    //     nameMap: {

    //     },
    // },
};

export const objectKeysAndSqlVerbs = {};
