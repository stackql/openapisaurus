## `godaddy` Provider Dev

### `prep`

```
rm -rf dev/homebrew
rm -rf src/homebrew
servicesdir=dev/homebrew/v00.00.00000/services
mkdir -p $servicesdir
services=("formula")

for service in "${services[@]}"
do
  mkdir ${servicesdir}/${service}
  ./openapisaurus format ref/homebrew/${service}.yaml ${servicesdir}/${service}/${service}.yaml
  # cp ref/homebrew/${service}.yaml ${servicesdir}/${service}/${service}.yaml
done
```

### `dev`

```
./openapisaurus dev \
dev \
--providerName=homebrew \
--providerConfig='{ "auth": { "type": "null_auth" }}' \
--overwrite \
--verbose
```

### `build`

```
./openapisaurus build \
dev \
--providerName=homebrew \
--outputDir=src \
--overwrite \
--verbose
```

### `test`

```
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```

### Run Test Suite

from the `stackql-provider-tests` directory:

```
cd ../stackql-provider-tests
sh test-provider.sh \
godaddy \
false \
/mnt/c/LocalGitRepos/stackql/openapisaurus \
true
```