### obtain the API doc

Download the API spec from one of the DataDog SDKs, e.g. [datadog-api-client-python](https://github.com/DataDog/datadog-api-client-python/blob/master/.generator/schemas/v2/openapi.yaml).

### prep
remove the `datadog` provider directories:

```bash
rm -rf dev/datadog
rm -rf src/datadog
```

### `spilt`

split the api spec based upon the first `tag` value:

```bash
./openapisaurus split \
ref/datadog/openapi.yaml \
--providerName=datadog \
--svcDiscriminator='["tags"][0] | (input) => input.replace(/ /g, "_")' \
--outputDir=dev \
--overwrite \
--verbose
```

### `dev`

extract stackql resources and methods from the `datadog` provider service specs:

```bash
./openapisaurus dev \
dev \
--providerName=datadog \
--resDiscriminator='"operationId" | (operationId) => {
  const exceptionTokens = {
    "AuthN": "authn",
    "CI": "ci",
    "AWS": "aws",
    "GCP": "gcp",
    "APM": "apm",
    "RUM": "rum",
    "DORA": "dora",
    "STS": "Sts",
    "IP": "Ip",
    "API": "Api",
    "IdP": "Idp",
  };

  // Replace exceptions in the operationId
  Object.keys(exceptionTokens).forEach(key => {
    operationId = operationId.replace(new RegExp(key, "g"), exceptionTokens[key]);
  });

  // Convert to snake case
  let snakeCase = operationId.replace(/[A-Z]/g, letter => "_" + letter.toLowerCase());

  // Remove the first token and ensure the last token is plural
  let tokens = snakeCase.split("_").filter(t => t);
  tokens.shift(); // Remove the first token
  let lastToken = tokens[tokens.length - 1];
  if (!lastToken.endsWith("s")) {
    tokens[tokens.length - 1] += "s"; // Make the last token plural
  }

  return tokens.join("_");
}' \
--providerConfig='{ "auth": { "type": "custom", "location": "header", "name": "DD-API-KEY", "credentialsenvvar": "DD_API_KEY", "successor": { "type": "custom", "location": "header", "name": "DD-APPLICATION-KEY", "credentialsenvvar": "DD_APP_KEY" }}}' \
--overwrite \
--verbose
```

### `build`

build the `datadog` provider, including merging of view defined in `views/datadog`:

```bash
./openapisaurus build \
dev \
--providerName=datadog \
--outputDir=src \
--servers='[
  {
    "url": "https://{dd_site:^(?:api\\.datadoghq\\.com|us3\\.datadoghq\\.com|us5\\.datadoghq\\.com|datadoghq\\.eu|ddog-gov\\.com)$}/",
    "variables": {
      "dd_site": {
        "default": "api.datadoghq.com",
        "description": "The regional site for Datadog customers."
      }
    }
  }
]' \
--overwrite \
--verbose
```
<!-- "api.datadoghq.com",
"us3.datadoghq.com",
"us5.datadoghq.com",
"datadoghq.eu",
"ddog-gov.com" -->

### inspect objects

```bash
node tests/inspectProvider.js datadog 2>&1 | tee datadog.log
```

### run test suite

from the `stackql-provider-tests` directory:

```bash
cd ../stackql-provider-tests
sh test-provider.sh \
datadog \
false \
/mnt/c/LocalGitRepos/stackql/openapisaurus \
true
```

### inspect and test `datadog` provider using the local registry

```bash
export DD_API_KEY="<your_app_key>"
export DD_APP_KEY="<your_app_key>"
...
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```

test views...

```sql
SELECT name, email, status, mfa_enabled, verified FROM datadog.users.vw_users WHERE dd_site = 'us3.datadoghq.com'; 
```

