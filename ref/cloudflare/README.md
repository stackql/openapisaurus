## `cloudflare` Provider Dev

```
rm -rf dev/cloudflare
rm -rf src/cloudflare
```

### `split`

```
./openapisaurus split \
ref/cloudflare/cloudflare-api.json \
--providerName=cloudflare \
--svcDiscriminator='["tags"][0] | (input) => input.replace(/ /g, "_").replace(/\//g, "_")' \
--outputDir=dev 
```

### `dev`

```
./openapisaurus dev \
dev \
--providerName=cloudflare \
--providerConfig='{ "auth": { "type": "bearer", "credentialsenvvar": "CLOUDFLARE_API_KEY" }}' \
--overwrite \
--verbose
```

--resDiscriminator='"operationId","tags"[0] | (operationId, tag) => {
    let formattedTag = tag.toLowerCase().replace(/\s/g, "-").replace(/\(/g, "(-").replace(/\)/g, "-)");
    let resourceName = operationId.replace(formattedTag, "");
    resourceName = resourceName.split("-").slice(1).join("_");
    return resourceName;
}' \




### `build`

```
./openapisaurus build \
dev \
--providerName=cloudflare \
--outputDir=src \
--overwrite \
--verbose
```

### Inspect Objects

```
node tests/inspectProvider.js cloudflare 2>&1 | tee cloudflare.log
```

### Run Test Suite

from the `stackql-provider-tests` directory:

```
sh test-provider.sh \
cloudflare \
false \
/mnt/c/LocalGitRepos/stackql/openapisaurus \
true
```

### Test Locally

```
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```

```


```

