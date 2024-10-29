# `confluent`

obtain a spec from [here](https://docs.confluent.io/cloud/current/api.html)

clean up the spec dirs and files

```
rm -rf dev/confluent/*
```

### `split`

```
./openapisaurus split \
ref/confluent/openapi.json \
--providerName=confluent \
--svcdiscriminator='"tags[0]" | (tag) => {
    // Define exact matches in a map
    const exactMatches = {
        "Cluster (v3)": "kafka",
        "Configs (v3)": "kafka",
        "ACL (v3)": "kafka",
        "Consumer Group (v3)": "kafka",
        "Partition (v3)": "kafka",
        "Topic (v3)": "kafka",
        "Records (v3)": "kafka",
        "Cluster Linking (v3)": "kafka",
        "Compatibility (v1)": "schema_registry",
        "Config (v1)": "schema_registry",
        "Contexts (v1)": "schema_registry",
        "Exporters (v1)": "schema_registry",
        "Modes (v1)": "schema_registry",
        "Schemas (v1)": "schema_registry",
        "Subjects (v1)": "schema_registry",
        "Entity (v1)": "catalog",
        "Search (v1)": "catalog",		
        "Types (v1)": "catalog",
        "Clusters (cmk/v2)": "managed_kafka_clusters",
        "Clusters (ksqldbcm/v2)": "ksqldb_clusters",
        "Pipelines (sd/v1)": "pipelines",
    };

    // Check for exact matches first
    if (exactMatches[tag]) {
        return exactMatches[tag];
    }

    // Match content within parentheses for fuzzy matching
    const match = tag.match(/\((.*?)\)/);
    if (match) {
        const content = match[1];
        
        // Fuzzy match patterns
        if (/^iam\/.*/i.test(content)) return "iam";
        if (/^org\/.*/i.test(content)) return "org";
        if (/^notifications\/.*/i.test(content)) return "notifications";
        if (/^connect\/.*/i.test(content)) return "connect";
        if (/.*-quotas\/.*/i.test(content)) return "quotas";
        if (/.*-quota\/.*/i.test(content)) return "quotas";
        if (/^srcm\/.*/i.test(content)) return "schema_registry_clusters";
        if (/^byok\/.*/i.test(content)) return "encryption_keys";
        if (/^cdx\/.*/i.test(content)) return "stream_sharing";
        if (/^networking\/.*/i.test(content)) return "networking";
        if (/^partner\/.*/i.test(content)) return "partner";
        if (/^sts\/.*/i.test(content)) return "sts";
        if (/^billing\/.*/i.test(content)) return "billing";
        if (/^fcpm\/.*/i.test(content)) return "flink_compute_pools";
        if (/^sql\/.*/i.test(content)) return "sql";
        if (/^pim\/.*/i.test(content)) return "provider_integrations";
        if (/^artifact\/.*/i.test(content)) return "flink_artifacts";
    }
    
    // Match any pattern that contains "Encryption Keys" anywhere in the tag
    if (/.*Encryption Keys \(.+\)$/i.test(tag)) {
        return "encryption_keys";
    }

    // If no match is found, return "zz_unknown_service"
    return "zz_unknown_service";
}' \
--outputDir=dev
```

### `dev`

```
./openapisaurus dev \
dev \
--providerName=confluent \
--providerConfig='{ "auth": { "type": "basic", "username_var": "CONFLUENT_CLOUD_API_KEY", "password_var": "CONFLUENT_CLOUD_API_SECRET" }}' \
--resDiscriminator='"operationId", "tags[0]" | (operationId, tag) => {
    const specificMappings = {
        "getClusterConfig": "cluster_config",
        "createBusinessMetadata": "business_metadata",
        "updateBusinessMetadata": "business_metadata",
        "getBusinessMetadata": "business_metadata",
        "deleteBusinessMetadata": "business_metadata",
        "createBusinessMetadataDefs": "business_metadata_defs",
        "getAllBusinessMetadataDefs": "business_metadata_defs",
        "updateBusinessMetadataDefs": "business_metadata_defs",
        "deleteBusinessMetadataDef": "business_metadata_defs",
        "getBusinessMetadataDefByName": "business_metadata_defs",
        "partialEntityUpdate": "entities",
        "getByUniqueAttributes": "entities",
        "createTagDefs": "tag_defs",
        "getAllTagDefs": "tag_defs",
        "updateTagDefs": "tag_defs",
        "deleteTagDef": "tag_defs",
        "getTagDefByName": "tag_defs",
        "createTags": "tags",
        "updateTags": "tags",
        "getTags": "tags",
        "deleteTag": "tags",
        "createOrUpdateConnectv1ConnectorConfig": "connector_config",
        "getConnectv1ConnectorConfig": "connector_config",
        "getConnectv1ConnectorOffsets": "connector_offsets",
        "getConnectv1ConnectorOffsetsRequestStatus": "connector_offsets_request_status",
        "alterConnectv1ConnectorOffsetsRequest": "connector_offsets_requests",
        "readConnectv1ConnectorStatus": "connector_status",
        "listConnectv1ConnectorTasks": "connector_tasks",
        "pauseConnectv1Connector": "connectors",
        "resumeConnectv1Connector": "connectors",
        "listConnectv1ConnectorsWithExpansions": "connectors_with_expansions",
        "getDekVersions": "dek_versions",
        "deleteDekVersion": "dek_versions",
        "getDekByVersion": "dek_versions",
        "undeleteDekVersion": "dek_versions",
        "deleteSubjectConfig": "subject_level_config",
        "getSubjectLevelConfig": "subject_level_config",
        "updateSubjectLevelConfig": "subject_level_config",
        "signup": "signups",
        "activateSignup": "signups",
        "signupPartnerV2Link": "signups",
        "deleteTopLevelConfig": "top_level_config",
        "getTopLevelConfig": "top_level_config",
        "updateTopLevelConfig": "top_level_config",
        "getSchemaTypes": "types",
        "getVersions": "versions",
        "listVersions": "versions",
        "listKafkaAllTopicConfigs": "topic_configs",
        "listKafkaTopicConfigs": "topic_configs",
        "deleteKafkaTopicConfig": "topic_configs",
        "getKafkaTopicConfig": "topic_configs",
        "updateKafkaTopicConfig": "topic_configs",
        "updateKafkaTopicConfigBatch": "topic_configs",
        "listKafkaPartitions": "topic_partitions",
        "getKafkaPartition": "topic_partitions",
        "createKafkaTopic": "topics",
        "listKafkaTopics": "topics",
        "deleteKafkaTopic": "topics",
        "getKafkaTopic": "topics",
        "updatePartitionCountKafkaTopic": "topics",
        "createKafkaAcls": "acls",
        "deleteKafkaAcls": "acls",
        "getKafkaAcls": "acls",
        "batchCreateKafkaAcls": "acls",
        "listKafkaLinkConfigs": "cluster_link_configs",
        "deleteKafkaLinkConfig": "cluster_link_configs",
        "getKafkaLinkConfigs": "cluster_link_configs",
        "updateKafkaLinkConfig": "cluster_link_configs",
        "updateKafkaLinkConfigBatch": "cluster_link_configs",
        "createKafkaLink": "cluster_links",
        "listKafkaLinks": "cluster_links",
        "deleteKafkaLink": "cluster_links",
        "getKafkaLink": "cluster_links",
        "getKafkaCluster": "clusters",
        "listKafkaClusterConfigs": "cluster_configs",
        "deleteKafkaClusterConfig": "cluster_configs",
        "getKafkaClusterConfig": "cluster_configs",
        "updateKafkaClusterConfig": "cluster_configs",
        "updateKafkaClusterConfigs": "cluster_configs",
        "listKafkaConsumerGroups": "consumer_groups",
        "getKafkaConsumerGroup": "consumer_groups",
        "listKafkaConsumers": "consumers",
        "getKafkaConsumer": "consumers",
        "getKafkaConsumerGroupLagSummary": "consumers_lag_summary",
        "listKafkaConsumerLags": "consumers_lags",
        "getKafkaConsumerLag": "consumers_lags",
        "listKafkaDefaultTopicConfigs": "default_topic_configs",
        "listKafkaMirrorTopicsUnderLink": "mirror_topics",
        "listKafkaMirrorTopics": "mirror_topics",
        "createKafkaMirrorTopic": "mirror_topics",
        "readKafkaMirrorTopic": "mirror_topics",
        "updateKafkaMirrorTopicsFailover": "mirror_topics",
        "updateKafkaMirrorTopicsPause": "mirror_topics",
        "updateKafkaMirrorTopicsPromote": "mirror_topics",
        "updateKafkaMirrorTopicsResume": "mirror_topics",
        "updateKafkaMirrorTopicsReverseAndPauseMirror": "mirror_topics",
        "updateKafkaMirrorTopicsReverseAndStartMirror": "mirror_topics",
        "updateKafkaMirrorTopicsTruncateAndRestoreMirror": "mirror_topics",
        "listSrcmV2Clusters": "clusters_v2",
        "createSrcmV2Cluster": "clusters_v2",
        "getSrcmV2Cluster": "clusters_v2",
        "updateSrcmV2Cluster": "clusters_v2",
        "deleteSrcmV2Cluster": "clusters_v2",
        "listSrcmV3Clusters": "clusters_v3",
        "getSrcmV3Cluster": "clusters_v3",
        "getOrgV2Organization": "organizations_by_id",
        "updateOrgV2Organization": "organizations_by_id",
        "getOrgV2Environment": "environments_by_id",
        "updateOrgV2Environment": "environments_by_id",
        "deleteOrgV2Environment": "environments_by_id",
    };
    
    // If the operationId matches a specific mapping, return it
    if (specificMappings[operationId]) {
        return specificMappings[operationId];
    }

    // Function to convert titles to snake_case
    const toSnakeCase = (str) => {
        return str
            .replace(/([a-z])([A-Z])/g, "$1_$2")
            .replace(/[^a-zA-Z0-9\s]/g, "")
            .replace(/\s+/g, "_")
            .toLowerCase();
    };

    // Handle the tag-based approach if no specific mapping is found
    if (tag) {
        // Remove the part in parentheses
        const parenthesisIndex = tag.indexOf("(");
        let tagWithoutParens = parenthesisIndex !== -1 ? tag.substring(0, parenthesisIndex).trim() : tag;

        // Convert known acronyms correctly
        const acronyms = ["API", "IP", "DNS", "OAuth"];
        for (const acronym of acronyms) {
            tagWithoutParens = tagWithoutParens.replace(new RegExp(`\\b${acronym}\\b`), acronym.toLowerCase());
        }

        // Convert the tag to snake_case
        const resourceName = toSnakeCase(tagWithoutParens);
        return resourceName;
    }

    // Fallback if no operationId or tag match
    return "unknown_resource";
}' \
--overwrite \
--verbose > confluent_dev.log
```

### `build`

```
rm -rf src/confluent/*
./openapisaurus build \
dev \
--providerName=confluent \
--outputDir=src \
--overwrite \
--verbose > confluent_build.log
```

### Test locally

```
export CONFLUENT_CLOUD_API_KEY=YOURKEY
export CONFLUENT_CLOUD_API_SECRET=yoursecret
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```

```
show services in confluent;
show resources in confluent.org;

select id, display_name, resource_name, created_at from confluent.org.vw_organizations;

select id, display_name, resource_name, created_at from 
confluent.org.vw_organizations_by_id
where id = '73ea43f0-1685-4a78-bc90-fa63ef8102fe';

show methods in confluent.org.environments;

select id, display_name, resource_name, stream_governance_package from confluent.org.vw_environments;

select display_name, resource_name, stream_governance_package from confluent.org.vw_environments_by_id
where id = 'env-216dqo';

show methods in confluent.managed_kafka_clusters.clusters;


select 
_data,
json_extract(json_each.value, '$.id') as id,
json_extract(json_each.value, '$.metadata.created_at') as created_at,
json_extract(json_each.value, '$.metadata.resource_name') as resource_name,
json_extract(json_each.value, '$.metadata.self') as self,
json_extract(json_each.value, '$.metadata.updated_at') as updated_at,
json_extract(json_each.value, '$.spec.api_endpoint') as api_endpoint,
json_extract(json_each.value, '$.spec.availability') as availability,
json_extract(json_each.value, '$.spec.cloud') as cloud,
json_extract(json_each.value, '$.spec.config.kind') as cluster_kind,
json_extract(json_each.value, '$.spec.display_name') as display_name,
json_extract(json_each.value, '$.spec.environment.id') as environment_id,
json_extract(json_each.value, '$.spec.environment.related') as environment_link,
json_extract(json_each.value, '$.spec.environment.resource_name') as environment_resource_name,
json_extract(json_each.value, '$.spec.http_endpoint') as http_endpoint,
json_extract(json_each.value, '$.spec.kafka_bootstrap_endpoint') as kafka_bootstrap_endpoint,
json_extract(json_each.value, '$.spec.region') as region,
json_extract(json_each.value, '$.status.phase') as status_phase,
api_version,
kind,
json_extract(metadata, '$.first') as first,
json_extract(metadata, '$.total_size') as total_size
from confluent.managed_kafka_clusters.clusters, json_each(data)
where environment = 'env-216dqo';


```

### Run Test Suite

from the `stackql-provider-tests` directory:

```
cd ../../stackql-provider-tests
sh test-provider.sh \
confluent \
false \
/mnt/c/LocalGitRepos/stackql/openapi-conversion/openapisaurus \
true
```