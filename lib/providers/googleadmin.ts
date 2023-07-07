export const resourcesMap = {
    directory:{
        nameMap: {
            printers__printer_models: 'printer_models',
        },        
    },
}

export const methodNameMap = {
    directory: {
        aliases: {
            groups_aliases_list: 'group_aliases_list',
            users_aliases_list: 'user_aliases_list',
            groups_aliases_insert: 'group_aliases_insert',
            users_aliases_insert: 'user_aliases_insert',
            groups_aliases_delete: 'group_aliases_delete',
            users_aliases_delete: 'user_aliases_delete',
            users_aliases_watch: 'user_aliases_watch',
        },
        buildings: {
            resources_buildings_get: 'get',
            resources_buildings_list: 'list',
            resources_buildings_insert: 'insert',
            resources_buildings_delete: 'delete',
            resources_buildings_patch: 'patch',
            resources_buildings_update: 'update',
        },
        calendars: {
            resources_calendars_get: 'get',
            resources_calendars_list: 'list',
            resources_calendars_insert: 'insert',
            resources_calendars_delete: 'delete',
            resources_calendars_patch: 'patch',
            resources_calendars_update: 'update',
        },
        channels: {
            admin_channels_stop: 'stop',
        },
        chromeos: {
            admin_customer_devices_chromeos_issueCommand: 'issueCommand',
        },
        commands: {
            admin_customer_devices_chromeos_commands_get: 'get',
        },
        domain_aliases: {
            domainAliases_get: 'get',
            domainAliases_list: 'list',
            domainAliases_insert: 'insert',
            domainAliases_delete: 'delete',
        },
        features: {
            resources_features_get: 'get',
            resources_features_list: 'list',
            resources_features_insert: 'insert',
            resources_features_delete: 'delete',
            resources_features_patch: 'patch',
            resources_features_update: 'update',
            resources_features_rename: 'rename',
        },
        photos: {
            users_photos_get: 'get',
            users_photos_delete: 'delete',
            users_photos_patch: 'patch',
            users_photos_update: 'update',
        },
        print_servers: {
            admin_customers_chrome_printServers_get: 'get',
            admin_customers_chrome_printServers_list: 'list',
            admin_customers_chrome_printServers_create: 'insert',
            admin_customers_chrome_printServers_delete: 'delete',
            admin_customers_chrome_printServers_batchCreatePrintServers: 'batchCreatePrintServers',
            admin_customers_chrome_printServers_batchDeletePrintServers: 'batchDeletePrintServers',
            admin_customers_chrome_printServers_patch: 'patch',
        },
        printers: {
            admin_customers_chrome_printers_get: 'get',
            admin_customers_chrome_printers_list: 'list',
            admin_customers_chrome_printers_create: 'insert',
            admin_customers_chrome_printers_delete: 'delete',
            admin_customers_chrome_printers_batchCreatePrinters: 'batchCreatePrinters',
            admin_customers_chrome_printers_batchDeletePrinters: 'batchDeletePrinters',
            admin_customers_chrome_printers_patch: 'patch',
        },
        printer_models: {
            admin_customers_chrome_printers_listPrinterModels: 'list',
        },
        role_assignments: {
            roleAssignments_get: 'get',
            roleAssignments_list: 'list',
            roleAssignments_insert: 'insert',
            roleAssignments_delete: 'delete',
        },
        two_step_verification: {
            twoStepVerification_turnOff: 'turnOff',
        },
        verification_codes: {
            verificationCodes_list: 'list',
            verificationCodes_generate: 'generate',
            verificationCodes_invalidate: 'invalidate',
        },
    },
}

export const objectKeysAndSqlVerbs = {
    directory: {
        buildings: {
            list: {
                objectKey: '$.buildings',
            },
        },
        domain_aliases: {
            list: {
                objectKey: '$.domainAliases',
            },
        },
        domains: {
            list: {
                objectKey: '$.domains',
            },
        },
        mobiledevices: {
            list: {
                objectKey: '$.mobiledevices',
            },
        },
        orgunits: {
            list: {
                objectKey: '$.organizationUnits',
            },
        },
        print_servers: {
            list: {
                objectKey: '$.printServers',
            },
        },
        printer_models: {
            list: {
                objectKey: '$.printerModels',
            },
        },
    }
}


