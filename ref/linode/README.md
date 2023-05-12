## `linode` Provider Dev

### `split`

```
./openapisaurus split \
ref/linode/linode-openapi.yaml \
--providerName=linode \
--svcdiscriminator='["x-linode-cli-command"]' \
--outputDir=dev \
--overwrite \
--verbose
```

### `dev`

```
./openapisaurus dev \
dev \
--providerName=linode \
--providerConfig='{ "auth": { "type": "bearer", "credentialsenvvar": "LINODE_TOKEN" }}' \
--overwrite \
--verbose
```

### `build`

```
./openapisaurus build \
dev \
--providerName=linode \
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

```
select id, label, region, status from linode.instances.linode;
EXEC linode.instances.linode.shutdownLinodeInstance @linodeId='46063016'

```