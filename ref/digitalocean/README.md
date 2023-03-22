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

### Test Locally

```
export DIGITALOCEAN_TOKEN=xxx
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```

export DIGITALOCEAN_TOKEN=dop_v1_47258577ba5b8c82be482e16aeb79cf8c4d78d0181cd6db9a3b67687a3a1e0b5
./stackql --registry="${REG_STR}" shell

dop_v1_47258577ba5b8c82be482e16aeb79cf8c4d78d0181cd6db9a3b67687a3a1e0b5