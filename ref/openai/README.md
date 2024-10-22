# `openai`

obtain a spec from [here](https://github.com/openai/openai-openapi/blob/master/openapi.yaml)

clean up the spec dirs and files

```
rm -rf dev/openai/*
```

### `split`

```
./openapisaurus split \
ref/openai/openapi.yaml \
--providerName=openai \
--svcdiscriminator='["tags"][0]' \
--outputDir=dev
```

### `dev`

```
./openapisaurus dev \
dev \
--providerName=openai \
--providerConfig='{ "auth": { "type": "bearer", "credentialsenvvar": "OPENAI_API_KEY" }}' \
--resDiscriminator='"operationId" | (operationId) => {
    const splitCamelCaseOrHyphen = (token) => {
        return token
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/-/g, " ")
            .toLowerCase()
            .split(" ")
            .filter(t => t);
    };

    // Split operationId based on camel case or hyphen and disregard the verb
    const firstCapitalOrHyphenIndex = operationId.search(/[A-Z]|-/);
    if (firstCapitalOrHyphenIndex === -1) {
        return "unknown_resource";
    }

    // Extract the resource part of the operationId
    const rest = operationId.slice(firstCapitalOrHyphenIndex);

    // Convert the rest to tokens for resource naming
    const resourceTokens = splitCamelCaseOrHyphen(rest);
    const resourceName = resourceTokens.join("_");

    return resourceName;
}' \
--overwrite \
--verbose > openai_dev.log

```

### `build`

```
rm -rf src/openai/*
./openapisaurus build \
dev \
--providerName=openai \
--outputDir=src \
--overwrite \
--verbose > openai_build.log
```

### Test locally

```
export OPENAI_API_KEY=sk-proj-xxx
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```

```
select * from openai.models.models;

select choices from openai.chat.completions
where data__model = 'gpt-4o'
and data__messages = '[{"role": "system", "content": "what is stackql?"}]';
```

### Run Test Suite

from the `stackql-provider-tests` directory:

```
cd ../../stackql-provider-tests
sh test-provider.sh \
openai \
false \
/mnt/c/LocalGitRepos/stackql/openapi-conversion/openapisaurus \
true
```