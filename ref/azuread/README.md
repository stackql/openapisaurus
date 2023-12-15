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

<!-- ```
./openapisaurus dev \
dev \
--providerName=azuread \
--providerConfig='{ "auth": { "type": "azure_default" }}' \
--resDiscriminator='"tags"[0] | (input) => input.split(".")[1]' \
--overwrite \
--verbose > aad_dev.log
``` -->

```
./openapisaurus dev \
dev \
--providerName=azuread \
--providerConfig='{ "auth": { "type": "azure_default" }}' \
--resDiscriminator='"operationId","tags"[0] | (operationId, tag) => {
    // List of excluded tags
    const excludedTags = [
        "groups.drive",
        "groups.team",
        "groups.site",
        "groups.conversationThread",
        "groups.onenote",
        "groups.event",
        "groups.conversation",
        "groups.Functions",
        "groups.calendar",
        "groups.profilePhoto",
        "groups.plannerGroup",
        "users.calendar",
        "users.chat",
        "users.contact",
        "users.drive",
        "users.site",
        "users.team",
        "users.message",
        "users.onenote",
        "users.person",
        "users.presence",
        "users.outlookUser",
        "users.profilePhoto",
        "users.plannerUser",
        "users.todo",
        "users.calendarGroup",
        "users.userTeamwork",
        "users.onlineMeeting",
        "users.inferenceClassification",
        "users.officeGraphInsights",
        "users.employeeExperienceUser",
        "users.contactFolder",
        "users.Functions",
        "users.Actions",
    ];

    // Check if the tag is in the excluded list
    if (excludedTags.includes(tag)) {
        return "skip_this_resource";
    }

    const splitCamelCase = (token) => {
        return token
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .toLowerCase()
            .split(" ")
            .filter(t => t);
    };

    const verbs = ["Get", "List", "Delete", "Create", "Add", "Check", "Update", "Remove", "Replace", "Validate", "Set", "Unset", "Acquire"];
    const verbRegex = new RegExp(`^(${verbs.join("|")})`, "i");

    let tokens = operationId.split(".");
    tokens.shift(); // Remove the service token

    tokens = tokens.filter(token => !token.startsWith("GetCount"));

    let processedTokens = tokens.map((token) => {
        if(token.toLowerCase() === "lists" || token.startsWith("createdBy")){
            return token;
        }
        return splitCamelCase(token.replace(verbRegex, ""));
    }).reduce((acc, val) => acc.concat(val), []);

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
