### Create Dev directory for purestorage provider
mkdir -p dev/purestorage/v00.00.00000/services


### Create service directory and service file for fusion service
mkdir dev/purestorage/v00.00.00000/services/fusion
cp ref/purestorage/Fusion1.1.openapi3.spec.yaml dev/purestorage/v00.00.00000/services/fusion/fusion.yaml

### Extract resources for purestorage 
./openapisaurus dev \
dev \
--providerName=purestorage \
--resDiscriminator='["tags"][0]' \
--providerConfig='{ "auth": { "type": "bearer", "credentialsenvvar": "PURESTORAGE_TOKEN" }}' \
--overwrite \
--verbose


### `build`

```
./openapisaurus build \
dev \
--providerName=purestorage \
--outputDir=src \
--overwrite \
--verbose
```
