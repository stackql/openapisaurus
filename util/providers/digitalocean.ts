export const servicesMap = {
    '1_click_applications': 'one_click_applications',
    block_storage_actions: 'block_storage',
    domain_records: 'domains',
    droplet_actions: 'droplets',
    floating_ip_actions: 'floating_ips',
    image_actions: 'images',
    project_resources: 'projects',
    reserved_ip_actions: 'reserved_ips',
};

export const resourcesMap = {
    one_click_applications: {
        '1_click_applications': 'one_click_applications',
    },
    // apps: {
    // },
    billing: {
        customers_my_balance: 'balances',
        customers_my_billing_history: 'history',
        customers_my_invoices: 'invoices',
        customers_my_invoices_csv: 'invoices',
        customers_my_invoices_pdf: 'invoices',
        customers_my_invoices_summary: 'invoices_summary',
    },
    // block_storage: {
    // },
    // cdn_endpoints: {
    // },
    // certificates: {
    // },
    // container_registry: {
    // },
    // databases: {
    // },
    // domains: {
    // },
    // droplets: {
    // },
    // firewalls: {
    // },
    // floating_ips: {
    // },
    // functions: {
    // },
    // images: {
    // },
    // kubernetes: {
    // },
    // load_balancers: {
    // },
    // monitoring: {
    // },
    // projects: {
    // },
    // regions: {
    // },
    // reserved_ips: {
    // },
    // sizes: {
    // },
    // snapshots: {
    // },
    // ssh_keys: {
    // },
    // tags: {
    // },
    // uptime: {
    // },
    // vpcs: {
    // },
};

export const objectKeysAndSqlVerbs = {
    one_click_applications: {
        one_click_applications: {
            oneClicks_list: {
                objectKey: '$.1_clicks',
            },
        },
        kubernetes: {
            oneClicks_install_kubernetes: {
                sqlVerb: 'exec',
            }
        }
    },
    account: {
        account: {
            get: {
                objectKey: '$.account',
            },
        }
    },
    actions: {
        actions: {
            list: {
                objectKey: '$.actions',
            },
            get: {
                objectKey: '$.action',
            },
        },
    },
    // apps: {
    // },
    billing: {
        invoices: {
            get_csvByUUID: {
                sqlVerb: 'exec',
            },
            get_pdfByUUID: {
                sqlVerb: 'exec',
            }     
        },
    },
    // block_storage: {
    // },
    // cdn_endpoints: {
    // },
    // certificates: {
    // },
    // container_registry: {
    // },
    // databases: {
    // },
    // domains: {
    // },
    // droplets: {
    // },
    // firewalls: {
    // },
    // floating_ips: {
    // },
    // functions: {
    // },
    // images: {
    // },
    // kubernetes: {
    // },
    // load_balancers: {
    // },
    // monitoring: {
    // },
    // projects: {
    // },
    // regions: {
    // },
    // reserved_ips: {
    // },
    // sizes: {
    // },
    // snapshots: {
    // },
    // ssh_keys: {
    // },
    // tags: {
    // },
    // uptime: {
    // },
    // vpcs: {
    // },    
};

