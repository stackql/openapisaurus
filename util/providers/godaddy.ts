export const servicesMap = {
};

export const resourcesMap = {
    abuse: {
        // nameMap: {
        //     tickets: {outResourceName},
        // },
        opIdMap: {
            getTickets: 'ticket_ids',
            getTicketInfo: 'tickets',
            createTicket: 'tickets',
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
