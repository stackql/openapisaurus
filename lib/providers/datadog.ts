export const servicesMap = {
    ci_visibility_pipelines: 'ci_visibility',
    ci_visibility_tests: 'ci_visibility',
    container_images: 'containers',
    logs_archives: 'log_archives',
    logs_metrics: 'log_metrics',
    spans_metrics: 'span_metrics',
    incident_teams: 'incidents',
    incident_services: 'incidents',
}

export const resourcesMap = {
    containers: {
        nameMap: {
            container_images: 'images',
        },
        opIdMap: {},
    },
    logs: {
        nameMap: {
            logs_gets: 'log_search',
        },
        opIdMap: {},
    },
    log_archives: {
        nameMap: {
            logs_archive_orders: 'log_archive_orders',
            logs_archives: 'log_archives',
            read_role_to_archives: 'log_archives',
            role_from_archives: 'log_archives',
        },
        opIdMap: {},
    },
    log_metrics: {
        nameMap: {
            logs_metrics: 'log_metrics',
        },
        opIdMap: {},
    },
    monitors: {
        nameMap: {
            monitor_config_policys: 'monitor_config_policies',
        },
        opIdMap: {},
    },
    restriction_policies: {
        nameMap: {
            restriction_policys: 'restriction_policies',
        },
        opIdMap: {},
    },   
    span_metrics: {
        nameMap: {
            spans_metrics: 'span_metrics',
        },
        opIdMap: {},
    },
    service_definition: {
        nameMap: {
            or_update_service_definitions: 'service_definitions',
        },
        opIdMap: {},
    },
    roles: {
        nameMap: {
            user_from_roles: 'role_users',
            user_to_roles: 'role_users',
            permission_from_roles: 'role_permissions',
            permission_to_roles: 'role_permissions',
        },
        opIdMap: {},
    },
    service_scorecards: {
        nameMap: {
            scorecard_outcomes_batchs: 'scorecard_outcomes',
        },
        opIdMap: {},
    },
    spans: {
        nameMap: {
            spans_gets: 'span_query',
        },
        opIdMap: {},
    },
    metrics: {
        nameMap: {
            timeseries_datas: 'timeseries_data',
            bulk_tags_metrics_configurations: 'active_metric_configurations',
            volumes_by_metric_names: 'volumes_by_metric_name',
            tag_configuration_by_names: 'tag_configuration_by_name',
            scalar_datas: 'scalar_data',
        },
        opIdMap: {},
    },
    organizations: {
        nameMap: {
            idp_metadatas: 'idp_metadata',
        },
        opIdMap: {},
    },
    security_monitoring: {
        nameMap: {
            security_monitoring_signal_assignees: 'security_monitoring_signals',
            security_monitoring_signal_incidents: 'security_monitoring_signals',
            security_monitoring_signal_states: 'security_monitoring_signals',
        },
        opIdMap: {},
    },        
}

export const stackqlMethodNameMap = {
    methodNameByOpIdMap: {},
    methodNameTransforms: {},
    methodNameMap: {},
}

export const objectKeysAndSqlVerbs = {
    dashboard_lists: {
        dashboard_list_items: {
            get_dashboard_list_items: {
                objectKey: '$.dashboards',
            },
        },
    },
    security_monitoring: {
        security_monitoring_rules: {
            list_security_monitoring_rules: {
                objectKey: false,
            },
            get_security_monitoring_rule: {
                objectKey: false,
            },
        },
    },
    logs: {
        logs: {
            list_logs: {
                sqlVerb: 'select',
            },
        },
    },
    metrics: {
        timeseries_data: {
            query_timeseries_data: {
                sqlVerb: 'select',
            },
        },
        scalar_data: {
            query_scalar_data: {
                sqlVerb: 'select',
            },
        },
    },
    spans: {
        spans: {
            list_spans: {
                sqlVerb: 'select',
            },
        },
    },
    log_archives: {
        log_archives: {
            remove_role_from_archive: {
                sqlVerb: 'exec',
            },
        },
    },

    _defaultObjectKey: '$.data',    
}