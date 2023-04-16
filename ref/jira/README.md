## `jira` Provider Dev

### `split`

```
./openapisaurus split \
ref/jira/jira.yaml \
--providerName=jira \
--svcdiscriminator='["tags"][0]' \
--outputDir=dev \
--overwrite
```

### `dev`

```
./openapisaurus dev \
dev \
--providerName=jira \
--providerConfig='{ "auth": { "type": "bearer", "credentialsenvvar": "JIRA_TOKEN" }}' \
--overwrite \
--verbose
```

### `build`

```
./openapisaurus build \
dev \
--providerName=jira \
--outputDir=src \
--overwrite \
--verbose
```



```bash
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
export JIRA_CREDS=xxx
AUTH_STR='{ "jira": { "type": "basic", "credentialsenvvar": "JIRA_CREDS" } }'
./stackql shell --auth="${AUTH_STR}" --registry="${REG_STR}"
```
