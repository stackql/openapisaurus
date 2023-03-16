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

export const resourcesMap = {
    connectors: {
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
    dbt_transformations: {
        dbt_projects_models: 'dbt_project_models',
        dbt_projects_test: 'dbt_projects',
        dbt_projects_transformations: 'dbt_project_transformations',
    },
    destinations: {
        test: 'destinations',
    },
    webhooks: {
        test: 'webhooks',
    }
};

export const objectKeys = {
    roles: {
        roles: {
            list_all_roles: '$.data.items'
        }
    },
    connectors: {
        column_config: {
            connector_column_config: '$.data'
        },
        connectors: {
            connector_details: '$.data',
        },
        metadata: {
            connectors: '$.data.items',
            connector_config: '$.data.items',
        },
        schemas: {
            connector_schema_config: '$.data',
        },
        schema_metadata: {
            schema_metadata: '$.data.items',
        },
        column_metadata: {
            column_metadata: '$.data.items',
        },
        table_metadata: {
            table_metadata: '$.data.items',
        }        
    }
};

export const sqlVerbs = {
    connectors: {
        column_config: {
            connector_column_config: 'select'
        },
        connectors: {
            connector_details: 'select',
        },
        metadata: {
            connectors: 'select',
            connector_config: 'select',
        },
        schemas: {
            connector_schema_config: 'select',
        },
        schema_metadata: {
            schema_metadata: 'select',
        },
        column_metadata: {
            column_metadata: 'select',
        },
        table_metadata: {
            table_metadata: 'select',
        }
    },
};
