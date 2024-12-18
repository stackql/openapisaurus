export const servicesMap = {
    '1_click_applications': 'one_click_applications',
    block_storage_actions: 'block_storage',
    domain_records: 'domains',
    droplet_actions: 'droplets',
    floating_ip_actions: 'floating_ips',
    image_actions: 'images',
    project_resources: 'projects',
    reserved_ip_actions: 'reserved_ips',
    cdn_endpoints: 'cdn',
}

export const nonDataFields = [
    'meta', 
    'links'
]

export const resourcesMap = {
    apps: {
        apps_validate_rollback: 'rollbacks',
        apps_commit_rollback: 'rollbacks',
        apps_revert_rollback: 'rollbacks',
        apps_get_metrics_bandwidth_daily: 'daily_metrics_bandwidths',
        apps_list_metrics_bandwidth_daily: 'daily_metrics_bandwidths',
        apps_validate_appSpec: 'apps',
    },
    billing: {
        balance_get: 'balances',
        billingHistory_list: 'billing_history',
        invoices_list: 'invoices',
        invoices_get_byUUID: 'invoices',
        invoices_get_csvByUUID: 'invoices',
        invoices_get_pdfByUUID: 'invoices',
        invoices_get_summaryByUUID: 'invoices_summaries',
    },
    container_registry: {
        registry_validate_name: 'registries',
        registry_list_repositoriesV2: 'registry_repositories_v2',
    },
    databases: {
        databases_destroy_cluster: 'database_clusters',
        databases_list_clusters: 'database_clusters',
        databases_get_cluster: 'database_clusters',
        databases_create_cluster: 'database_clusters',
        databases_update_region: 'database_clusters',
        databases_update_clusterSize: 'database_clusters',
        databases_update_maintenanceWindow: 'database_clusters',
        databases_install_update: 'database_clusters',
        databases_update_major_version: 'database_clusters',

    },
    droplets: {
        droplets_destroy_withAssociatedResourcesSelective: 'droplets',
        droplets_destroy_withAssociatedResourcesDangerous: 'droplets',
        droplets_destroy_retryWithAssociatedResources: 'droplets',
        droplets_list_associatedResources: 'droplets_associated_resources',
        droplets_get_DestroyAssociatedResourcesStatus: 'droplets_associated_resources_delete_status',
    },
    kubernetes: {
        kubernetes_get_kubeconfig: 'clusters',
        kubernetes_upgrade_cluster: 'clusters',
        kubernetes_destroy_associatedResourcesSelective: 'clusters',
        kubernetes_destroy_associatedResourcesDangerous: 'clusters',
        kubernetes_list_associatedResources: 'clusters_associated_resources',
        kubernetes_get_availableUpgrades: 'clusters_available_upgrades',
    }, 
    monitoring: {
        monitoring_get_dropletFilesystemFreeMetrics: 'metrics_droplet_filesystem_free',
        monitoring_get_dropletMemoryAvailableMetrics: 'metrics_droplet_memory_available',
        monitoring_get_dropletMemoryCachedMetrics: 'metrics_droplet_memory_cached',
        monitoring_get_dropletMemoryFreeMetrics: 'metrics_droplet_memory_free',
        monitoring_get_lb_frontend_connections_current: 'metrics_load_balancer_frontend_connections_current',
        monitoring_get_lb_frontend_cpu_utilization: 'metrics_load_balancer_frontend_cpu_utilization',
        monitoring_get_lb_frontend_network_throughput_http: 'metrics_load_balancer_frontend_network_throughput_http',
        monitoring_get_lb_frontend_network_throughput_tcp: 'metrics_load_balancer_frontend_network_throughput_tcp',
        monitoring_get_lb_frontend_network_throughput_udp: 'metrics_load_balancer_frontend_network_throughput_udp',
        monitoring_get_lb_frontend_nlb_tcp_network_throughput: 'metrics_load_balancer_frontend_nlb_tcp_network_throughput',
        monitoring_get_lb_frontend_nlb_udp_network_throughput: 'metrics_load_balancer_frontend_nlb_udp_network_throughput',
        monitoring_get_lb_frontend_tls_connections_current: 'metrics_load_balancer_frontend_tls_connections_current',
    }, 
    one_click_applications: {
        oneClicks_install_kubernetes: 'one_click_applications',
    },
}

export const stackqlMethodNameMap = {}

export const objectKeysAndSqlVerbsMap = {
    billing: {
        invoices: {
            invoices_get_csv_by_uuid: {
                sqlVerb: 'exec',
            },
            invoices_get_pdf_by_uuid: {
                sqlVerb: 'exec',
            },
        },
    },
    container_registry: {
        registry_garbage_collections: {
            registry_get_garbage_collection: {
                sqlVerb: 'exec',
            },
        },
    },
    droplets: {
        droplets: {
            droplets_destroy_with_associated_resources_selective: {
                sqlVerb: 'exec',
            },
            droplets_destroy_with_associated_resources_dangerous: {
                sqlVerb: 'exec',
            },
            droplets_destroy_retry_with_associated_resources: { 
                sqlVerb: 'exec',
            }
        },
    },
    kubernetes: {
        clusters: {
            kubernetes_get_kubeconfig: {
                sqlVerb: 'exec',
            },
            kubernetes_destroy_associated_resources_selective: {
                sqlVerb: 'exec',
            },
            kubernetes_destroy_associated_resources_dangerous: {
                sqlVerb: 'exec',
            },
        },
    },
}

// export const resourcesMap = {
//     one_click_applications: {
//         nameMap: {
//             '1_click_applications': 'one_click_applications',
//         },
//     },
//     apps: {
//         nameMap: {
//             rollback: 'rollbacks',
//             rollback_validate: 'rollbacks',
//             rollback_commit: 'rollbacks',
//             rollback_revert: 'rollbacks',
//             alerts_destinations: 'alerts',
//             deployments_cancel: 'deployments',
//             deployments_components_logs: 'logs',
//             deployments_logs: 'logs',
//             propose: 'apps',
//             metrics_bandwidth_daily: 'daily_metrics_bandwidth',
//             tiers_instance_sizes: 'instance_sizes',
//             components_logs: 'logs',
//         },
//     },
//     billing: {
//         nameMap: {
//             customers_my_balance: 'balances',
//             customers_my_billing_history: 'history',
//             customers_my_invoices: 'invoices',
//             customers_my_invoices_csv: 'invoices',
//             customers_my_invoices_pdf: 'invoices',
//             customers_my_invoices_summary: 'invoices_summary',            
//         },
//     },
//     block_storage: {
//         nameMap: {
//             volumes_actions: 'volume_actions',
//             volumes_snapshots: 'volume_snapshots',
//         },
//     },
//     container_registry: {
//         nameMap: {
//             registry: 'container_registry',
//             registry_subscription: 'subscription',
//             registry_docker_credentials: 'docker_credentials',
//             registry_validate_name: 'container_registry',
//             registry_repositories: 'repositories',
//             registry_repositoriesV2: 'repositories_v2',
//             registry_tags: 'tags',
//             registry_digests: 'digests',
//             registry_garbage_collection: 'garbage_collection',
//             registry_garbage_collections: 'garbage_collection',
//             registry_options: 'options',            
//         },
//     },
//     databases: {
//         nameMap: {
//             databases: 'clusters',
//             online_migration: 'migrations',
//             migrate: 'migrations',
//             resize: 'clusters',
//             firewall: 'firewall_rules',
//             maintenance: 'clusters',
//             replicas_promote: 'replicas',
//             users_reset_auth: 'users',
//             dbs: 'databases',
//             pools: 'connection_pools',
//             eviction_policy: 'clusters',            
//         },
//     },
//     droplets: {
//         nameMap: {
//             destroy_with_associated_resources: 'droplets',
//             destroy_with_associated_resources_selective: 'droplets',
//             destroy_with_associated_resources_dangerous: 'droplets',
//             destroy_with_associated_resources_status: 'droplets',
//             destroy_with_associated_resources_retry: 'droplets',
//             reports_droplet_neighbors_ids: 'droplets',
//         },
//     },
//     functions: {
//         nameMap: {
//             namespaces_triggers: 'namespace_triggers',
//         },        
//     },
//     kubernetes: {
//         nameMap: {
//             clusters_destroy_with_associated_resources: 'clusters',
//             clusters_destroy_with_associated_resources_selective: 'clusters',
//             clusters_destroy_with_associated_resources_dangerous: 'clusters',
//             clusters_kubeconfig: 'clusters',
//             clusters_credentials: 'credentials',
//             clusters_upgrades: 'upgrades',
//             clusters_upgrade: 'clusters',
//             clusters_node_pools: 'node_pools',
//             clusters_node_pools_nodes: 'nodes',
//             clusters_node_pools_recycle: 'node_pools',
//             clusters_user: 'user',
//             clusters_clusterlint: 'clusterlint',
//             registry: 'container_registry',
//         },        
//     },
//     monitoring: {
//         nameMap: {
//             metrics_droplet_bandwidth: 'droplet_bandwidth',
//             metrics_droplet_cpu: 'droplet_cpu',
//             metrics_droplet_filesystem_free: 'droplet_filesystem_free',
//             metrics_droplet_filesystem_size: 'droplet_filesystem_size',
//             metrics_droplet_load_1: 'droplet_load_1_min',
//             metrics_droplet_load_5: 'droplet_load_5_min',
//             metrics_droplet_load_15: 'droplet_load_15_min',
//             metrics_droplet_memory_cached: 'droplet_memory_cached',
//             metrics_droplet_memory_free: 'droplet_memory_free',
//             metrics_droplet_memory_total: 'droplet_memory_total',
//             metrics_droplet_memory_available: 'droplet_memory_available',
//         },
//     },
//     uptime: {
//         nameMap: {
//             checks_state: 'check_state',
//             checks_alerts: 'check_alerts',            
//         },
//     },
// };

// export const objectKeysAndSqlVerbs = {
//     one_click_applications: {
//         one_click_applications: {
//             oneClicks_list: {
//                 objectKey: '$.1_clicks',
//             },
//         },
//         kubernetes: {
//             oneClicks_install_kubernetes: {
//                 sqlVerb: 'exec',
//             },
//         },
//     },
//     account: {
//         account: {
//             get: {
//                 objectKey: '$.account',
//             },
//         },
//     },
//     actions: {
//         actions: {
//             list: {
//                 objectKey: '$.actions',
//             },
//             get: {
//                 objectKey: '$.action',
//             },
//         },
//     },
//     apps: {
//         apps: {
//             list: {
//                 objectKey: '$.apps',
//             },
//             get: {
//                 objectKey: '$.app',
//             },
//         },
//         deployments: {
//             list_deployments: {
//                 objectKey: '$.deployments',
//             },
//             get_deployment: {
//                 objectKey: '$.deployment',
//             },
//         },
//         tiers: {
//             list_tiers: {
//                 objectKey: '$.tiers',
//             },
//             get_tier: {
//                 objectKey: '$.tier',
//             },
//         },
//         instance_sizes: {
//             list_instanceSizes: {
//                 objectKey: '$.instance_sizes',
//             },
//             get_instanceSize: {
//                 objectKey: '$.instance_size',
//             },
//         },
//         regions: {
//             list_regions: {
//                 objectKey: '$.regions',
//             },
//         },
//         alerts: {
//             list_alerts: {
//                 objectKey: '$.alerts',
//             },
//         },
//     },
//     billing: {
//         invoices: {
//             get_csvByUUID: {
//                 sqlVerb: 'exec',
//             },
//             get_pdfByUUID: {
//                 sqlVerb: 'exec',
//             },    
//         },
//     },
//     block_storage: {
//         volumes: {
//             list: {
//                 objectKey: '$.volumes',
//             },
//             get: {
//                 objectKey: '$.volume',
//             },
//         },
//         volume_actions: {
//             volumeActions_list: {
//                 objectKey: '$.actions',
//             },
//             volumeActions_get: {
//                 objectKey: '$.action',
//             },
//         },
//         volume_snapshots: {
//             volumeSnapshots_list: {
//                 objectKey: '$.snapshots',
//             },
//             volumeSnapshots_get_byId: {
//                 objectKey: '$.snapshot',
//             },
//         },
//     },
//     cdn: {
//         endpoints: {
//             list_endpoints: {
//                 objectKey: '$.endpoints',
//             },
//             get_endpoint: {
//                 objectKey: '$.endpoint',
//             },
//         },
//     },
//     certificates: {
//         certificates: {
//             list: {
//                 objectKey: '$.certificates',
//             },
//             get: {
//                 objectKey: '$.certificate',
//             },  
//         },
//     },
//     container_registry: {
//         container_registry: {
//             registry_get: {
//                 objectKey: '$.registry',
//             },
//         },
//         subscription: {
//             registry_get_subscription: {
//                 objectKey: '$.subscription',
//             },
//         },
//         repositories: {
//             registry_list_repositories: {
//                 objectKey: '$.repositories',
//                 sqlVerb: 'select',
//             },
//         },
//         repositories_v2: {
//             registry_list_repositoriesV2: {
//                 objectKey: '$.repositories',
//                 sqlVerb: 'select',
//             },
//         },
//         tags: {
//             registry_list_repositoryTags: {
//                 objectKey: '$.tags',
//                 sqlVerb: 'select',
//             },
//         },
//         digests: {
//             registry_list_repositoryManifests: {
//                 objectKey: '$.manifests',
//                 sqlVerb: 'select',
//             },
//         },
//         garbage_collection: {
//             registry_list_garbageCollections: {
//                 objectKey: '$.garbage_collections',
//                 sqlVerb: 'select',
//             },
//             registry_get_garbageCollection: {
//                 objectKey: '$.garbage_collection',
//                 sqlVerb: 'exec',
//             },
//         },
//         options: {
//             registry_get_options: {
//                 objectKey: '$.options',
//             },
//         },
//     },
//     databases: {
//         options: {
//             list_options: {
//                 objectKey: '$.options',
//             },
//         },
//         clusters: {
//             list_clusters: {
//                 objectKey: '$.databases',
//             },
//             get_cluster: {
//                 objectKey: '$.database',
//             },
//             get_evictionPolicy: {
//                 sqlVerb: 'exec',
//             },
//         },
//         config: {
//             get_config: {
//                 objectKey: '$.config',
//             },
//         },
//         ca: {
//             get_ca: {
//                 objectKey: '$.ca',
//             },
//         },
//         firewall_rules: {
//             list_firewall_rules: {
//                 objectKey: '$.rules',
//             },
//         },
//         backups: {
//             list_backups: {
//                 objectKey: '$.backups',
//             },
//         },
//         replicas: {
//             list_replicas: {
//                 objectKey: '$.replicas',
//             },
//             get_replica: {
//                 objectKey: '$.replica',
//             },
//         },
//         users: {
//             list_users: {
//                 objectKey: '$.users',
//             },
//             get_user: {
//                 objectKey: '$.user',
//             },
//         },
//         databases: {
//             list: {
//                 objectKey: '$.dbs',
//             },
//             get: {
//                 objectKey: '$.db',
//             },
//         },
//         connection_pools: {
//             list_connectionPools: {
//                 objectKey: '$.pools',
//             },
//             get_connectionPool: {
//                 objectKey: '$.pool',
//             },
//         },
//     },
//     domains: {
//         domains: {
//             list: {
//                 objectKey: '$.domains',
//             },
//             get: {
//                 objectKey: '$.domain',
//             },
//         },
//         records: {
//             list_records: {
//                 objectKey: '$.domain_records',
//             },
//             get_record: {
//                 objectKey: '$.domain_record',
//             },
//         },
//     },
//     droplets: {
//         droplets: {
//             list: {
//                 objectKey: '$.droplets',
//             },
//             get: {
//                 objectKey: '$.droplet',
//             },
//             list_associatedResources: {
//                 sqlVerb: 'exec',
//             },
//             get_DestroyAssociatedResourcesStatus: {
//                 sqlVerb: 'exec',
//             },
//             list_neighborsIds: {
//                 sqlVerb: 'exec',
//             },
//         },
//         backups: {
//             list_backups: {
//                 objectKey: '$.backups',
//             },
//         },
//         snapshots: {
//             list_snapshots: {
//                 objectKey: '$.snapshots',
//             },
//         },
//         actions: {
//             dropletActions_list: {
//                 objectKey: '$.actions',
//             },
//             dropletActions_get: {
//                 objectKey: '$.action',
//             },
//         },
//         kernels: {
//             list_kernels: {
//                 objectKey: '$.kernels',
//             },
//         },
//         firewalls: {
//             list_firewalls: {
//                 objectKey: '$.firewalls',
//             },
//         },
//         neighbors: {
//             list_neighbors: {
//                 objectKey: '$.droplets',
//             },
//         },
//     },
//     firewalls: {
//         firewalls: {
//             list: {
//                 objectKey: '$.firewalls',
//             },
//             get: {
//                 objectKey: '$.firewall',
//             },
//         },
//     },
//     floating_ips: {
//         floating_ips: {
//             floatingIPs_list: {
//                 objectKey: '$.floating_ips',
//             },
//             floatingIPs_get: {
//                 objectKey: '$.floating_ip',
//             },
//         },
//         actions: {
//             floatingIPsAction_list: {
//                 objectKey: '$.actions',
//             },
//             floatingIPsAction_get: {
//                 objectKey: '$.action',
//             },
//         },
//     },
//     functions: {
//         namespaces: {
//             list_namespaces: {
//                 objectKey: '$.namespaces',
//             },
//             get_namespace: {
//                 objectKey: '$.namespace',
//             },
//         },
//         namespace_triggers: {
//             list_triggers: {
//                 objectKey: '$.triggers',
//             },
//             get_trigger: {
//                 objectKey: '$.trigger',
//             },
//         },
//     },
//     images: {
//         images: {
//             list: {
//                 objectKey: '$.images',
//             },
//             get: {
//                 objectKey: '$.image',
//             },
//         },
//         actions: {
//             imageActions_list: {
//                 objectKey: '$.actions',
//             },
//             imageActions_get: {
//                 objectKey: '$.action',
//             },
//         },
//     },
//     kubernetes: {
//         clusters: {
//             list_associatedResources: {
//                 sqlVerb: 'exec',
//             },
//             get_kubeconfig: {
//                 sqlVerb: 'exec',
//             },
//             list_clusters: {
//                 objectKey: '$.kubernetes_clusters',
//             },
//             get_cluster: {
//                 objectKey: '$.kubernetes_cluster',
//             },
//         },
//         upgrades: {
//             get_availableUpgrades: {
//                 objectKey: '$.available_upgrade_versions',
//             },
//         },
//         node_pools: {
//             list_nodePools: {
//                 objectKey: '$.node_pools',
//             },
//             get_nodePool: {
//                 objectKey: '$.node_pool',
//             },
//         },
//         user: {
//             get_clusterUser: {
//                 objectKey: '$.kubernetes_cluster_user',
//             },
//         },
//     },
//     load_balancers: {
//         load_balancers: {
//             loadBalancers_list: {
//                 objectKey: '$.load_balancers',
//             },
//             loadBalancers_get: {
//                 objectKey: '$.load_balancer',
//             },
//         },
//     },
//     monitoring: {
//         alert_policies: {
//             list_alertPolicy: {
//                 objectKey: '$.policies',
//             },
//             get_alertPolicy: {
//                 objectKey: '$.policy',
//             },
//         },
//         droplet_bandwidth: {
//             get_dropletBandwidthMetrics: {
//                 objectKey: '$.data.result',
//             },
//         },
//         droplet_cpu: {
//             get_DropletCpuMetrics: {
//                 objectKey: '$.data.result',
//             },
//         },
//         droplet_filesystem_free: {
//             get_dropletFilesystemFreeMetrics: {
//                 objectKey: '$.data.result',
//             },
//         },
//         droplet_filesystem_size: {
//             get_dropletFilesystemSizeMetrics: {
//                 objectKey: '$.data.result',
//             },
//         },
//         droplet_load_1_min: {
//             get_dropletLoad1Metrics: {
//                 objectKey: '$.data.result',
//             },
//         },
//         droplet_load_5_min: {
//             get_dropletLoad5Metrics: {
//                 objectKey: '$.data.result',
//             },
//         },
//         droplet_load_15_min: {
//             get_dropletLoad15Metrics: {
//                 objectKey: '$.data.result',
//             },
//         },
//         droplet_memory_cached: {
//             get_dropletMemoryCachedMetrics: {
//                 objectKey: '$.data.result',
//             },
//         },
//         droplet_memory_free: {
//             get_dropletMemoryFreeMetrics: {
//                 objectKey: '$.data.result',
//             },
//         },
//         droplet_memory_total: {
//             get_dropletMemoryTotalMetrics: {
//                 objectKey: '$.data.result',
//             },
//         },
//         droplet_memory_available: {
//             get_dropletMemoryAvailableMetrics: {
//                 objectKey: '$.data.result',
//             },
//         },
//     },
//     projects: {
//         projects: {
//             list: {
//                 objectKey: '$.projects',
//             },
//             get: {
//                 objectKey: '$.project',
//             },
//         },
//         default: {
//             get_default: {
//                 objectKey: '$.project',
//             },
//         },
//         resources: {
//             list_resources: {
//                 objectKey: '$.resources',
//             },
//         },
//         default_resources: {
//             list_resources_default: {
//                 objectKey: '$.resources',
//             },
//         },
//     },
//     regions: {
//         regions: {
//             list: {
//                 objectKey: '$.regions',
//             },
//         },
//     },
//     reserved_ips: {
//         reserved_ips: {
//             reservedIPs_list: {
//                 objectKey: '$.reserved_ips',
//             },
//             reservedIPs_get: {
//                 objectKey: '$.reserved_ip',
//             },
//         },
//         actions: {
//             reservedIPsActions_list: {
//                 objectKey: '$.actions',
//             },
//             reservedIPsActions_get: {
//                 objectKey: '$.action',
//             },
//         },
//     },
//     sizes: {
//         sizes: {
//             list: {
//                 objectKey: '$.sizes',
//             },
//         },
//     },
//     snapshots: {
//         snapshots: {
//             list: {
//                 objectKey: '$.snapshots',
//             },
//         },
//     },
//     ssh_keys: {
//         account_keys: {
//             sshKeys_list: {
//                 objectKey: '$.ssh_keys',
//             },
//             sshKeys_get: {
//                 objectKey: '$.ssh_key',
//             },
//         },
//     },
//     tags: {
//         tags: {
//             list: {
//                 objectKey: '$.tags',
//             },
//             get: {
//                 objectKey: '$.tag',
//             },
//         },
//     },
//     uptime: {
//         checks: {
//             list: {
//                 objectKey: '$.checks',
//             },
//             check_get: {
//                 objectKey: '$.check',
//             },
//         },
//         check_state: {
//             get: {
//                 objectKey: '$.state',
//             },
//         },
//         check_alerts: {
//             list: {
//                 objectKey: '$.alerts',
//             },
//             alert_get: {
//                 objectKey: '$.alert',
//             },
//         },
//     },
//     vpcs: {
//         vpcs: {
//             list: {
//                 objectKey: '$.vpcs',
//             },
//             get: {
//                 objectKey: '$.vpc',
//             },
//         },
//         members: {
//             list_members: {
//                 objectKey: '$.members',
//             },
//         },
//     },    
// };

