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

DD_APP_KEY 

### `dev`

```
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
--providerConfig='{ "auth": { "type": "bearer", "credentialsenvvar": "DD_API_KEY" }}' \
--overwrite \
--verbose
```


### `build`

```
./openapisaurus build \
dev \
--providerName=datadog \
--outputDir=src \
--overwrite \
--verbose
```

### Inspect Objects

```
node tests/inspectProvider.js datadog 2>&1 | tee datadog.log
```

### Run Test Suite

from the `stackql-provider-tests` directory:

```
cd ../stackql-provider-tests
sh test-provider.sh \
datadog \
false \
/mnt/c/LocalGitRepos/stackql/openapisaurus \
true
```
