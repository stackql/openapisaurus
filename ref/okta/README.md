## `okta` Provider Dev

### `split`

```
./openapisaurus split \
ref/okta/openapi.yaml \
--providerName=okta \
--svcdiscriminator='["tags"][0]' \
--outputDir=dev \
--overwrite \
--verbose
```

### `dev`

```
./openapisaurus dev \
dev \
--providerName=okta \
--resDiscriminator='last_path_token' \
--providerConfig='{ "auth": { "credentialsenvvar": "OKTA_API_TOKEN", "type": "api_key", "valuePrefix": "SSWS "}}' \
--overwrite \
--verbose
```