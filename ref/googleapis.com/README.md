### `dev`

```
./openapisaurus dev \
dev \
--providerName=googleapis.com \
--providerConfig='{ "auth": { "credentialsenvvar": "GOOGLE_CREDENTIALS", "type": "service_account" }}' \
--overwrite \
--verbose
```


### `build`

```
./openapisaurus build \
dev \
--providerName=googleapis.com \
--outputDir=src \
--overwrite \
--verbose
```

### Run Test Suite

from the `stackql-provider-tests` directory:

```
cd ../stackql-provider-tests
sh test-provider.sh \
google \
false \
/mnt/c/LocalGitRepos/stackql/openapisaurus \
true
```

### Inspect

```
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```