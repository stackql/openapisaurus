# `azuread`

obtain a spec from [here](https://github.com/microsoftgraph/msgraph-metadata/blob/master/openapi/v1.0/openapi.yaml)

clean up the spec dirs and files

```
rm -f ref/azuread/openapi-formatted.yaml
rm -rf dev/azuread
rm -rf src/azuread
```

### `split`

```
./openapisaurus format \
ref/azuread/openapi.yaml \
ref/azuread/openapi-formatted.yaml \
--overwrite \
--verbose
```


### `split`

```
./openapisaurus split \
ref/azuread/openapi-formatted.yaml \
--providerName=azuread \
--svcDiscriminator='"tags"[0] | (input) => input.split(".")[0]' \
--outputDir=dev
```

### `dev`

```
./openapisaurus dev \
dev \
--providerName=azuread \
--providerConfig='{ "auth": { "type": "azure_default" }}' \
--resDiscriminator='"tags"[0] | (input) => input.split(".")[1]' \
--overwrite \
--verbose > aad_dev.log
```

### `build`

```
./openapisaurus build \
dev \
--providerName=azuread \
--outputDir=src \
--overwrite \
--verbose > aad_build.log
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
