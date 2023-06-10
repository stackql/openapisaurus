### fork the Postman collection
https://docs.datadoghq.com/getting_started/api/

### convert the postman collection to openapi specs
```bash
npm i postman-to-openapi -g
p2o ./datadog-postman-collection.json -f ./datadog-openapi.json -o options.json
```

### Spilt
```bash
./openapisaurus split \
ref/datadog/datadog-openapi.json \
--providerName=datadog \
--svcdiscriminator='["tags"][0]' \
--outputDir=dev \
--overwrite
```


### `dev`

```bash
./openapisaurus dev \
dev \
--providerName=datadog \
--providerConfig='{ "auth": { "type": "bearer", "credentialsenvvar": "DIGITALOCEAN_TOKEN" }}' \
--overwrite \
--verbose
```


### `build`

```bash
./openapisaurus build \
dev \
--providerName=datadog \
--outputDir=src \
--overwrite \
--verbose
```


