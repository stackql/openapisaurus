export const servicesMap = {};

export const serviceDescriptions = {};

export const methodNameMap = {};

export const methodNameByOpIdMap = {};

export const methodNameTransforms = {};

export const resourcesMap = {
    aftermarket: {
        nameMap: {
            listings_expiry: 'listings',
        },
        opIdMap: {},
    },
    certificates: {
        nameMap: {
            cancel: 'certificates',
            download: 'certificates',
            reissue: 'certificates',
            renew: 'certificates',
            revoke: 'certificates',
            validate: 'certificates',
            verify_domain_control: 'certificates',
        },
        opIdMap: {},
    },
    domains: {
        nameMap: {
            contacts: 'domains',
            contacts_validate: 'domains',
            privacy: 'domains',
            privacy_purchase: 'domains',
            purchase: 'domains',
            purchase_validate: 'domains',
            renew: 'domains',
            transfer: 'domains',
            verify_registrant_email: 'domains',
        },
        opIdMap: {},
    },
    shoppers: {
        nameMap: {
            subaccount: 'shoppers',
        },
        opIdMap: {},
    },
    subscriptions: {
        nameMap: {
            product_groups: 'subscriptions',
        },
        opIdMap: {},
    },   
};

export const objectKeysAndSqlVerbs = {
    abuse: {
        tickets: {
            get_tickets: {
                objectKey: '$.ticketIds',
            },
        },
    },
    orders: {
        orders: {
            list: {
                objectKey: '$.orders',
            },
        },
    },
    subscriptions: {
        subscriptions: {
            list: {
                objectKey: '$.subscriptions',
            },
        },
    },
};
