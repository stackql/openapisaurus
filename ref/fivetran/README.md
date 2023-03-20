## `fivetran` Provider Dev

### `split`

```
./openapisaurus split \
ref/fivetran/swagger.json \
--providerName=fivetran \
--svcdiscriminator='["tags"][0]' \
--outputDir=dev \
--overwrite \
--verbose
```

### `dev`

```
./openapisaurus dev \
dev \
--providerName=fivetran \
--providerConfig='{ "auth": { "type": "basic", "credentialsenvvar": "FIVETRAN_CREDS" }}' \
--overwrite \
--verbose
```

### `build`

```
./openapisaurus build \
dev \
--providerName=fivetran \
--outputDir=src \
--overwrite \
--verbose
```

### Test Locally

```
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```