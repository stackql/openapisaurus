export const servicesMap = {}

export const resourcesMap = {
    schema_registry: {
        getClusterConfig: "cluster_config",
        deleteSubjectConfig: "subject_level_config",
        getSubjectLevelConfig: "subject_level_config",
        updateSubjectLevelConfig: "subject_level_config",
        deleteTopLevelConfig: "top_level_config",
        getTopLevelConfig: "top_level_config",
        updateTopLevelConfig: "top_level_config",
        getSchemaTypes: "types",
        getVersions: "versions",
        listVersions: "versions",
        getSubjects: "schema_subjects",
        getExporterConfigByName: "exporter_configs",
        updateExporterConfigByName: "exporter_configs",
        getExporterStatusByName: "exporter_status",
    },
    catalog: {
        createBusinessMetadata: "business_metadata",
        updateBusinessMetadata: "business_metadata",
        getBusinessMetadata: "business_metadata",
        deleteBusinessMetadata: "business_metadata",
        createBusinessMetadataDefs: "business_metadata_defs",
        getAllBusinessMetadataDefs: "business_metadata_defs",
        updateBusinessMetadataDefs: "business_metadata_defs",
        deleteBusinessMetadataDef: "business_metadata_defs",
        getBusinessMetadataDefByName: "business_metadata_defs",
        partialEntityUpdate: "entities",
        getByUniqueAttributes: "entities",
        createTagDefs: "tag_defs",
        getAllTagDefs: "tag_defs",
        updateTagDefs: "tag_defs",
        deleteTagDef: "tag_defs",
        getTagDefByName: "tag_defs",
        createTags: "tags",
        updateTags: "tags",
        getTags: "tags",
        deleteTag: "tags",        
    },
    connect: {
        createOrUpdateConnectv1ConnectorConfig: "connector_config",
        getConnectv1ConnectorConfig: "connector_config",
        getConnectv1ConnectorOffsets: "connector_offsets",
        getConnectv1ConnectorOffsetsRequestStatus: "connector_offsets_requests",
        alterConnectv1ConnectorOffsetsRequest: "connector_offsets_requests",
        readConnectv1ConnectorStatus: "connector_status",
        listConnectv1ConnectorTasks: "connector_tasks",
        pauseConnectv1Connector: "connectors",
        resumeConnectv1Connector: "connectors",
        listConnectv1ConnectorsWithExpansions: "connectors_with_expansions",
    },
    encryption_keys: {
        getDekVersions: "dek_versions",
        deleteDekVersion: "dek_versions",
        getDekByVersion: "dek_versions",
        undeleteDekVersion: "dek_versions",
    },
    partner: {
        signup: "signups",
        activateSignup: "signups",
        signupPartnerV2Link: "signups",
    },
    kafka: {
        listKafkaAllTopicConfigs: "topic_configs",
        listKafkaTopicConfigs: "topic_configs",
        deleteKafkaTopicConfig: "topic_configs",
        getKafkaTopicConfig: "topic_configs",
        updateKafkaTopicConfig: "topic_configs",
        updateKafkaTopicConfigBatch: "topic_configs",
        listKafkaPartitions: "topic_partitions",
        getKafkaPartition: "topic_partitions",
        createKafkaTopic: "topics",
        listKafkaTopics: "topics",
        deleteKafkaTopic: "topics",
        getKafkaTopic: "topics",
        updatePartitionCountKafkaTopic: "topics",
        createKafkaAcls: "acls",
        deleteKafkaAcls: "acls",
        getKafkaAcls: "acls",
        batchCreateKafkaAcls: "acls",
        listKafkaLinkConfigs: "cluster_link_configs",
        deleteKafkaLinkConfig: "cluster_link_configs",
        getKafkaLinkConfigs: "cluster_link_configs",
        updateKafkaLinkConfig: "cluster_link_configs",
        updateKafkaLinkConfigBatch: "cluster_link_configs",
        createKafkaLink: "cluster_links",
        listKafkaLinks: "cluster_links",
        deleteKafkaLink: "cluster_links",
        getKafkaLink: "cluster_links",
        getKafkaCluster: "clusters",
        listKafkaClusterConfigs: "cluster_configs",
        deleteKafkaClusterConfig: "cluster_configs",
        getKafkaClusterConfig: "cluster_configs",
        updateKafkaClusterConfig: "cluster_configs",
        updateKafkaClusterConfigs: "cluster_configs",
        listKafkaConsumerGroups: "consumer_groups",
        getKafkaConsumerGroup: "consumer_groups",
        listKafkaConsumers: "consumers",
        getKafkaConsumer: "consumers",
        getKafkaConsumerGroupLagSummary: "consumers_lag_summary",
        listKafkaConsumerLags: "consumers_lags",
        getKafkaConsumerLag: "consumers_lags",
        listKafkaDefaultTopicConfigs: "default_topic_configs",
        listKafkaMirrorTopicsUnderLink: "mirror_topics",
        listKafkaMirrorTopics: "mirror_topics",
        createKafkaMirrorTopic: "mirror_topics",
        readKafkaMirrorTopic: "mirror_topics",
        updateKafkaMirrorTopicsFailover: "mirror_topics",
        updateKafkaMirrorTopicsPause: "mirror_topics",
        updateKafkaMirrorTopicsPromote: "mirror_topics",
        updateKafkaMirrorTopicsResume: "mirror_topics",
        updateKafkaMirrorTopicsReverseAndPauseMirror: "mirror_topics",
        updateKafkaMirrorTopicsReverseAndStartMirror: "mirror_topics",
        updateKafkaMirrorTopicsTruncateAndRestoreMirror: "mirror_topics",
    },
    schema_registry_clusters: {
        listSrcmV2Clusters: "v2_clusters",
        createSrcmV2Cluster: "v2_clusters",
        getSrcmV2Cluster: "v2_clusters",
        updateSrcmV2Cluster: "v2_clusters",
        deleteSrcmV2Cluster: "v2_clusters",
        listSrcmV3Clusters: "v3_clusters",
        getSrcmV3Cluster: "v3_clusters",
    },
}

export const stackqlMethodNameMap = {}

export const objectKeysAndSqlVerbsMap = {
    billing: {
        costs: {
            list_billing_v1costs: {
                objectKey: '$.data',
            },
        },
    },
    connect: {
        custom_connector_plugins: {
            list_connect_v1custom_connector_plugins: {
                objectKey: '$.data',
            },
        },
    },
    encryption_keys: {
        keys: {
            list_byok_v1keys: {
                objectKey: '$.data',
            },
        },
    },
    flink_artifacts: {
        flink_artifacts: {
            list_artifact_v1flink_artifacts: {
                objectKey: '$.data',
            },
        },
    },
    ksqldb_clusters: {
        clusters: {
            list_ksqldbcm_v2clusters: {
                objectKey: '$.data',
            },
        },
    },
    managed_kafka_clusters: {
        clusters: {
            list_cmk_v2clusters: {
                objectKey: '$.data',
            },
        },
    },
    pipelines: {
        pipelines: {
            list_sd_v1pipelines: {
                objectKey: '$.data',
            },
        },
    },
    provider_integrations: {
        integrations: {
            list_pim_v1integrations: {
                objectKey: '$.data',
            },
        },
    },
    quotas: {
        client_quotas: {
            list_kafka_quotas_v1client_quotas: {
                objectKey: '$.data',
            },
        },
        applied_quotas: {
            list_service_quota_v1applied_quotas: {
                objectKey: '$.data',
            },
        },
        scopes: {
            list_service_quota_v1scopes: {
                objectKey: '$.data',
            },
        },        
    },    
    flink_compute_pools: {
        compute_pools: {
            list_fcpm_v2compute_pools: {
                objectKey: '$.data',
            },
        },
        regions: {
            list_fcpm_v2regions: {
                objectKey: '$.data',
            },
        },        
    },
    notifications: {
        subscriptions: {
            list_notifications_v1subscriptions: {
                objectKey: '$.data',
            },
        },
        integrations: {
            list_notifications_v1integrations: {
                objectKey: '$.data',
            },
        },
        notification_types: {
            list_notifications_v1notification_types: {
                objectKey: '$.data',
            },
        },                
    },
    schema_registry_clusters: {
        regions: {
            list_srcm_v2regions: {
                objectKey: '$.data',
            },
        },
        v2_clusters: {
            list_srcm_v2clusters: {
                objectKey: '$.data',
            },
        },
        v3_clusters: {
            list_srcm_v3clusters: {
                objectKey: '$.data',
            },
        },                
    },
    sql: {
        connections: {
            list_sqlv1connections: {
                objectKey: '$.data',
            },
        },
        statements: {
            list_sqlv1statements: {
                objectKey: '$.data',
            },
        },
        statement_exceptions: {
            get_sqlv1statement_exceptions: {
                objectKey: '$.data',
            },
        },                
    },
    stream_sharing: {
        provider_shared_resources: {
            list_cdx_v1provider_shared_resources: {
                objectKey: '$.data',
            },
        },
        provider_shares: {
            list_cdx_v1provider_shares: {
                objectKey: '$.data',
            },
        },
        consumer_shared_resources: {
            list_cdx_v1consumer_shared_resources: {
                objectKey: '$.data',
            },
        },
        consumer_shares: {
            list_cdx_v1consumer_shares: {
                objectKey: '$.data',
            },
        },                        
    },
    org: {
        environments: {
            list_org_v2environments: {
                objectKey: '$.data',
            },
        },
        organizations: {
            list_org_v2organizations: {
                objectKey: '$.data',
            },
        },        
    },
    kafka: {
        acls: {
            get_kafka_acls: {
                objectKey: '$.data',
            },
        },
        mirror_topics: {
            update_kafka_mirror_topics_promote: {
                sqlVerb: 'exec',
            },
            update_kafka_mirror_topics_failover: {
                sqlVerb: 'exec',
            },
            update_kafka_mirror_topics_pause: {
                sqlVerb: 'exec',
            },
            update_kafka_mirror_topics_resume: {
                sqlVerb: 'exec',
            },
            update_kafka_mirror_topics_reverse_and_start_mirror: {
                sqlVerb: 'exec',
            },                                    
            update_kafka_mirror_topics_reverse_and_pause_mirror: {
                sqlVerb: 'exec',
            },
            update_kafka_mirror_topics_truncate_and_restore_mirror: {
                sqlVerb: 'exec',
            },
        },
    },
    iam: {
        api_keys: {
            list_iam_v2api_keys: {
                objectKey: '$.data',
            },
        },
        users: {
            list_iam_v2users: {
                objectKey: '$.data',
            },
        },
        service_accounts: {
            list_iam_v2service_accounts: {
                objectKey: '$.data',
            },
        },
        invitations: {
            list_iam_v2invitations: {
                objectKey: '$.data',
            },
        },
        ip_groups: {
            list_iam_v2ip_groups: {
                objectKey: '$.data',
            },
        },
        ip_filters: {
            list_iam_v2ip_filters: {
                objectKey: '$.data',
            },
        },
        role_bindings: {
            list_iam_v2role_bindings: {
                objectKey: '$.data',
            },
        },
        identity_providers: {
            list_iam_v2identity_providers: {
                objectKey: '$.data',
            },
        },
        identity_pools: {
            list_iam_v2identity_pools: {
                objectKey: '$.data',
            },
        },
        group_mappings: {
            list_iam_v2sso_group_mappings: {
                objectKey: '$.data',
            },
        },
        certificate_authorities: {
            list_iam_v2certificate_authorities: {
                objectKey: '$.data',
            },
        },
        certificate_identity_pools: {
            list_iam_v2certificate_identity_pools: {
                objectKey: '$.data',
            },
        },                                                                                        
    },
    networking: {
        networks: {
            list_networking_v1networks: {
                objectKey: '$.data',
            }
        },
        peerings: {
            list_networking_v1peerings: {
                objectKey: '$.data',
            }
        },
        transit_gateway_attachments: {
            list_networking_v1transit_gateway_attachments: {
                objectKey: '$.data',
            }
        },
        private_link_accesses: {
            list_networking_v1private_link_accesses: {
                objectKey: '$.data',
            }
        },
        network_link_services: {
            list_networking_v1network_link_services: {
                objectKey: '$.data',
            }
        },
        network_link_endpoints: {
            list_networking_v1network_link_endpoints: {
                objectKey: '$.data',
            }
        },
        network_link_service_associations: {
            list_networking_v1network_link_service_associations: {
                objectKey: '$.data',
            }
        },
        gateways: {
            list_networking_v1gateways: {
                objectKey: '$.data',
            }
        },
        ip_addresses: {
            list_networking_v1ip_addresses: {
                objectKey: '$.data',
            }
        },
        private_link_attachments: {
            list_networking_v1private_link_attachments: {
                objectKey: '$.data',
            }
        },
        private_link_attachment_connections: {
            list_networking_v1private_link_attachment_connections: {
                objectKey: '$.data',
            }
        },
        dns_forwarders: {
            list_networking_v1dns_forwarders: {
                objectKey: '$.data',
            }
        },
        access_points: {
            list_networking_v1access_points: {
                objectKey: '$.data',
            }
        },
        dns_records: {
            list_networking_v1dns_records: {
                objectKey: '$.data',
            }
        },                                                                                                
    },
    schema_registry: {
        schemas: {
            get_schema_only: {
                sqlVerb: 'exec',
            }
        },
        subjects: {
            get_schema_only_1: {
                sqlVerb: 'exec',
            },
            get_referenced_by: {
                sqlVerb: 'exec',
            },
        },
        exporters: {
            list_exporters: {
                sqlVerb: 'exec',
            },
        }
    },
}