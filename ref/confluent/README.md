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
    const specificMappings = {};
    
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
show methods in confluent.org.environments;

select * from confluent.org.organizations;

select * from 
confluent.org.organizations
where id = '73ea43f0-1685-4a78-bc90-fa63ef8102fe';

select * from confluent.org.environments;

select * from confluent.org.environments
where id = 'env-216dqo';

select *
from confluent.managed_kafka_clusters.clusters
where environment = 'env-216dqo';

select *
from confluent.managed_kafka_clusters.clusters
where environment = 'env-216dqo'
and id = 'lkc-ov720o';
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