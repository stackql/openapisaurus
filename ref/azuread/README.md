# `azuread`

obtain a spec from [here](https://github.com/microsoftgraph/msgraph-metadata/blob/master/openapi/v1.0/openapi.yaml)

clean up the spec dirs and files

```
rm -f ref/azuread/openapi-formatted.yaml
rm -rf dev/azuread
rm -rf src/azuread
```

### `format`

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

```
./openapisaurus dev \
dev \
--providerName=azuread \
--providerConfig='{ "auth": { "type": "azure_default" }}' \
--resDiscriminator='"operationId" | (input) => {
    const splitCamelCase = (token) => {
        return token
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .toLowerCase()
            .split(" ")
            .filter(t => t); // Filter out any empty strings resulting from split
    };

    const verbs = ["Get", "List", "Delete", "Create"];
    const verbRegex = new RegExp(`^(${verbs.join("|")})`, "i");

    let tokens = input.split(".");
    tokens.shift(); // Remove the service token

    // Filter out tokens that start with "GetCount"
    tokens = tokens.filter(token => !token.startsWith("GetCount"));

    // Process the remaining tokens to remove verbs, split camelCase, flatten the array, and de-duplicate
    let processedTokens = tokens.map((token) => {
        // Remove the verb if its at the beginning of the token
        return splitCamelCase(token.replace(verbRegex, ""));
    }).reduce((acc, val) => acc.concat(val), []); // Flatten the array

    // Deduplicate tokens by only adding them if they are different from the previous one
    processedTokens = processedTokens.reduce((acc, token) => {
        if (!acc.length || acc[acc.length - 1] !== token) {
            acc.push(token);
        }
        return acc;
    }, []);

    return processedTokens.join("_");
}' \
--overwrite \
--verbose
```

### Check Resource Names, Make Exceptions

```
python3 view_resources_and_methods.py dev/azuread/v00.00.00000/services/applications/applications-resources.yaml applications.csv
python3 view_resources_and_methods.py dev/azuread/v00.00.00000/services/users/users-resources.yaml users.csv
python3 view_resources_and_methods.py dev/azuread/v00.00.00000/services/groups/groups-resources.yaml groups.csv
python3 view_resources_and_methods.py dev/azuread/v00.00.00000/services/service_principals/service_principals-resources.yaml service_principals.csv
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
