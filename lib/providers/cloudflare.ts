export const servicesMap = {
    'access_bookmarkapplications(_deprecated)': 'access',
    accessapplications: 'access',
    accessauthenticationlogs: 'access',
    accessgroups: 'access',
    accessidentityproviders: 'access',
    accesskeyconfiguration: 'access',
    accessm_tlsauthentication: 'access',
    accesspolicies: 'access',
    accessservicetokens: 'access',
    accessshort_livedcertificate_cas: 'access',
    account_billing_profile: 'accounts',
    account_level_custom_nameservers: 'custom_nameservers',
    account_level_custom_nameservers_usagefora_zone: 'custom_nameservers',
    account_load_balancer_monitors: 'load_balancers',
    account_load_balancer_pools: 'load_balancers',
    account_load_balancer_search: 'load_balancers',
    account_members: 'accounts',
    account_railguns: 'railgun',
    account_roles: 'accounts',
    account_rulesets: 'rulesets',
    account_subscriptions: 'accounts',
    accounts: 'accounts',
    analyze_certificate: 'certificates',
    api_shield_endpoint_management: 'api_shield',
    api_shield_settings: 'api_shield',
    argo_analyticsfor_geolocation: 'argo',
    argo_analyticsfor_zone: 'argo',
    argo_smart_routing: 'argo',
    argo_tunnel: 'argo',
    asn_intelligence: 'intelligence',
    audit_logs: 'accounts',
    available_page_rulessettings: 'pages',
    certificate_packs: 'certificates',
    cloudflare_images: 'image_optimization',
    cloudflare_images_keys: 'image_optimization',
    cloudflare_images_variants: 'image_optimization',
    cloudflare_ips: 'cloudflare_ips',
    cloudflare_tunnel: 'cloudflare_tunnel',
    cloudflare_tunnelconfiguration: 'cloudflare_tunnel',
    custom_error_responses: 'rulesets',
    custom_hostname_fallback_originfora_zone: 'custom_hostnames',
    custom_hostnamefora_zone: 'custom_hostnames',
    custom_sslfora_zone: 'ssl_tls',
    custompagesforanaccount: 'pages',
    custompagesforazone: 'pages',
    device_posture_integrations: 'devices',
    device_posture_rules: 'devices',
    devices: 'devices',
    diagnostics: 'accounts',
    dlp_pattern_validation: 'data_loss_prevention',
    dlp_profiles: 'data_loss_prevention',
    dns_analytics: 'dns',
    dns_firewall: 'dns',
    'dns_firewall(_legacy)': 'dns',
    dns_firewall_analytics: 'dns',
    'dns_firewall_analytics(_legacy)': 'dns',
    dns_recordsfora_zone: 'dns',
    dnssec: 'dns',
    domain_history: 'intelligence',
    domain_intelligence: 'intelligence',
    durable_objects_namespace: 'workers',
    email_routingdestinationaddresses: 'email_routing',
    email_routingroutingrules: 'email_routing',
    email_routingsettings: 'email_routing',
    filters: 'zones',
    firewallrules: 'zones',
    health_checks: 'zones',
    ip_accessrulesforanaccount: 'access_rules',
    ip_accessrulesforauser: 'access_rules',
    ip_accessrulesforazone: 'access_rules',
    ip_address_management_address_maps: 'ip_address_management',
    ip_address_management_dynamic_advertisement: 'ip_address_management',
    ip_address_management_prefix_delegation: 'ip_address_management',
    ip_address_management_prefixes: 'ip_address_management',
    ip_intelligence: 'intelligence',
    ip_list: 'intelligence',
    keyless_sslfora_zone: 'ssl_tls',
    lists: 'lists',
    load_balancer_healthcheck_events: 'load_balancers',
    load_balancer_monitors: 'load_balancers',
    load_balancer_pools: 'load_balancers',
    load_balancer_regions: 'load_balancers',
    load_balancers: 'load_balancers',
    logpush_jobs: 'logs',
    logs_received: 'logs',
    magic_gretunnels: 'magic',
    magic_interconnects: 'magic',
    magic_ipsectunnels: 'magic',
    magic_network_monitoring_configuration: 'magic',
    magic_network_monitoring_rules: 'magic',
    magic_pcapcollection: 'magic',
    magic_static_routes: 'magic',
    managed_transforms: 'zones',
    miscategorization: 'intelligence',
    notification_alert_types: 'notifications',
    notification_history: 'notifications',
    notification_mechanism_eligibility: 'notifications',
    notificationdestinationswith_pager_duty: 'notifications',
    notificationpolicies: 'notifications',
    notificationwebhooks: 'notifications',
    organization_invites: 'organization',
    organization_members: 'organization',
    organization_railgun: 'railgun',
    organization_roles: 'organization',
    'organizations(_deprecated)': 'organization',
    origin_ca: 'certificates',
    page_rules: 'pages',
    page_shield: 'page_shield',
    pages_deployment: 'pages',
    pages_domains: 'pages',
    pages_project: 'pages',
    passive_dnsby_ip: 'intelligence',
    per_hostname_authenticated_origin_pull: 'origin_pulls',
    permission_groups: 'users',
    phishing_url_scanner: 'intelligence',
    queue: 'workers',
    r2_bucket: 'pages',
    radar_bgp: 'radar',
    radar_dns: 'radar',
    radar_http: 'radar',
    radar_net_flows: 'radar',
    radarannotations: 'radar',
    radarattacks: 'radar',
    radardatasets: 'radar',
    radarentities: 'radar',
    radarranking: 'radar',
    radarsearch: 'radar',
    radarspecialevents: 'radar',
    radarverifiedbots: 'radar',
    railgun: 'railgun',
    railgun_connections: 'railgun',
    railgun_connectionsfora_zone: 'railgun',
    ratelimitsforazone: 'zones',
    registrar_domains: 'domains',
    'secondary_dns(_acl)': 'dns',
    'secondary_dns(_peer)': 'dns',
    'secondary_dns(_primary_zone)': 'dns',
    'secondary_dns(_secondary_zone)': 'dns',
    'secondary_dns(_tsig)': 'dns',
    spectrum_aggregate_analytics: 'spectrum',
    'spectrum_analytics(_by_time)': 'spectrum',
    'spectrum_analytics(_summary)': 'spectrum',
    spectrum_applications: 'spectrum',
    ssl_tls_mode_recommendation: 'ssl_tls',
    ssl_verification: 'ssl_tls',
    stream_live_inputs: 'cloudflare_stream',
    stream_mp4_downloads: 'cloudflare_stream',
    stream_signing_keys: 'cloudflare_stream',
    stream_subtitles_captions: 'cloudflare_stream',
    stream_video_clipping: 'cloudflare_stream',
    stream_videos: 'cloudflare_stream',
    stream_watermark_profile: 'cloudflare_stream',
    stream_webhook: 'cloudflare_stream',
    total_tls: 'ssl_tls',
    transform_rules: 'zones',
    tunnel_route: 'teamnet',
    tunnel_virtual_network: 'teamnet',
    universal_ssl_settingsfora_zone: 'ssl_tls',
    url_normalization: 'zones',
    user: 'users',
    "user's_account_memberships": 'users',
    "user's_invites": 'users',
    "user's_organizations": 'users',
    user_agent_blockingrules: 'users',
    user_api_tokens: 'users',
    user_billing_history: 'users',
    user_billing_profile: 'users',
    user_subscription: 'users',
    wafoverrides: 'waf',
    wafpackages: 'waf',
    wafrulegroups: 'waf',
    wafrules: 'waf',
    waiting_room: 'waiting_rooms',
    web3_hostname: 'web3',
    whois_record: 'intelligence',
    worker_account_settings: 'workers',
    'worker_binding(_deprecated)': 'workers',
    worker_cron_trigger: 'workers',
    worker_domain: 'workers',
    'worker_filters(_deprecated)': 'workers',
    worker_routes: 'workers',
    worker_script: 'workers',
    'worker_script(_deprecated)': 'workers',
    worker_subdomain: 'workers',
    worker_tail_logs: 'logs',
    workers_kv_namespace: 'workers',
    workers_kv_request_analytics: 'workers',
    workers_kv_stored_data_analytics: 'workers',
    zero_trust_gateway_applicationand_application_typemappings: 'zero_trust',
    zero_trust_gateway_categories: 'zero_trust',
    zero_trust_gateway_locations: 'zero_trust',
    zero_trust_gateway_proxy_endpoints: 'zero_trust',
    zero_trust_gateway_rules: 'zero_trust',
    zero_trust_lists: 'zero_trust',
    zero_trustaccounts: 'zero_trust',
    zero_trustorganization: 'zero_trust',
    zero_trustseats: 'zero_trust',
    zero_trustusers: 'zero_trust',
    zone: 'zones',
    'zone_analytics(_deprecated)': 'zones',
    zone_cache_settings: 'zones',
    zone_level_accessapplications: 'access',
    zone_level_accessgroups: 'access',
    zone_level_accessidentityproviders: 'access',
    zone_level_accessm_tlsauthentication: 'access',
    zone_level_accesspolicies: 'access',
    zone_level_accessservicetokens: 'access',
    zone_level_accessshort_livedcertificate_cas: 'access',
    zone_level_authenticated_origin_pulls: 'origin_pulls',
    zone_level_zero_trustorganization: 'zero_trust',
    zone_lockdown: 'zones',
    zone_rate_plan: 'zones',
    zone_rulesets: 'rulesets',
    zone_settings: 'zones',
    zone_subscription: 'zones',
};

export const resourcesMap = {
    // service: {
    //     nameMap: {
    //         inResourceName: 'outResourceName',
    //     },
    //     opIdMap: {
    //         opId: 'resourceName',
    //     },
    // },
    zones:{
        nameMap: {
            cache_cache_reserve: 'cache_reserve',
            firewall_lockdowns: 'firewall_lockdown_rules',
        },        
    },
    image_optimization: {
        opIdMap: {
            'cloudflare-images-create-authenticated-direct-upload-url-v-2': 'accounts_images_direct_upload_v2',
        },
    },
};

export const objectKeysAndSqlVerbs = {
    _defaultObjectKey: '$.result',
    access: {
        accounts_apps: {
            applications_list_access_applications: {
                objectKey: '$',
            },
            applications_get_an_access_application: {
                objectKey: '$',
            },
        },
        accounts_keys: {
            key_configuration_get_the_access_key_configuration: {
                objectKey: '$',
            },
        },
        zones_apps: {
            zone_level_access_applications_list_access_applications: {
                objectKey: '$',
            },
            zone_level_access_applications_get_an_access_application: {
                objectKey: '$',
            },
        },
    },
    access_rules: {
        accounts_firewall_rules: {
            ip_access_rules_for_an_account_get_an_ip_access_rule: {
                objectKey: '$',
            },
            ip_access_rules_for_an_account_list_ip_access_rules: {
                objectKey: '$',
            },
        },
    },
    accounts: {
        accounts: {
            account_details: {
                objectKey: '$',
            },
            list_accounts: {
                objectKey: '$',
            },
        },
        billing_profile: {
            account_billing_profile_billing_profile_details: {
                objectKey: '$',
            },
        },
        members: {
            account_members_list_members: {
                objectKey: '$',
            },
            account_members_member_details: {
                objectKey: '$',
            },
        },
        roles: {
            account_roles_list_roles: {
                objectKey: '$',
            },
            account_roles_role_details: {
                objectKey: '$',
            },
        },
    },
    argo: {
        zones_smart_routing: {
            smart_routing_get_argo_smart_routing_setting: {
                objectKey: '$',
            },
        },
    },
    certificates: {
        zones_ssl_certificate_packs: {
            certificate_packs_get_certificate_pack: {
                objectKey: '$',
            },
            certificate_packs_list_certificate_packs: {
                objectKey: '$',
            },
        },
        zones_ssl_certificate_packs_quota: {
            certificate_packs_get_certificate_pack_quotas: {
                objectKey: '$.result.advanced',
            },
        },
    },
    cloudflare_stream: {
        accounts_stream_downloads: {
            stream_m_p_4_downloads_list_downloads: {
                objectKey: '$',
            },
        },
        accounts_stream_live_inputs_outputs: {
            stream_live_inputs_list_all_outputs_associated_with_a_specified_live_input: {
                objectKey: '$',
            },
        },
    },
    cloudflare_tunnel: {
        accounts_cfd_tunnel_configurations: {
            configuration_get_configuration: {
                objectKey: '$',
            },
        },
        accounts_cfd_tunnel_token: {
            get_cloudflare_tunnel_token: {
                objectKey: '$',
            },
        },
    },
    custom_hostnames: {
        zones_fallback_origin: {
            custom_hostname_fallback_origin_for_a_zone_get_fallback_origin_for_custom_hostnames: {
                objectKey: '$',
            },
        }, 
    },
    custom_nameservers: {
        accounts_custom_ns: {
            account_level_custom_nameservers_list_account_custom_nameservers: {
                objectKey: '$',
            },
        },
        accounts_custom_ns_availability: {
            account_level_custom_nameservers_get_eligible_zones_for_account_custom_nameservers: {
                objectKey: '$',
            },
        },
        zones_custom_ns: {
            account_level_custom_nameservers_usage_for_a_zone_get_account_custom_nameserver_related_zone_metadata: {
                objectKey: '$',
            },
        },
    },
    devices: {
    },
    email_routing: {
        zones_email_routing_rules_catch_all: {
            routing_rules_get_catch_all_rule: {
                objectKey: '$',
            },
        },
        zones_email_routing: {
            settings_get_email_routing_settings: {
                objectKey: '$',
            },
        },
    },
    dns: {
        zones_dns_records: {
            records_for_a_zone_dns_record_details: {
                objectKey: '$',
            },
            records_for_a_zone_list_dns_records: {
                objectKey: '$',
            },			
        },
        zones_dnssec: {
            dnssec_dnssec_details: {
                objectKey: '$',
            },
        },
        zones_secondary_dns_outgoing_status: {
            secondary_dns___primary_zone__get_outgoing_zone_transfer_status: {
                objectKey: '$',
            },
        },
    },
    domains: {
        accounts_registrar: {
            registrar_domains_get_domain: {
                objectKey: '$',
            },
        },
    },
    image_optimization: {
        accounts_images_keys: {
            cloudflare_images_keys_list_signing_keys: {
                objectKey: '$.result.keys',
            },
        },
        accounts_images_variants: {
            cloudflare_images_variants_list_variants: {
                sqlVerb: 'exec',
                // objectKey: '$.result.variants',
            },
            cloudflare_images_variants_variant_details: {
                sqlVerb: 'exec',
                // objectKey: '$.result',
            },
        },
    },
    intelligence: {
        accounts_intel_asn: {
            asn_intelligence_get_asn_overview: {
                objectKey: '$',
            },
        },
        accounts_intel_asn_subnets: {
            asn_intelligence_get_asn_subnets: {
                objectKey: '$',
            },
        },
        accounts_intel_dns: {
            passive_dns_by_ip_get_passive_dns_by_ip: {
                objectKey: '$',
            },
        },
        accounts_intel_domain: {
            domain_intelligence_get_domain_details: {
                objectKey: '$',
            },
        },
        accounts_intel_domain_bulk: {
            domain_intelligence_get_multiple_domain_details: {
                objectKey: '$',
            },
        },
        accounts_intel_domain_history: {
            domain_history_get_domain_history: {
                objectKey: '$',
            },
        },
        accounts_intel_ip: {
            ip_intelligence_get_ip_overview: {
                objectKey: '$',
            },
        },
        accounts_intel_ip_list: {
            ip_list_get_ip_lists: {
                objectKey: '$',
            },
        },
        accounts_intel_whois: {
            whois_record_get_whois_record: {
                objectKey: '$',
            },
        },
    },
    load_balancers: {
        accounts_pools_health: {
            account_load_balancer_pools_pool_health_details: {
                objectKey: '$',
            },
        },
        accounts_regions: {
            load_balancer_regions_get_region: {
                objectKey: '$',
            },
            load_balancer_regions_list_regions: {
                objectKey: '$',
            },			
        },
        user_pools_health: {
            load_balancer_pools_pool_health_details: {
                objectKey: '$',
            },
        },
    },
    logs: {
        accounts_workers_scripts_tails: {
            worker_tail_logs_list_tails: {
                objectKey: '$',
            },
        },
        zones_logpush_datasets_fields: {
            logpush_jobs_list_fields: {
                objectKey: '$',
            },
        },
        zones_logpush_datasets_jobs: {
            logpush_jobs_list_logpush_jobs_for_a_dataset: {
                objectKey: '$',
            },
        },
        zones_logpush_jobs: {
            logpush_jobs_get_logpush_job_details: {
                objectKey: '$',
            },
            logpush_jobs_list_logpush_jobs: {
                objectKey: '$',
            },			
        },        
        zones_rayids: {
            received_get_logs_ray_i_ds: {
                sqlVerb: 'exec',
            },
        },
        zones_received: {
            received_get_logs_received: {
                sqlVerb: 'exec',
            },
        },
        zones_received_fields: {
            received_list_fields: {
                objectKey: '$',
            },
        },
    },
    magic: {
        accounts_cf_interconnects: {
            interconnects_list_interconnect_details: {
                objectKey: '$.result.interconnect',
            },
            interconnects_list_interconnects: {
                objectKey: '$.result.interconnects',
            },
        },
        accounts_gre_tunnels: {
            gre_tunnels_list_gre_tunnels: {
                objectKey: '$.result.gre_tunnels',
            },
            gre_tunnels_list_gre_tunnel_details: {
                objectKey: '$.result.gre_tunnel',
            },
        },
        accounts_ipsec_tunnels: {
            i_psec_tunnels_list_i_psec_tunnel_details: {
                objectKey: '$.result.ipsec_tunnel',
            },
            i_psec_tunnels_list_i_psec_tunnels: {
                objectKey: '$.result.ipsec_tunnels',
            },
        },
        accounts_mnm_config: {
            network_monitoring_configuration_list_account_configuration: {
                objectKey: '$',
            },
        },
        accounts_mnm_config_full: {
            network_monitoring_configuration_list_rules_and_account_configuration: {
                objectKey: '$',
            },
        },
        accounts_mnm_rules: {
            network_monitoring_rules_get_rule: {
                objectKey: '$',
            },
            network_monitoring_rules_list_rules: {
                objectKey: '$',
            },
        },
        accounts_routes: {
            static_routes_list_routes: {
                objectKey: '$',
            },
        },
    },
    notifications: {
        accounts_alerting_available_alerts: {
            notification_alert_types_get_alert_types: {
                objectKey: '$',
            },
        },
        accounts_alerting_destinations_eligible: {
            notification_mechanism_eligibility_get_delivery_mechanism_eligibility: {
                objectKey: '$',
            },
        },
    },
    organization: {
        organizations: {
            __deprecated__organization_details: {
                // objectKey: '$',
                sqlVerb: 'exec',
            },
        },
        organizations_invites: {
            invites_invitation_details: {
                objectKey: '$',
            },
            invites_list_invitations: {
                objectKey: '$',
            },			
        },
    },
    origin_pulls: {
        zones_origin_tls_client_auth_hostnames: {
            per_hostname_authenticated_origin_pull_get_the_hostname_status_for_client_authentication: {
                objectKey: '$',
            },
        },
        zones_origin_tls_client_auth_settings: {
            zone_level_authenticated_origin_pulls_get_enablement_setting_for_zone: {
                objectKey: '$',
            },
        },
    },
    page_shield: {
        zones: {
            get_page_shield_settings: {
                objectKey: '$',
            },
        },
        zones_connections: {
            list_page_shield_connections: {
                objectKey: '$',
            },
            get_a_page_shield_connection: {
                objectKey: '$',
            },
        },
        zones_scripts: {
            get_a_page_shield_script: {
                objectKey: '$',
            },
            list_page_shield_scripts: {
                objectKey: '$',
            },
        },
    },
    pages: {
        accounts_custom_pages: {
            custom_pages_for_an_account_get_a_custom_page: {
                objectKey: '$',
            },
            custom_pages_for_an_account_list_custom_pages: {
                objectKey: '$',
            },			
        },
        accounts_projects: {
            project_get_project: {
                objectKey: '$',
            },
            project_get_projects: {
                objectKey: '$',
            },			
        },
        accounts_projects_deployments: {
            deployment_get_deployment_info: {
                objectKey: '$',
            },
            deployment_get_deployments: {
                objectKey: '$',
            },			
        },
        accounts_projects_deployments_history_logs: {
            deployment_get_deployment_logs: {
                objectKey: '$',
            },
        },
        accounts_projects_domains: {
            domains_get_domain: {
                objectKey: '$',
            },
            domains_get_domains: {
                objectKey: '$',
            },			
        },
        zones_custom_pages: {
            custom_pages_for_a_zone_get_a_custom_page: {
                objectKey: '$',
            },
            custom_pages_for_a_zone_list_custom_pages: {
                objectKey: '$',
            },			
        },
        zones_pagerules: {
            page_rules_get_a_page_rule: {
                objectKey: '$',
            },
            page_rules_list_page_rules: {
                objectKey: '$',
            },			
        },
        zones_pagerules_settings: {
            available_page_rules_settings_list_available_page_rules_settings: {
                objectKey: '$',
            },
        },
    },
    radar: {
        annotations_outages: {
            annotations_get_outages_annotations: {
                objectKey: '$.result.annotations',
            },
        },
        annotations_outages_locations: {
            annotations_get_top_outages_annotations: {
                objectKey: '$.result.annotations',
            },
        },
        attacks_layer7_top_ases_origin: {
            attacks_get_layer_7_top_origin_a_ses: {
                objectKey: '$.result.top_0',
            },
        },
        attacks_layer7_top_attacks: {
            attacks_get_layer_7_top_attack_pairs___origin_and_target_locations_: {
                objectKey: '$.result.top_0',
            },
        },
        attacks_layer7_top_locations_origin: {
            attacks_get_layer_7_top_origin_locations: {
                objectKey: '$.result.top_0',
            },
        },
        attacks_layer7_top_locations_target: {
            attacks_get_layer_7_top_target_locations: {
                objectKey: '$',
            },
        },
        datasets: {
            get_datasets: {
                objectKey: '$.result.datasets',
            },
        },
        entities_asns: {
            entities_get_autonomous_system___as__by_id: {
                objectKey: '$.result.asn',
            },
            entities_get_autonomous_systems: {
                objectKey: '$.ases',
            },			
        },
        entities_asns_ip: {
            entities_get_autonomous_system_information_by_ip_address: {
                objectKey: '$.result.asn',
            },
        },
        entities_locations: {
            entities_get_locations: {
                objectKey: '$.result.locations',
            },
            entities_get_location: {
                objectKey: '$.result.location',
            },			
        },
        netflows_top_ases: {
            net_flows_get_top_autonomous_systems: {
                objectKey: '$.result.top_0',
            },
        },
        netflows_top_locations: {
            net_flows_get_top_locations: {
                objectKey: '$.result.top_0',
            },
        },
        reports_datasets: {
            datasets_get_datasets: {
                objectKey: '$.result.datasets',
            },
        },
        specialevents: {
            list_special_events: {
                objectKey: '$.result.specialEvents',
            },
            get_a_single_special_events: {
                objectKey: '$.result.specialEvent',
            },			
        },
    },
    railgun: {
        zones_railguns: {
            connections_for_a_zone_list_available_railguns: {
                objectKey: '$',
            },
        },
    },
    rulesets: {
        accounts: {
            account_rulesets_get_an_account_ruleset: {
                sqlVerb: 'exec',
            },
			account_rulesets_list_account_rulesets: {
				objectKey: '$',
			},
        },        
        accounts_phases_entrypoint: {
            account_rulesets_get_an_account_entry_point_ruleset: {
                objectKey: '$',
            },
        },
        accounts_phases_versions: {
            account_rulesets_get_an_account_entry_point_ruleset_version: {
                sqlVerb: 'exec',
            },
			account_rulesets_list_an_account_entry_point_rulesets_versions: {
				sqlVerb: 'exec',
			},
        },
        accounts_versions: {
            account_rulesets_get_an_account_ruleset_version: {
                sqlVerb: 'exec',
            },
			account_rulesets_list_an_account_rulesets_versions: {
                sqlVerb: 'exec',
			},
        },
        accounts_versions_by_tag: {
            account_rulesets_list_an_account_ruleset_versions_rules_by_tag: {
                objectKey: '$',
            },
        },
        zones: {
            zone_rulesets_get_a_zone_ruleset: {
                sqlVerb: 'exec',
            },
            zone_rulesets_list_zone_rulesets: {
                objectKey: '$',
            },			
        },
        zones_phases_entrypoint: {
            zone_rulesets_get_a_zone_entry_point_ruleset: {
                objectKey: '$',
            },
        },
        zones_phases_http_custom_errors_entrypoint: {
            custom_error_responses_get_custom_error_responses: {
                sqlVerb: 'exec',
            },
        },
        zones_phases_versions: {
            zone_rulesets_get_a_zone_entry_point_ruleset_version: {
                sqlVerb: 'exec',
            },
            zone_rulesets_list_a_zone_entry_point_rulesets_versions: {
                objectKey: '$',
            },			
        },
        zones_versions: {
            zone_rulesets_get_a_zone_ruleset_version: {
                sqlVerb: 'exec',
            },
            zone_rulesets_list_a_zone_rulesets_versions: {
                objectKey: '$',
            },			
        },
    },
    spectrum: {
        zones_analytics_aggregate_current: {
            aggregate_analytics_get_current_aggregated_analytics: {
                objectKey: '$',
            },
        },
        zones_analytics_events_bytime: {
            analytics___by_time__get_analytics_by_time: {
                objectKey: '$',
            },
        },
        zones_analytics_events_summary: {
            analytics___summary__get_analytics_summary: {
                objectKey: '$',
            },
        },
        zones_apps: {
            applications_list_spectrum_applications: {
                objectKey: '$',
            },
            applications_get_spectrum_application_configuration: {
                objectKey: '$',
            },			
        },
    },
    ssl_tls: {
        zones_acm_total_tls: {
            total_tls_total_tls_settings_details: {
                objectKey: '$',
            },
        },
    },
    teamnet: {
        accounts_routes_ip: {
            tunnel_route_get_tunnel_route_by_ip: {
                objectKey: '$',
            },
        },
    },
    users: {
        user: {
            user_details: {
                objectKey: '$',
            },
        },
        user_billing_profile: {
            billing_profile_details: {
                objectKey: '$',
            },
        },
        user_invites: {
            invites_list_invitations: {
                objectKey: '$',
            },
            users_invites_invitation_details: {
                objectKey: '$',
            },			
        },        
        user_tokens: {
            user_api_tokens_list_tokens: {
                objectKey: '$',
            },
        },
        user_tokens_permission_groups: {
            permission_groups_list_permission_groups: {
                objectKey: '$',
            },
        },
    },
    waf: {
        zones_firewall_packages: {
            packages_get_a_waf_package: {
                objectKey: '$',
            },
            packages_list_waf_packages: {
                objectKey: '$',
            },			
        },
        zones_firewall_packages_rules: {
            rules_get_a_waf_rule: {
                objectKey: '$',
            },
            rules_list_waf_rules: {
                objectKey: '$',
            },			
        },    
    },
    web3: {
        zones_hostnames_ipfs_universal_path_content_list_entries: {
            hostname_list_ipfs_universal_path_gateway_content_list_entries: {
                objectKey: '$.result.entries',
            },
        },
    },
    workers: {
        accounts_domains: {
            worker_domain_get_a_domain: {
                objectKey: '$',
            },
            worker_domain_list_domains: {
                objectKey: '$',
            },			
        },
        accounts_scripts: {
            worker_script_list_workers: {
                objectKey: '$',
            },
        },
        accounts_scripts_schedules: {
            worker_cron_trigger_get_cron_triggers: {
                objectKey: '$',
            },
        },
        accounts_storage_kv_namespaces_keys: {
            kv_namespace_list_a_namespaces_keys: {
                objectKey: '$',
            },
        },
        accounts_subdomain: {
            worker_subdomain_get_subdomain: {
                objectKey: '$',
            },
        },
        zones_filters: {
            worker_filters___deprecated__list_filters: {
                objectKey: '$',
            },
        },
        zones_routes: {
            worker_routes_get_route: {
                objectKey: '$',
            },
            worker_routes_list_routes: {
                objectKey: '$',
            },			
        },
        zones_script_bindings: {
            worker_binding___deprecated__list_bindings: {
                objectKey: '$',
            },
        },
    },
    zero_trust: {
        accounts_gateway_app_types: {
            gateway_application_and_application_type_mappings_list_application_and_application_type_mappings: {
                objectKey: '$',
            },
        },
        accounts_gateway_configuration: {
            accounts_get_zero_trust_account_configuration: {
                objectKey: '$',
            },
        },
    },
    zones: {
        cache_variants: {
            zone_cache_settings_get_variants_setting: {
                objectKey: '$.result.value',
            },
        },
        firewall_lockdown_rules: {
            zone_lockdown_get_a_zone_lockdown_rule: {
                sqlVerb: 'exec',
            },
            zone_lockdown_list_zone_lockdown_rules: {
                objectKey: '$',
            },			
        },
        firewall_rules: {
            get_a_firewall_rule: {
                sqlVerb: 'exec',
            },
            list_firewall_rules: {
                objectKey: '$',
            },			
        },
        managed_headers: {
            managed_transforms_list_managed_transforms: {
                objectKey: '$',
            },
        },
        rulesets_phases_entrypoint: {
            transform_rules_list_transform_rules: {
                sqlVerb: 'exec',
            },
        },
        settings: {
            zone_settings_get_all_zone_settings: {
                objectKey: '$',
            },
            zone_settings_get_0_rtt_session_resumption_setting: {
                sqlVerb: 'exec',
            },
            zone_settings_get_i_pv6_setting: {
                sqlVerb: 'exec',
            },
            zone_settings_get_pseudo_i_pv4_setting: {
                sqlVerb: 'exec',
            },
        },
        subscription: {
            zone_subscription_zone_subscription_details: {
                objectKey: '$',
            },
        },
        url_normalization: {
            get_url_normalization_settings: {
                objectKey: '$',
            },
        },
    },      
};