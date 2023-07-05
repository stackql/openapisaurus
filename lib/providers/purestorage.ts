export const servicesMap = {
};

export const serviceDescriptions = {};

export const resourcesMap = {
    fusion: {
        opIdMap: {
            get_availability_zone_performance: 'zone_performance',
            get_availability_zone_space: 'zone_space',
            get_tenant_performance: 'tenant_performance',
            get_tenants_space: 'tenants_space',
            get_volume_performance: 'volume_performance',
            get_volume_space: 'volume_space',
            get_placement_groups_performance: 'placement_groups_performance',
            get_placement_groups_space: 'placement_groupstenant_space_name_space',
            get_placement_group_sessions: 'placement_group_sessions',
            get_array_performance: 'array_performance',
            get_array_space: 'array_space',
            list_users: 'api_client_users'
        },
    },
};
export const objectKeysAndSqlVerbs = {
    // _defaultObjectKey: '$.data',
    fusion: {
        operations: {
            get_operation_by_id: {
                sqlVerb: 'exec',
            },
        },
        tenant_spaces: {
            get_tenant_space_performance: {
                sqlVerb: 'exec',
            },
            get_tenant_space_space: {
                sqlVerb: 'exec',
            }

        },
        identity_manager: {
            get_api_client_by_id: {
                sqlVerb: 'exec',
            },
        }
    },     
}