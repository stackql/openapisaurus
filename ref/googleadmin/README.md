```
servicesdir=dev/googleadmin/v00.00.00000/services/directory
mkdir -p $servicesdir
```

copy directory.yaml from `google-discovery-to-openapi` project to `servicesdir` directory

### `dev`

```
./openapisaurus dev \
dev \
--providerName=googleadmin \
--providerConfig='{ "auth": { "credentialsfilepathenvvar": "GOOGLE_APPLICATION_CREDENTIALS", "type": "service_account", "scopes": ["https://www.googleapis.com/auth/cloud-platform","https://www.googleapis.com/auth/admin.directory.user.readonly"] }}' \
--overwrite \
--verbose
```

### `build`

```
./openapisaurus build \
dev \
--providerName=googleadmin \
--outputDir=src \
--overwrite \
--verbose
```

### Run Test Suite

from the `stackql-provider-tests` directory:

```
cd ../stackql-provider-tests
sh test-provider.sh \
googleadmin \
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