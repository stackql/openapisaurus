# all `azure` specs

create tagged specs from [stackql-azure-openapi](https://github.com/stackql/stackql-azure-openapi), copy into `dev` dir

```bash
rm -rf dev/azure
rm -rf dev/azure_extras
rm -rf dev/azure_isv
rm -rf dev/azure_stack
rm -rf src/azure
rm -rf src/azure_extras
rm -rf src/azure_isv
rm -rf src/azure_stack
cp -r ../stackql-azure-openapi/openapi/4-tagged/azure/ dev/azure
cp -r ../stackql-azure-openapi/openapi/4-tagged/azure_extras/ dev/azure_extras
cp -r ../stackql-azure-openapi/openapi/4-tagged/azure_isv/ dev/azure_isv
cp -r ../stackql-azure-openapi/openapi/4-tagged/azure_stack/ dev/azure_stack
```

### `dev`

```bash
# azure
./openapisaurus dev \
dev \
--providerName=azure \
--providerConfig='{ "auth": { "type": "azure_default" }}' \
--overwrite \
--verbose > azure_dev.log

# azure_extras
./openapisaurus dev \
dev \
--providerName=azure_extras \
--providerConfig='{ "auth": { "type": "azure_default" }}' \
--overwrite \
--verbose > azure_extras_dev.log

# azure_stack
./openapisaurus dev \
dev \
--providerName=azure_stack \
--providerConfig='{ "auth": { "type": "azure_default" }}' \
--overwrite \
--verbose > azure_stack_dev.log

# azure_isv
./openapisaurus dev \
dev \
--providerName=azure_isv \
--providerConfig='{ "auth": { "type": "azure_default" }}' \
--overwrite \
--verbose > azure_isv_dev.log
```

### `build`

```bash
# azure
./openapisaurus build \
dev \
--providerName=azure \
--outputDir=src \
--overwrite \
--verbose > azure_build.log

# azure_extras
./openapisaurus build \
dev \
--providerName=azure_extras \
--outputDir=src \
--overwrite \
--verbose > azure_extras_build.log

# azure_stack
./openapisaurus build \
dev \
--providerName=azure_stack \
--outputDir=src \
--overwrite \
--verbose > azure_stack_build.log

# azure_isv
./openapisaurus build \
dev \
--providerName=azure_isv \
--outputDir=src \
--overwrite \
--verbose > azure_isv_build.log
```

### Inspect Objects

```
```


### Run Test Suite

from the `stackql-provider-tests` directory:

```bash
cd ../stackql-provider-tests

# azure
sh test-provider.sh \
azure \
false \
/mnt/c/LocalGitRepos/stackql/openapisaurus \
true

# azure_extras
sh test-provider.sh \
azure_extras \
false \
/mnt/c/LocalGitRepos/stackql/openapisaurus \
true

# azure_stack
sh test-provider.sh \
azure_stack \
false \
/mnt/c/LocalGitRepos/stackql/openapisaurus \
true

# azure_isv
sh test-provider.sh \
azure_isv \
false \
/mnt/c/LocalGitRepos/stackql/openapisaurus \
true
```

### inspect and test `azure` provider using the local registry

```bash
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```

queries...

```sql
/* get instances by resource groups */
SELECT
name,
location,
SPLIT_PART(id, '/', 3) as resource_group,
JSON_EXTRACT(properties, '$.hardwareProfile.vmSize') as vm_size,
JSON_EXTRACT(properties, '$.storageProfile.osDisk.osType') as os_type,
JSON_EXTRACT(properties, '$.timeCreated') as time_created
FROM azure.compute.virtual_machines 
WHERE resourceGroupName IN  ('stackql-ops-cicd-dev-01', 'stackqlenv1', 'stackqlenv2', 'stackqlenv3', 'stackqlenv4')
AND subscriptionId = '631d1c6d-2a65-43e7-93c2-688bfe4e1468';

/* get instances by locations */
SELECT
name,
location,
SPLIT_PART(id, '/', 3) as resource_group,
JSON_EXTRACT(properties, '$.hardwareProfile.vmSize') as vm_size,
JSON_EXTRACT(properties, '$.storageProfile.osDisk.osType') as os_type,
JSON_EXTRACT(properties, '$.timeCreated') as time_created
FROM azure.compute.virtual_machines 
WHERE location IN  ('southcentralus', 'australiaeast')
AND subscriptionId = '631d1c6d-2a65-43e7-93c2-688bfe4e1468';

/* get available sizes for instance */
SELECT *
FROM azure.compute.virtual_machines_available_sizes
WHERE resourceGroupName =  'stackql-ops-cicd-dev-01'
AND subscriptionId = '631d1c6d-2a65-43e7-93c2-688bfe4e1468'
AND vmName = 'test';

/* get instance state details */
SELECT 
computerName,
json_array_length(disks) as num_disks,
hyperVGeneration,
osName,
osVersion,
JSON_EXTRACT(statuses, '$[1].displayStatus') as status
FROM azure.compute.virtual_machine
WHERE resourceGroupName =  'stackql-ops-cicd-dev-01'
AND subscriptionId = '631d1c6d-2a65-43e7-93c2-688bfe4e1468'
AND vmName = 'test';

/* stop the instance */
EXEC azure.compute.virtual_machine.power_off
@subscriptionId='631d1c6d-2a65-43e7-93c2-688bfe4e1468',
@resourceGroupName='stackql-ops-cicd-dev-01',
@vmName='test';

/* start the instance */
EXEC azure.compute.virtual_machine.start
@subscriptionId='631d1c6d-2a65-43e7-93c2-688bfe4e1468',
@resourceGroupName='stackql-ops-cicd-dev-01',
@vmName='test';
```

using the server...

```bash
nohup ./stackql --registry="${REG_STR}" --pgsrv.port=5444 srv &
# to run queries
psql -h localhost -p 5444 -d stackql -U stackql
# to stop the server
sudo kill $(sudo lsof -t -i:5444)
```