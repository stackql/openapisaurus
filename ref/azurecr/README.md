## `azurecr` Provider Dev

```
rm -rf dev/azurecr
rm -rf src/azurecr
```

### `split`

```
./openapisaurus split \
ref/azurecr/openapi.yaml \
--providerName=azurecr \
--svcDiscriminator='["tags"][0] | (input) => input.replace(/ /g, "_")' \
--outputDir=dev \
--overwrite \
--verbose
```

### `dev`

```
./openapisaurus dev \
dev \
--providerName=azurecr \
--providerConfig='{ "auth": { "type": "azure_default" }}' \
--overwrite \
--verbose
```

### `build`

```
./openapisaurus build \
dev \
--providerName=azurecr \
--outputDir=src \
--servers='[
    {
      "url": "https://{login_server}",
      "variables": {
        "login_server": {
          "default": "stackql.azurecr.io"
        }
      }
    }
]' \
--overwrite \
--verbose
```

### Test Locally

```
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```