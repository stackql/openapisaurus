## `digitalocean` Provider Dev

### `split`

```
./openapisaurus split \
ref/digitalocean/digitalocean-openapi-bundled.yaml \
--providerName=digitalocean \
--svcdiscriminator='["tags"][0]' \
--outputDir=dev \
--overwrite
```

### `dev`

```
./openapisaurus dev \
dev \
--providerName=digitalocean \
--providerConfig='{ "auth": { "type": "bearer", "credentialsenvvar": "DIGITALOCEAN_TOKEN" }}' \
--overwrite \
--verbose
```

### `build`

```
./openapisaurus build \
dev \
--providerName=digitalocean \
--outputDir=src \
--overwrite \
--verbose
```

### Run Test Suite

from the `stackql-provider-tests` directory:

```
cd ../stackql-provider-tests
sh test-provider.sh \
digitalocean \
false \
/mnt/c/LocalGitRepos/stackql/openapisaurus \
true
```


### Test Locally

```
export DIGITALOCEAN_TOKEN=xxx
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```

```
SELECT id, name, status, size_slug, created_at, memory, disk
FROM digitalocean.droplets.droplets;
```
