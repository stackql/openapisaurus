### `dev`

```
./openapisaurus dev \
dev \
--providerName=googleapis.com \
--providerConfig='{ "auth": { "credentialsenvvar": "GOOGLE_CREDENTIALS", "type": "service_account" }}' \
--overwrite \
--verbose
```


### `build`

```
./openapisaurus build \
dev \
--providerName=googleapis.com \
--outputDir=src \
--overwrite \
--verbose
```

### Run Test Suite

from the `stackql-provider-tests` directory:

```
cd ../stackql-provider-tests
sh test-provider.sh \
google \
false \
/mnt/c/LocalGitRepos/stackql/openapisaurus \
true > ../openapisaurus/google-test-results.txt
```

### Inspect

```
export GOOGLE_CREDENTIALS=$(cat creds/stackql-security-reviewer.json)
export GOOGLE_CREDENTIALS=$(cat creds/p-security-reviewer.json)
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
SELECT id, name, status FROM google.compute.instances WHERE project = 'stackql-demo' AND zone = 'australia-southeast1-a';
```

export DEV_REG='{"url": "https://registry-dev.stackql.app/providers"}'
./stackql --registry="${DEV_REG}" shell


# poopulate creds var
$env:GOOGLE_CREDENTIALS = Get-Content -Path ".\creds\stackql-security-reviewer.json" -Raw
Write-Output $env:GOOGLE_CREDENTIALS

# specify local registry from cwd
$PROVIDER_REGISTRY_ROOT_DIR = (Get-Location).Path -replace '\\', '/'
Write-Output $PROVIDER_REGISTRY_ROOT_DIR
$REG_STR = '{"url": "file://'+ $PROVIDER_REGISTRY_ROOT_DIR +'", "localDocRoot": "'+ $PROVIDER_REGISTRY_ROOT_DIR +'", "verifyConfig": {"nopVerify": true}}'
Write-Output $REG_STR
stackql.exe shell --registry=$REG_STR

gcloud auth activate-service-account --key-file=creds/stackql-security-reviewer.json
gcloud config set account javen@stackql.io
gcloud auth revoke stackql-security-reviewer@stackql.iam.gserviceaccount.com

select * from google.cloudresourcemanager.projects where parent = 'organizations/141318256085'