## `vercel` Provider Dev

### `split`

```
./openapisaurus split \
ref/vercel/vercel-openapi.yaml \
--providerName=vercel \
--svcdiscriminator='["tags"][0]' \
--outputDir=dev
```

### `dev`

```
./openapisaurus dev \
dev \
--providerName=vercel \
--providerConfig='{ "auth": { "type": "bearer", "credentialsenvvar": "VERCEL_API_TOKEN" }}' \
--overwrite \
--verbose
```

### `build`

```
./openapisaurus build \
dev \
--providerName=vercel \
--outputDir=src \
--overwrite \
--verbose
```

### Inspect Objects

```
node tests/inspectProvider.js vercel 2>&1 | tee vercel.log
```

### Run Test Suite

from the `stackql-provider-tests` directory:

```
sh test-provider.sh \
vercel \
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

