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
--providerConfig='{ "auth": { "type": "basic", "username_var": "FIVETRAN_API_KEY", "password_var": "FIVETRAN_API_SECRET" }}' \
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

### Run Test Suite

from the `stackql-provider-tests` directory:

```
sh test-provider.sh \
fivetran \
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

### Test in Dev Registry

```
export DEV_REG="{ \"url\": \"https://registry-dev.stackql.app/providers\" }"
./stackql shell --registry="${DEV_REG}"
```