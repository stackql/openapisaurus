## prep

```bash
servicesdir=dev/godaddy/v00.00.00000/services

# Delete the directory if it exists
if [ -d "$servicesdir" ]; then
  rm -rf $servicesdir
fi

# Create the directory
mkdir -p $servicesdir

services=("aftermarket" "certificates" "domains" "shoppers" "abuse" "agreements" "countries" "orders" "subscriptions")

for service in "${services[@]}"
do
  mkdir ${servicesdir}/${service}
  # format and move the service file
  ./openapisaurus format ref/godaddy/${service}.yaml ${servicesdir}/${service}/${service}.yaml --overwrite --verbose
done
```

## dev

```bash
./openapisaurus dev \
dev \
--providerName=godaddy \
--providerConfig='{ "auth": { "type": "bearer", "credentialsenvvar": "GODADDY_API_KEY" }}' \
--overwrite \
--verbose
```

## build

```bash
./openapisaurus build \
dev \
--providerName=godaddy \
--outputDir=src \
--overwrite \
--verbose
```

## Run Test Suite

```bash
cd ..
cd stackql-provider-tests
sh test-provider.sh \
godaddy \
false \
/mnt/c/LocalGitRepos/stackql/openapisaurus \
true
cd ..
cd openapisaurus
```

## inspect

```bash
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```
