```
rm -rf dev/pagerduty
rm -rf src/pagerduty
```

### `split`

```
./openapisaurus split \
ref/pagerduty/pager-duty-openapiv3.json \
--providerName=pagerduty \
--svcDiscriminator='["tags"][0] | (input) => input.replace(/ /g, "_")' \
--outputDir=dev \
--overwrite \
--verbose
```
### `dev`

```
./openapisaurus dev \
dev \
--providerName=pagerduty \
--providerConfig='{ "auth": { "type": "api_key", "valuePrefix": "Token token=", "credentialsenvvar": "PAGERDUTY_API_TOKEN" }}' \
--overwrite \
--verbose
```

### `build`

```
./openapisaurus build \
dev \
--providerName=pagerduty \
--outputDir=src \
--overwrite \
--verbose
```

### Run Test Suite

from the `stackql-provider-tests` directory:

```
cd ../stackql-provider-tests
sh test-provider.sh \
pagerduty \
false \
/mnt/c/LocalGitRepos/stackql/openapisaurus \
true
```
