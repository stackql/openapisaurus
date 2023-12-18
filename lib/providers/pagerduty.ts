export const servicesMap = {}

export const resourcesMap = {
    custom_fields: {
        nameMap: {
            customfields_fields_schemas: 'fields_schemas',
            customfields_schemas: 'schemas',
            customfields_schemas_field_configurations: 'field_configurations',
            customfields_schema_assignments: 'schema_assignments',
        },
        opIdMap: {},
    },
    response_plays: {
        nameMap: {
            run: 'response_plays',
        },
        opIdMap: {},        
    },
    tags: {
        nameMap: {
            change_tags: 'tags',
        },
        opIdMap: {},        
    },
    teams: {
        nameMap: {
            notification_subscriptions_unsubscribe: 'notification_subscriptions',
        },
        opIdMap: {},        
    },
    templates: {
        nameMap: {
            render: 'templates',
        },
        opIdMap: {},        
    },
    users: {
        nameMap: {
            notification_subscriptions_unsubscribe: 'notification_subscriptions',
        },
        opIdMap: {},        
    },
    webhooks: {
        nameMap: {
            webhook_subscriptions_enable: 'webhook_subscriptions',
            webhook_subscriptions_ping: 'webhook_subscriptions',
        },
        opIdMap: {},        
    },                
}

export const stackqlMethodNameMap = {
    methodNameByOpIdMap: {
        // 'ServiceName': {
        //     'operationId1': 'customMethodName1',
        // }
    },
    methodNameTransforms: {
        // 'ServiceName': (operationId) => `transformed_${operationId}`,
        // 'allServices': (operationId) => `general_transformed_${operationId}`
    },
    methodNameMap: {
        add_ons: {
            addons: {
                list_addon: 'list_addons',
            }
        },
    }
};

export const objectKeysAndSqlVerbs = {

    _objectKeyExpression: (service: string, resource: string, stackQLMethodName: string) => {
        const methodPrefixes = ['list_', 'get_'];
        const multiPartSuffixes = [
            'change_event', 'change_events', 
            'field_option', 'field_options', 
            'field_values',
            'field_configuration', 'field_configurations',
            'schema_assignment', 'schema_assignments',
            'extension_schema', 'extension_schemas',
            'incident_workflow', 'incident_workflows',
            'log_entries',
            'outlier_incident',
            'past_incidents',
            'related_incidents',
            'license_allocations',
            'maintenance_window', 'maintenance_windows',
            'webhook_subscription', 'webhook_subscriptions',
        ];
    
        // Check for multi part suffixes
        for (const suffix of multiPartSuffixes) {
            if (stackQLMethodName.endsWith(suffix)) {
                return suffix;
            }
        }
    
        // Process other methods with list_ or get_ prefixes
        for (const prefix of methodPrefixes) {
            if (stackQLMethodName.startsWith(prefix)) {
                const parts = stackQLMethodName.split('_');
                return parts[parts.length - 1]; // Return the last part
            }
        }
    
        return false;
    },
    
    analytics: {
        metrics_incidents_all: {
            get_analytics_metrics_incidents_all: {
                sqlVerb: 'select',    
                objectKey: '$.data',
            },
        },
        metrics_incidents_services: {
            get_analytics_metrics_incidents_service: {
                sqlVerb: 'select',    
                objectKey: '$.data',
            },
        },
        metrics_incidents_teams: {
            get_analytics_metrics_incidents_team: {
                sqlVerb: 'select',    
                objectKey: '$.data',
            },
        },
        raw_incidents: {
            get_analytics_incidents: {
                sqlVerb: 'select',    
                objectKey: '$.data',
            },
        },
        raw_incidents_responses: {
            get_analytics_incident_responses_by_id: {
                objectKey: '$.responses',
            },
        },                        
    },
    automation_actions: {
        actions_services: {
            get_automation_actions_action_service_association: {
                objectKey: '$.service',
            },
            get_automation_actions_action_service_associations: {
                objectKey: '$.services',
            },
        },
        actions_teams: {
            get_automation_actions_action_team_association: {
                objectKey: '$.team',
            },
            get_automation_actions_action_team_associations: {
                objectKey: '$.teams',
            },            
        },
        runners_teams: {
            get_automation_actions_runner_team_association: {
                objectKey: '$.team',
            },
            get_automation_actions_runner_team_associations: {
                objectKey: '$.teams',
            },
        },
    },
    business_services: {
        impacts: {
            get_business_service_impacts: {
                objectKey: '$.services',
            },
        },
        priority_thresholds: {
            get_business_service_priority_thresholds: {
                objectKey: '$.global_threshold',
            },
        },
        supporting_services_impacts: {
            get_business_service_supporting_service_impacts: {
                objectKey: '$.services',
            },
        },
    },
    custom_fields: {
        fields_schemas: {
            list_custom_fields_schemas_using_field: {
                objectKey: '$.schemas',
            },
        },
    },
    escalation_policies: {
        escalation_policies: {
            get_escalation_policy: {
                objectKey: '$.escalation_policy',
            },
            list_escalation_policies: {
                objectKey: '$.escalation_policies',
            },
        },
    },
    event_orchestrations: {
        global: {
            get_orch_path_global: {
                objectKey: '$.orchestration_path',
            },
        },
        router: {
            get_orch_path_router: {
                objectKey: '$.orchestration_path',
            },
        },
        services: {
            get_orch_path_service: {
                objectKey: '$.orchestration_path',
            },
        },
        unrouted: {
            get_orch_path_unrouted: {
                objectKey: '$.orchestration_path',
            },
        },
    },
    incidents: {
        field_values_schema: {
            get_schema_for_incident: {
                objectKey: '$.schema',
            },
        },
    },
    on_calls: {
        oncalls: {
            list_on_calls: {
                objectKey: '$.oncalls',
            },
        },
    },
    paused_incident_reports: {
        alerts: {
            get_paused_incident_report_alerts: {
                objectKey: '$.paused_incident_reporting_alerts',
            },
        },
        counts: {
            get_paused_incident_report_counts: {
                objectKey: '$.paused_incident_reporting_counts',
            },
        },
    },
    service_dependencies: {
        business_services: {
            get_business_service_service_dependencies: {
                objectKey: '$.relationships',
            },
        },
        technical_services: {
            get_technical_service_service_dependencies: {
                objectKey: '$.relationships',
            },
        },
    },
    status_dashboards: {
        service_impacts: {
            get_status_dashboard_service_impacts_by_id: {
                objectKey: '$.services',
            },
        },
        url_slugs: {
            get_status_dashboard_by_url_slug: {
                objectKey: '$.status_dashboard',
            },
        },
        url_slugs_service_impacts: {
            get_status_dashboard_service_impacts_by_url_slug: {
                objectKey: '$.services',
            },
        },
    },
    teams: {
        members: {
            list_team_users: {
                objectKey: '$.members',
            },
        },
    },
    users: {
        oncall_handoff_notification_rules: {
            get_user_handoff_notifiaction_rule: {
                objectKey: '$.oncall_handoff_notification_rule',
            },
            get_user_handoff_notification_rules: {
                objectKey: '$.oncall_handoff_notification_rules',
            },            
        }
    },
}
