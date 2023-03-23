## `cloudflare` Provider Dev

### `split`

```
./openapisaurus split \
ref/cloudflare/cloudflare-api.json \
--providerName=cloudflare \
--svcdiscriminator='["tags"][0]' \
--outputDir=dev
```

### `dev`

```
./openapisaurus dev \
dev \
--providerName=cloudflare \
--providerConfig='{ "auth": { "type": "bearer", "credentialsenvvar": "CLOUDFLARE_API_TOKEN" }}' \
--overwrite \
--verbose
```

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

### Test Locally

```
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```