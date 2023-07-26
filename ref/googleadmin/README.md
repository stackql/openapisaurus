```
servicesdir=dev/googleadmin/v00.00.00000/services/directory
mkdir -p $servicesdir
```

copy directory.yaml from `google-discovery-to-openapi` project to `servicesdir` directory

### `dev`

```
./openapisaurus dev \
dev \
--providerName=googleadmin \
--providerConfig='{ "auth": { "credentialsenvvar": "GOOGLE_CREDENTIALS", "type": "service_account", "scopes": ["https://www.googleapis.com/auth/cloud-platform","https://www.googleapis.com/auth/admin.directory.user.readonly"] }}' \
--overwrite \
--verbose
```

### `build`

```
./openapisaurus build \
dev \
--providerName=googleadmin \
--outputDir=src \
--overwrite \
--verbose
```

### Run Test Suite

from the `stackql-provider-tests` directory:

```
cd ../stackql-provider-tests
sh test-provider.sh \
googleadmin \
false \
/mnt/c/LocalGitRepos/stackql/openapisaurus \
true
```

### Inspect

```
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```

### Setup Instructions

For an overview of service accounts and domain wide delegation, see https://developers.google.com/workspace/guides/create-credentials#create_credentials_for_a_service_account

1. Create a Service Account in the Google Cloud Console:

- Create a Google Cloud service account (see xxx)
- Download the JSON key file for the service account (see xxx)
- From the Google Cloud Console, locate and select the service account created, go to "Details" > "Advanced settings" > "Domain-wide delegation". 
- Copy the "Client ID" of the service account to the clipboard.
- Click the "VIEW GOOGLE WORKSPACE ADMIN CONSOLE" link. This will open the Google Workspace Admin Console in a new tab.

2. Delegate Domain-Wide Authority to your Service Account:

- From the Google Workspace Admin Console, go to "Security" > "Access and data control" > "API Controls" > "Domain-wide delegation" > "MANAGE DOMAIN-WIDE DELEGATION".
- Click "Add new" and paste the "Client ID" of the service account copied to the clipboard in step 1.
- In the "OAuth scopes" field, enter the following scopes: `https://www.googleapis.com/auth/cloud-platform` and `https://www.googleapis.com/auth/admin.directory.user.readonly`
- Click "Authorise".

3. Assign the Admin role to your Service Account:

https://developers.google.com/workspace/guides/create-credentials#assign_a_role_to_a_service_account

Admin console, Account > Admin roles > User Management > Admins > Assign service accounts

add the email to the service account created and click Assign Role

4. Enable the Admin SDK API for your project:

- From the Google Cloud Console, go to "APIs & Services" > "Library".
- Search for "Admin SDK API" and click on it.
- Click "Enable".

5. Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the path of the JSON key file downloaded in step 1.

```
export GOOGLE_CREDENTIALS=$(cat creds/stackql-security-reviewer.json)
./stackql shell
```
