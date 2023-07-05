export const servicesMap = {
    team_management: 'teams',
    user_management: 'users',
    certificate_management: 'certificates',
    destination_management: 'destinations',
    connector_schema_management: 'connectors',
    group_management: 'groups',
    connector_management: 'connectors',
    dbt_transformation_management: 'dbt_transformations',
    webhook_management: 'webhooks',
    metadata_management: 'connectors',
    role_management: 'roles',
};

export const serviceDescriptions = {};

    // service: {
    //     nameMap: {
    //         inResourceName: 'outResourceName',
    //     },
    //     opIdMap: {
    //         opId: 'resourceName',
    //     },
    // },

export const resourcesMap = {
    connectors: {
        nameMap: {
            sync: 'connectors',
            resync: 'connectors',
            test: 'connectors',
            connect_card: 'connectors',
            metadata: 'metadata',
            schemas_reload: 'schemas',
            metadata_schemas: 'schema_metadata',
            schemas_tables_columns: 'column_config',
            metadata_columns: 'column_metadata',
            schemas_tables: 'table_config',
            metadata_tables: 'table_metadata',
            schemas_tables_resync: 'table_config',
        },
    },
    dbt_transformations: {
        nameMap: {
            dbt_projects_models: 'dbt_project_models',
            dbt_projects_test: 'dbt_projects',
            dbt_projects_transformations: 'dbt_project_transformations',
        },
    },
    destinations: {
        nameMap: {
            test: 'destinations',
        },
    },
    webhooks: {
        nameMap: {        
            test: 'webhooks',
        },
    },
};


/*
objectKeysAndSqlVerbs:

service
└── resource
    └── method
        ├── objectKey: string
        └── sqlVerb: string
*/

export const objectKeysAndSqlVerbs = {
    roles: {
        roles: {
            list_all_roles: {
                objectKey: '$.data.items',
            }
        }
    },
    connectors: {
        column_config: {
            connector_column_config: {
                objectKey: '$.data',
                sqlVerb: 'select',
            }
        },
        connectors: {
            connector_details: {
                objectKey: '$.data',
                sqlVerb: 'select',
            }
        },
        metadata: {
        },
        schemas: {
            connector_schema_config: {
                objectKey: '$.data',
                sqlVerb: 'select',
            }
        },
        schema_metadata: {
            schema_metadata: {
                objectKey: '$.data.items',
                sqlVerb: 'select',
            }
        },
        column_metadata: {
            column_metadata: {
                objectKey: '$.data.items',
                sqlVerb: 'select',
            }
        },
        table_metadata: {
            table_metadata: {
                objectKey: '$.data.items',
                sqlVerb: 'select',
            }
        }        
    },
    dbt_transformations: {
        dbt_transformations: {
            dbt_transformation_details: {
                objectKey: '$.data',
                sqlVerb: 'select',
            }
        },
        dbt_projects: {
            dbt_project_details: {
                objectKey: '$.data',
                sqlVerb: 'select',
            },
            list_dbt_projects: {
                objectKey: '$.data.items',
            }
        },
        dbt_project_transformations: {
            list_dbt_project_transformations: {
                objectKey: '$.data.items',
            }
        },
        dbt_project_models: {
            list_dbt_project_models: {
                objectKey: '$.data.items',
            }
        },   
        dbt_models: {
            dbt_model_details: {
                objectKey: '$.data',
                sqlVerb: 'select',                
            }
        },        
    },
    destinations: {
        destinations: {
            destination_details: {
                objectKey: '$.data',
                sqlVerb: 'select',
            }
        }
    },
    groups: {
        groups: {
            group_details: {
                objectKey: '$.data',
                sqlVerb: 'select',
            },
            list_all_groups: {
                objectKey: '$.data.items',
            }
        },
        users: {
            list_all_users_in_group: {
                objectKey: '$.data.items',
            }
        },
        connectors: {
            list_all_connectors_in_group: {
                objectKey: '$.data.items',
            }
        }
    },
    teams: {
        connectors: {
            get_team_memberships_in_connectors: {
                objectKey: '$.data.items',
            },
            get_team_membership_in_connector: {
                objectKey: '$.data',
            },            
        },
        users: {
            get_user_in_team: {
                objectKey: '$.data',
            },
            list_users_in_team: {
                objectKey: '$.data.items',
            },
        },
        teams: {
            team_details: {
                objectKey: '$.data',
                sqlVerb: 'select',
            },
            list_all_teams: {
                objectKey: '$.data.items',
            }

        },
        groups: {
            get_team_memberships_in_groups: {
                objectKey: '$.data.items',
            },
            get_team_membership_in_group: {
                objectKey: '$.data',
            },
        }
    },
    users: {
        users: {
            user_details: {
                objectKey: '$.data',
                sqlVerb: 'select',
            },
            list_all_users: {
                objectKey: '$.data.items',
            }
        },
        groups: {
            get_user_memberships_in_groups: {
                objectKey: '$.data.items',
            },
            get_user_membership_in_group: {
                objectKey: '$.data',
            },
        },
        connectors: {
            get_user_memberships_in_connectors: {
                objectKey: '$.data.items',
            },
            get_user_membership_in_connector: {
                objectKey: '$.data',
            },
        }
    },
    webhooks: {
        webhooks: {
            webhook_details: {
                objectKey: '$.data',
                sqlVerb: 'select',
            },
            list_all_webhooks: {
                objectKey: '$.data.items',
            }
        },
    }
}