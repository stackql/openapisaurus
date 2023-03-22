## split the api into services

```bash
openapi-doc-util split \
-n jira \
-v v0.0.1 \
-s path_tokens \
-o ./dev \
ref/jira/jira.yaml
```

## generate resources

```bash
openapi-doc-util provider-dev \
-n jira \
-v v0.0.1 \
-r path_tokens \
--overwrite \
./dev
```

# compile docs

```bash
openapi-doc-util provider-build \
-n jira \
-v v0.0.1 \
-o ./src \
--overwrite \
./dev
```


```bash
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
export JIRA_CREDS=$(echo -n 'javen@stackql.io:EFCOquf8zHdVurmnbL9p55EF' | base64)
AUTH_STR='{ "jira": { "type": "basic", "credentialsenvvar": "JIRA_CREDS" } }'
./stackql shell --auth="${AUTH_STR}" --registry="${REG_STR}"
```
