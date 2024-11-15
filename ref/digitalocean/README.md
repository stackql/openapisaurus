## `digitalocean` Provider Dev

https://github.com/digitalocean/openapi
make bundle

clean up the spec dirs and files

```
rm -rf dev/digitalocean/*
```

### `format`
```
./openapisaurus format \
ref/digitalocean/openapi-bundled.yaml \
ref/digitalocean/openapi-bundled-formatted.yaml \
--verbose \
--overwrite \
--deref \
--derefStartAt='$.components' \
--flatten
```

### `split`

```
./openapisaurus split \
ref/digitalocean/openapi-bundled-formatted.yaml \
--providerName=digitalocean \
--svcdiscriminator='["tags"][0]' \
--outputDir=dev \
--overwrite
```

### `dev`

```
./openapisaurus dev \
dev \
--providerName=digitalocean \
--providerConfig='{ "auth": { "type": "bearer", "credentialsenvvar": "DIGITALOCEAN_TOKEN" }}' \
--overwrite \
--verbose
```

### `build`

```
rm -rf src/digitalocean/*
./openapisaurus build \
dev \
--providerName=digitalocean \
--outputDir=src \
--overwrite \
--verbose
```

### Run Test Suite

from the `stackql-provider-tests` directory:

```
cd ../../stackql-provider-tests
sh test-provider.sh \
digitalocean \
false \
/mnt/c/LocalGitRepos/stackql/openapi-conversion/openapisaurus \
true
```

### Test Locally

```
export DIGITALOCEAN_TOKEN=xxx
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```

```
SELECT id, name, status, size_slug, created_at, memory, disk
FROM digitalocean.droplets.droplets;
```


```
rm digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/account/account-resources.yaml digitalocean.csv true
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/block_storage/block_storage-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/databases/databases-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/floating_ips/floating_ips-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/load_balancers/load_balancers-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/regions/regions-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/ssh_keys/ssh_keys-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/vpcs/vpcs-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/actions/actions-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/cdn/cdn-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/domains/domains-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/functions/functions-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/monitoring/monitoring-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/reserved_ips/reserved_ips-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/tags/tags-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/apps/apps-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/certificates/certificates-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/droplets/droplets-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/images/images-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/one_click_applications/one_click_applications-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/sizes/sizes-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/uptime/uptime-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/billing/billing-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/container_registry/container_registry-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/firewalls/firewalls-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/kubernetes/kubernetes-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/projects/projects-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/snapshots/snapshots-resources.yaml digitalocean.csv
python3 view_resources_and_methods.py dev/digitalocean/v00.00.00000/services/vpc_peerings/vpc_peerings-resources.yaml digitalocean.csv
```