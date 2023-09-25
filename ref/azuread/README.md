# `azuread`

obtain a spec from [here](https://github.com/microsoftgraph/msgraph-metadata/blob/master/openapi/v1.0/openapi.yaml)

clean up the spec dirs and files

```
rm -rf dev/azuread
rm -rf src/azuread
```

### `split`

```
./openapisaurus split \
ref/azuread/openapi.yaml \
--providerName=azuread \
--svcdiscriminator='["tags"][0]' \
--outputDir=dev
```

### `dev`

```
./openapisaurus dev \
dev \
--providerName=azuread \
--providerConfig='{ "auth": { "type": "azure_default" }}' \
--overwrite \
--verbose
```


### `build`

```
./openapisaurus build \
dev \
--providerName=azuread \
--outputDir=src \
--overwrite \
--verbose
```

### Inspect Objects

```
```

### Run Test Suite

from the `stackql-provider-tests` directory:

```
cd ../stackql-provider-tests
sh test-provider.sh \
azuread \
false \
/mnt/c/LocalGitRepos/stackql/openapisaurus \
true
```
