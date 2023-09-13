## `github` Provider Dev

### `prep`

rm -rf dev/github
rm -rf src/github

### `split`

```
./openapisaurus split \
ref/github/api.github.com.yaml \
--providerName=github \
--svcdiscriminator='["tags"][0]' \
--outputDir=dev \
--overwrite
```

### `dev`

```
./openapisaurus dev \
dev \
--providerName=github \
--providerConfig='{ "auth": { "type": "basic", "username_var": "STACKQL_GITHUB_USERNAME", "password_var": "STACKQL_GITHUB_PASSWORD" }}' \
--overwrite \
--verbose
```

### `build`

```
./openapisaurus build \
dev \
--providerName=github \
--outputDir=src \
--overwrite \
--verbose
```

### Run Test Suite

from the `stackql-provider-tests` directory:

```
cd ../stackql-provider-tests
sh test-provider.sh \
github \
false \
/mnt/c/LocalGitRepos/stackql/openapisaurus \
true
```

### Test Locally

```
export STACKQL_GITHUB_USERNAME=xxx 
export STACKQL_GITHUB_PASSWORD=xxx
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```

```
SELECT 
published_at,
target_commitish,
tag_name
FROM github.repos.releases WHERE owner = 'stackql' AND repo = 'stackql';
```
