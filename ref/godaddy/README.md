## `godaddy` Provider Dev

### `prep`

```
rm -rf dev/godaddy
rm -rf src/godaddy
servicesdir=dev/godaddy/v00.00.00000/services
mkdir -p $servicesdir
services=("aftermarket" "certificates" "domains" "shoppers" "abuse" "agreements" "countries" "orders" "subscriptions")

for service in "${services[@]}"
do
  mkdir ${servicesdir}/${service}
  ./openapisaurus format ref/godaddy/${service}.yaml ${servicesdir}/${service}/${service}.yaml
  # cp ref/godaddy/${service}.yaml ${servicesdir}/${service}/${service}.yaml
done
```

### `dev`

```
./openapisaurus dev \
dev \
--providerName=godaddy \
--providerConfig='{ "auth": { "credentialsenvvar": "GODADDY_API_KEY", "type": "api_key", "valuePrefix": "sso-key "}}' \
--overwrite \
--verbose
```

### `build`

```
./openapisaurus build \
dev \
--providerName=godaddy \
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