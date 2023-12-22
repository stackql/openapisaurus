### fork the Postman collection
https://docs.datadoghq.com/getting_started/api/

### convert the postman collection to openapi specs
```bash
npm i postman-to-openapi -g
p2o ./datadog-postman-collection.json -f ./datadog-openapi.json -o options.json

rm -rf dev/datadog
rm -rf src/datadog
```

### Spilt
```
./openapisaurus split \
ref/datadog/datadog-openapi.yaml \
--providerName=datadog \
--svcDiscriminator='["tags"][0] | (input) => input.replace(/ /g, "_")' \
--outputDir=dev \
--overwrite \
--verbose
```

### `dev`

```
./openapisaurus dev \
dev \
--providerName=datadog \
--providerConfig='{ "auth": { "type": "bearer", "credentialsenvvar": "DATADOG_TOKEN" }}' \
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


