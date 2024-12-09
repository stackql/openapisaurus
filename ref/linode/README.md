## `linode` Provider Dev

download latest spec from [`linode/linode-api-docs`](https://github.com/linode/linode-api-docs/blob/development/openapi.yaml)

clean up the spec dirs and files

```
rm -rf dev/linode/*
```

### `split`

```
./openapisaurus split \
ref/linode/openapi.yaml \
--providerName=linode \
--svcdiscriminator='"$" | (operation) => {
  try {
    const syntax = operation["x-akamai"].tabs[0].syntax;
    return syntax.split(/\s+/)[1];
  } catch (error) {
    return "unknown_service";
  }
}' \
--outputDir=dev \
--overwrite \
--verbose
```

### `dev`

```
./openapisaurus dev \
dev \
--providerName=linode \
--providerConfig='{ "auth": { "type": "bearer", "credentialsenvvar": "LINODE_TOKEN" }}' \
--resDiscriminator='"$" | (operation) => {
  const operationId = operation.operationId;
  try {
    return operation["x-akamai"].tabs[0].syntax.split(" ")[1];
  } catch (error) {
    console.warn(`unknown resource for ${operationId}`)
    return "unknown_resource";
  }
}' \
--overwrite \
--verbose > linode_dev.log
```

### `build`

```
./openapisaurus build \
dev \
--providerName=linode \
--outputDir=src \
--overwrite \
--verbose
```

### Test Locally

```
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```

```
select id, label, region, status from linode.instances.linode;
EXEC linode.instances.linode.shutdownLinodeInstance @linodeId='46063016'

```


                                           
                                 

rm linode.csv
python3 view_resources_and_methods.py dev/linode/v00.00.00000/services/account/account-resources.yaml linode.csv true
python3 view_resources_and_methods.py dev/linode/v00.00.00000/services/databases/databases-resources.yaml linode.csv
python3 view_resources_and_methods.py dev/linode/v00.00.00000/services/images/images-resources.yaml linode.csv
python3 view_resources_and_methods.py dev/linode/v00.00.00000/services/kubernetes_engine/kubernetes_engine-resources.yaml linode.csv
python3 view_resources_and_methods.py dev/linode/v00.00.00000/services/managed/managed-resources.yaml linode.csv
python3 view_resources_and_methods.py dev/linode/v00.00.00000/services/regions/regions-resources.yaml linode.csv
python3 view_resources_and_methods.py dev/linode/v00.00.00000/services/networking/networking-resources.yaml linode.csv
python3 view_resources_and_methods.py dev/linode/v00.00.00000/services/object_storage/object_storage-resources.yaml linode.csv
python3 view_resources_and_methods.py dev/linode/v00.00.00000/services/profile/profile-resources.yaml linode.csv
python3 view_resources_and_methods.py dev/linode/v00.00.00000/services/stack_scripts/stack_scripts-resources.yaml linode.csv
python3 view_resources_and_methods.py dev/linode/v00.00.00000/services/tags/tags-resources.yaml linode.csv
python3 view_resources_and_methods.py dev/linode/v00.00.00000/services/domains/domains-resources.yaml linode.csv
python3 view_resources_and_methods.py dev/linode/v00.00.00000/services/vpcs/vpcs-resources.yaml linode.csv
python3 view_resources_and_methods.py dev/linode/v00.00.00000/services/beta_programs/beta_programs-resources.yaml linode.csv
python3 view_resources_and_methods.py dev/linode/v00.00.00000/services/instances/instances-resources.yaml linode.csv
python3 view_resources_and_methods.py dev/linode/v00.00.00000/services/longview/longview-resources.yaml linode.csv
python3 view_resources_and_methods.py dev/linode/v00.00.00000/services/network_transfer_prices/network_transfer_prices-resources.yaml linode.csv
python3 view_resources_and_methods.py dev/linode/v00.00.00000/services/node_balancers/node_balancers-resources.yaml linode.csv
python3 view_resources_and_methods.py dev/linode/v00.00.00000/services/placement_groups/placement_groups-resources.yaml linode.csv
python3 view_resources_and_methods.py dev/linode/v00.00.00000/services/support/support-resources.yaml linode.csv
python3 view_resources_and_methods.py dev/linode/v00.00.00000/services/volumes/volumes-resources.yaml linode.csv
