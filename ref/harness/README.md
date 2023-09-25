# `harness`

Obtain spec from: [https://github.com/harness/harness-go-sdk/blob/main/harness/nextgen/api/swagger.yaml](https://github.com/harness/harness-go-sdk/blob/main/harness/nextgen/api/swagger.yaml)

### `split`

```
./openapisaurus split \
ref/harness/swagger.yaml \
--providerName=harness \
--svcdiscriminator='["tags"][0]' \
--outputDir=dev
```

### `dev`

```
./openapisaurus dev \
dev \
--providerName=harness \
--providerConfig='{ "auth": { "type": "bearer", "credentialsenvvar": "HARNESS_API_TOKEN" }}' \
--overwrite
```

### `build`

```
./openapisaurus build \
dev \
--providerName=harness \
--outputDir=src \
--overwrite \
--verbose
```

### Inspect Objects

```
node tests/inspectProvider.js harness 2>&1 | tee harness.log
```

### Run Test Suite

from the `stackql-provider-tests` directory:

```
cd ../stackql-provider-tests
sh test-provider.sh \
harness \
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

