export const servicesMap = {}

export const resourcesMap = {}

export const stackqlMethodNameMap = {
    applications: {
        "applications.application.ListApplication": "list_application",
        "applications.application.CreateApplication": "create_application",
        "applications.application.GetApplication": "get_application",
        "applications.application.UpdateApplication": "update_application",
        "applications.application.DeleteApplication": "delete_application",
        "applications.application.GetApplicationByAppId": "get_application_by_app_id",
        "applications.application.UpdateApplicationByAppId": "update_application_by_app_id",
        "applications.application.DeleteApplicationByAppId": "delete_application_by_app_id",
        "applications.application.GetApplicationByUniqueName": "get_application_by_unique_name",
        "applications.application.UpdateApplicationByUniqueName": "update_application_by_unique_name",
        "applications.application.DeleteApplicationByUniqueName": "delete_application_by_unique_name",
        "applications.ListFederatedIdentityCredentials": "list_federated_identity_credentials",
        "applications.CreateFederatedIdentityCredentials": "create_federated_identity_credentials",
        "applications.GetFederatedIdentityCredentials": "get_federated_identity_credentials",
        "applications.UpdateFederatedIdentityCredentials": "update_federated_identity_credentials",
        "applications.DeleteFederatedIdentityCredentials": "delete_federated_identity_credentials",
        "applications.federatedIdentityCredentials.GetByName": "get_by_name",
        "applications.federatedIdentityCredentials.UpdateByName": "update_by_name",
        "applications.federatedIdentityCredentials.DeleteByName": "delete_by_name"
    },
    groups: {
        "groups.group.ListGroup": "list_group",
        "groups.group.CreateGroup": "create_group",
        "groups.group.GetGroup": "get_group",
        "groups.group.UpdateGroup": "update_group",
        "groups.group.DeleteGroup": "delete_group",
        "groups.group.GetGroupByUniqueName": "get_group_by_unique_name",
        "groups.group.UpdateGroupByUniqueName": "update_group_by_unique_name",
        "groups.group.DeleteGroupByUniqueName": "delete_group_by_unique_name",
        "groups.ListAppRoleAssignments": "list_app_role_assignments",
        "groups.CreateAppRoleAssignments": "create_app_role_assignments",
        "groups.GetAppRoleAssignments": "get_app_role_assignments",
        "groups.UpdateAppRoleAssignments": "update_app_role_assignments",
        "groups.DeleteAppRoleAssignments": "delete_app_role_assignments",
        "groups.ListMembers": "list_members",
        "groups.ListOwners": "list_owners",
        "groups.ListTransitiveMembers": "list_transitive_members",
        "groups.GetTransitiveMembers": "get_transitive_member"
    },
    service_principals: {
        "servicePrincipals.servicePrincipal.ListServicePrincipal": "list_service_principal",
        "servicePrincipals.servicePrincipal.CreateServicePrincipal": "create_service_principal",
        "servicePrincipals.servicePrincipal.GetServicePrincipal": "get_service_principal",
        "servicePrincipals.servicePrincipal.UpdateServicePrincipal": "update_service_principal",
        "servicePrincipals.servicePrincipal.DeleteServicePrincipal": "delete_service_principal",
        "servicePrincipals.servicePrincipal.GetServicePrincipalByAppId": "get_service_principal_by_app_id",
        "servicePrincipals.servicePrincipal.UpdateServicePrincipalByAppId": "update_service_principal_by_app_id",
        "servicePrincipals.servicePrincipal.DeleteServicePrincipalByAppId": "delete_service_principal_by_app_id",
        "servicePrincipals.ListAppManagementPolicies": "list_app_management_policies",
        "servicePrincipals.GetAppManagementPolicies": "get_app_management_policy",
        "servicePrincipals.ListAppRoleAssignments": "list_app_role_assignments",
        "servicePrincipals.CreateAppRoleAssignments": "create_app_role_assignments",
        "servicePrincipals.GetAppRoleAssignments": "get_app_role_assignments",
        "servicePrincipals.UpdateAppRoleAssignments": "update_app_role_assignments",
        "servicePrincipals.DeleteAppRoleAssignments": "delete_app_role_assignments",
        "servicePrincipals.ListFederatedIdentityCredentials": "list_federated_identity_credentials",
        "servicePrincipals.CreateFederatedIdentityCredentials": "create_federated_identity_credentials",
        "servicePrincipals.GetFederatedIdentityCredentials": "get_federated_identity_credentials",
        "servicePrincipals.UpdateFederatedIdentityCredentials": "update_federated_identity_credentials",
        "servicePrincipals.DeleteFederatedIdentityCredentials": "delete_federated_identity_credentials",
        "servicePrincipals.federatedIdentityCredentials.GetByName": "get_by_name",
        "servicePrincipals.federatedIdentityCredentials.UpdateByName": "update_by_name",
        "servicePrincipals.federatedIdentityCredentials.DeleteByName": "delete_by_name",
        "servicePrincipals.ListOauth2PermissionGrants": "list_oauth2_permission_grants",
        "servicePrincipals.GetOauth2PermissionGrants": "get_oauth2_permission_grant"
    },
    users: {
        "users.user.ListUser": "list_user",
        "users.user.CreateUser": "create_user",
        "users.user.GetUser": "get_user",
        "users.user.UpdateUser": "update_user",
        "users.user.DeleteUser": "delete_user",
        "users.ListAppRoleAssignments": "list_app_role_assignments",
        "users.CreateAppRoleAssignments": "create_app_role_assignments",
        "users.GetAppRoleAssignments": "get_app_role_assignments",
        "users.UpdateAppRoleAssignments": "update_app_role_assignments",
        "users.DeleteAppRoleAssignments": "delete_app_role_assignments",
        "users.authentication.ListMethods": "list_methods",
        "users.authentication.CreateMethods": "create_methods",
        "users.authentication.GetMethods": "get_methods",
        "users.authentication.UpdateMethods": "update_methods",
        "users.user.authentication.methods.authenticationMethod.resetPassword": "reset_password",
        "users.authentication.ListMicrosoftAuthenticatorMethods": "list_microsoft_authenticator_methods",
        "users.authentication.GetMicrosoftAuthenticatorMethods": "get_microsoft_authenticator_methods",
        "users.authentication.DeleteMicrosoftAuthenticatorMethods": "delete_microsoft_authenticator_methods",
        "users.authentication.microsoftAuthenticatorMethods.GetDevice": "get_device",
        "users.authentication.ListPasswordMethods": "list_password_methods",
        "users.authentication.CreatePasswordMethods": "create_password_methods",
        "users.authentication.GetPasswordMethods": "get_password_methods",
        "users.ListManagedAppRegistrations": "list_managed_app_registrations",
        "users.GetManagedAppRegistrations": "get_managed_app_registrations",
        "users.ListManagedDevices": "list_managed_devices",
        "users.CreateManagedDevices": "create_managed_devices",
        "users.GetManagedDevices": "get_managed_devices",
        "users.UpdateManagedDevices": "update_managed_devices",
        "users.DeleteManagedDevices": "delete_managed_devices",
        "users.ListOauth2PermissionGrants": "list_oauth2_permission_grants",
        "users.GetOauth2PermissionGrants": "get_oauth2_permission_grants"
    }
}

export const objectKeysAndSqlVerbsMap = {
    applications: {
        applications: {
            list_application: { objectKey: "$.value" }
        },
        federated_identity_credentials: {
            list_federated_identity_credentials: { objectKey: "$.value" }
        }
    },
    groups: {
        app_role_assignments: {
            list_app_role_assignments: { objectKey: "$.value" }
        },
        members: {
            list_members: { objectKey: "$.value" }
        },
        owners: {
            list_owners: { objectKey: "$.value" }
        },
        transitive_members: {
            list_transitive_members: { objectKey: "$.value" }
        }
    },
    service_principals: {
        service_principals: {
            list_service_principal: { objectKey: "$.value" }
        },
        app_management_policies: {
            list_app_management_policies: { objectKey: "$.value" }
        },
        app_role_assignments: {
            list_app_role_assignments: { objectKey: "$.value" }
        },
        federated_identity_credentials: {
            list_federated_identity_credentials: { objectKey: "$.value" }
        },
        oauth2_permission_grants: {
            list_oauth2_permission_grants: { objectKey: "$.value" }
        }
    },
    users: {
        users: {
            list_user: { objectKey: "$.value" }
        },
        app_role_assignments: {
            list_app_role_assignments: { objectKey: "$.value" }
        },
        authentication_methods: {
            list_methods: { objectKey: "$.value" }
        },
        ms_authenticator_methods: {
            list_microsoft_authenticator_methods: { objectKey: "$.value" }
        },
        password_methods: {
            list_password_methods: { objectKey: "$.value" }
        },
        managed_app_registrations: {
            list_managed_app_registrations: { objectKey: "$.value" }
        },
        managed_devices: {
            list_managed_devices: { objectKey: "$.value" }
        },
        oauth2_permission_grants: {
            list_oauth2_permission_grants: { objectKey: "$.value" }
        }
    }
}
