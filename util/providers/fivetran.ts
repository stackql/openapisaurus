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
