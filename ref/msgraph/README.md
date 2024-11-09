# entra

Download spec from [here](https://github.com/microsoftgraph/msgraph-metadata/blob/master/openapi/v1.0/openapi.yaml)

clean up the spec dirs and files

```
rm -rf dev/entra/*
```

# split

```
./openapisaurus split \
  ref/msgraph/openapi.yaml \
  --providerName=entra \
  --svcdiscriminator='(tags[0]) | (tag) => {
    const parts = tag.split(".");
    const firstPart = parts[0];
    return ["users", "groups", "applications", "servicePrincipals"].includes(firstPart) ? firstPart : "skip";
  }' \
  --outputDir=dev
```

# hack fix

# Add microsoft.graph.timeZoneStandard schema to components.schemas
yq -y '.components.schemas."microsoft.graph.timeZoneStandard" = {"title": "timeZoneStandard", "enum": ["windows", "iana"], "type": "string"}' "dev/entra/v00.00.00000/services/users/users.yaml" > temp.yaml && mv temp.yaml "dev/entra/v00.00.00000/services/users/users.yaml"

# dev

```
./openapisaurus dev \
dev \
--providerName=entra \
--providerConfig='{ "auth": { "type": "azure_default" }}' \
--resDiscriminator='(operationId) | (operationId) => {
    const operationMap = {
        "applications.application.ListApplication": "applications",
        "applications.application.CreateApplication": "applications",
        "applications.application.GetApplication": "applications",
        "applications.application.UpdateApplication": "applications",
        "applications.application.DeleteApplication": "applications",
        "applications.application.GetApplicationByAppId": "applications",
        "applications.application.UpdateApplicationByAppId": "applications",
        "applications.application.DeleteApplicationByAppId": "applications",
        "applications.application.GetApplicationByUniqueName": "applications",
        "applications.application.UpdateApplicationByUniqueName": "applications",
        "applications.application.DeleteApplicationByUniqueName": "applications",
        "applications.ListFederatedIdentityCredentials": "federated_identity_credentials",
        "applications.CreateFederatedIdentityCredentials": "federated_identity_credentials",
        "applications.GetFederatedIdentityCredentials": "federated_identity_credentials",
        "applications.UpdateFederatedIdentityCredentials": "federated_identity_credentials",
        "applications.DeleteFederatedIdentityCredentials": "federated_identity_credentials",
        "applications.federatedIdentityCredentials.GetByName": "federated_identity_credentials",
        "applications.federatedIdentityCredentials.UpdateByName": "federated_identity_credentials",
        "applications.federatedIdentityCredentials.DeleteByName": "federated_identity_credentials",
        "groups.group.ListGroup": "groups",
        "groups.group.CreateGroup": "groups",
        "groups.group.GetGroup": "groups",
        "groups.group.UpdateGroup": "groups",
        "groups.group.DeleteGroup": "groups",
        "groups.group.GetGroupByUniqueName": "groups",
        "groups.group.UpdateGroupByUniqueName": "groups",
        "groups.group.DeleteGroupByUniqueName": "groups",
        "groups.ListAppRoleAssignments": "app_role_assignments",
        "groups.CreateAppRoleAssignments": "app_role_assignments",
        "groups.GetAppRoleAssignments": "app_role_assignments",
        "groups.UpdateAppRoleAssignments": "app_role_assignments",
        "groups.DeleteAppRoleAssignments": "app_role_assignments",
        "groups.ListMembers": "members",
        "groups.ListOwners": "owners",
        "groups.ListTransitiveMembers": "transitive_members",
        "groups.GetTransitiveMembers": "transitive_members",
        "servicePrincipals.servicePrincipal.ListServicePrincipal": "service_principals",
        "servicePrincipals.servicePrincipal.CreateServicePrincipal": "service_principals",
        "servicePrincipals.servicePrincipal.GetServicePrincipal": "service_principals",
        "servicePrincipals.servicePrincipal.UpdateServicePrincipal": "service_principals",
        "servicePrincipals.servicePrincipal.DeleteServicePrincipal": "service_principals",
        "servicePrincipals.servicePrincipal.GetServicePrincipalByAppId": "service_principals",
        "servicePrincipals.servicePrincipal.UpdateServicePrincipalByAppId": "service_principals",
        "servicePrincipals.servicePrincipal.DeleteServicePrincipalByAppId": "service_principals",
        "servicePrincipals.ListAppManagementPolicies": "app_management_policies",
        "servicePrincipals.GetAppManagementPolicies": "app_management_policies",
        "servicePrincipals.ListAppRoleAssignments": "app_role_assignments",
        "servicePrincipals.CreateAppRoleAssignments": "app_role_assignments",
        "servicePrincipals.GetAppRoleAssignments": "app_role_assignments",
        "servicePrincipals.UpdateAppRoleAssignments": "app_role_assignments",
        "servicePrincipals.DeleteAppRoleAssignments": "app_role_assignments",
        "servicePrincipals.ListFederatedIdentityCredentials": "federated_identity_credentials",
        "servicePrincipals.CreateFederatedIdentityCredentials": "federated_identity_credentials",
        "servicePrincipals.GetFederatedIdentityCredentials": "federated_identity_credentials",
        "servicePrincipals.UpdateFederatedIdentityCredentials": "federated_identity_credentials",
        "servicePrincipals.DeleteFederatedIdentityCredentials": "federated_identity_credentials",
        "servicePrincipals.federatedIdentityCredentials.GetByName": "federated_identity_credentials",
        "servicePrincipals.federatedIdentityCredentials.UpdateByName": "federated_identity_credentials",
        "servicePrincipals.federatedIdentityCredentials.DeleteByName": "federated_identity_credentials",
        "servicePrincipals.ListOauth2PermissionGrants": "oauth2_permission_grants",
        "servicePrincipals.GetOauth2PermissionGrants": "oauth2_permission_grants",
        "users.user.ListUser": "users",
        "users.user.CreateUser": "users",
        "users.user.GetUser": "users",
        "users.user.UpdateUser": "users",
        "users.user.DeleteUser": "users",
        "users.ListAppRoleAssignments": "app_role_assignments",
        "users.CreateAppRoleAssignments": "app_role_assignments",
        "users.GetAppRoleAssignments": "app_role_assignments",
        "users.UpdateAppRoleAssignments": "app_role_assignments",
        "users.DeleteAppRoleAssignments": "app_role_assignments",
        "users.authentication.ListMethods": "authentication_methods",
        "users.authentication.CreateMethods": "authentication_methods",
        "users.authentication.GetMethods": "authentication_methods",
        "users.authentication.UpdateMethods": "authentication_methods",
        "users.user.authentication.methods.authenticationMethod.resetPassword": "authentication_methods",
        "users.authentication.ListMicrosoftAuthenticatorMethods": "ms_authenticator_methods",
        "users.authentication.GetMicrosoftAuthenticatorMethods": "ms_authenticator_methods",
        "users.authentication.DeleteMicrosoftAuthenticatorMethods": "ms_authenticator_methods",
        "users.authentication.ListPasswordMethods": "password_methods",
        "users.authentication.CreatePasswordMethods": "password_methods",
        "users.authentication.GetPasswordMethods": "password_methods",
        "users.ListManagedAppRegistrations": "managed_app_registrations",
        "users.GetManagedAppRegistrations": "managed_app_registrations",
        "users.ListManagedDevices": "managed_devices",
        "users.CreateManagedDevices": "managed_devices",
        "users.GetManagedDevices": "managed_devices",
        "users.UpdateManagedDevices": "managed_devices",
        "users.DeleteManagedDevices": "managed_devices",
        "users.ListOauth2PermissionGrants": "oauth2_permission_grants",
        "users.GetOauth2PermissionGrants": "oauth2_permission_grants"
    };

    return operationMap[operationId] || "skip_this_resource";
}' \
--overwrite
```

### `build`

```
rm -rf src/entra/*
./openapisaurus build \
dev \
--providerName=entra \
--outputDir=src \
--overwrite \
--verbose
```

### Run Test Suite

from the `stackql-provider-tests` directory:

```
cd ../../stackql-provider-tests
sh test-provider.sh \
entra \
false \
/mnt/c/LocalGitRepos/stackql/openapi-conversion/openapisaurus \
true
```

### Test locally

```
export ENTRA_ID_ACCESS_TOKEN=$(az account get-access-token --resource-type ms-graph --query accessToken -o tsv)
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```
