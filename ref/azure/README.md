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

# azure_isv
sh test-provider.sh \
azure_isv \
false \
/mnt/c/LocalGitRepos/stackql/openapisaurus \
true
```
