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
    abuse: {
        // nameMap: {  // resourceRenameMap
        //     tickets: {outResourceName},
        // },
        opIdMap: {  // originalOpIdtoResourceMap
            getTickets: 'ticket_ids',
            getTicketInfo: 'tickets',
            createTicket: 'tickets',
        },
    },
    certificates: {
        opIdMap: {
            certificate_cancel: 'certificates',
            certificate_download: 'certificates',
            certificate_reissue: 'certificates',
            certificate_renew: 'certificates',
            certificate_revoke: 'certificates',
            certificate_validate: 'certificates',
            certificate_verifydomaincontrol: 'certificates',
        },        
    },
    countries: {
        opIdMap: {
            getCountry: 'country_info',
        },
    },
};

export const objectKeysAndSqlVerbs = {
    // _defaultObjectKey: '$.{something}',  // sets the default object key for all select methods
    // {service}: {
    //     {resource}: {
    //         {operation}: {
    //             objectKey: '$.{something}',  // sets the object key for a specific operation, overrides the default if set
    //             sqlVerb: '{sqlVerb}',  // sets the sql verb for a specific operation, overrides the default
    //         },
    //     }
    // }
};
