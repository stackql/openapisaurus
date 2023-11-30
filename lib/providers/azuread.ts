export const servicesMap = {
    agreements: 'skip',
    agreement_acceptances: 'skip',
    app_catalogs: 'skip',
    application_templates: 'skip',
    audit_logs: 'skip',
    chats: 'skip',
    communications: 'skip',
    compliance: 'skip',
    connections: 'skip',
    contacts: 'skip',
    contracts: 'skip',
    data_policy_operations: 'skip',
    drives: 'skip',
    education: 'skip',
    employee_experience: 'skip',
    filter_operators: 'skip',
    functions: 'skip',
    information_protection: 'skip',
    invitations: 'skip',
    me: 'skip',
    places: 'skip',
    planner: 'skip',
    print: 'skip',
    privacy: 'skip',
    reports: 'skip',
    search: 'skip',
    security: 'skip',
    shares: 'skip',
    sites: 'skip',
    solutions: 'skip',
    admin: 'skip',
    // applications: 'skip',
    authentication_method_configurations: 'skip',
    authentication_methods_policy: 'skip',
    certificate_based_auth_configuration: 'skip',
    device_app_management: 'skip',
    device_management: 'skip',
    devices: 'skip',
    directory: 'skip',
    directory_objects: 'skip',
    directory_role_templates: 'skip',
    directory_roles: 'skip',
    domain_dns_records: 'skip',
    domains: 'skip',
    external: 'skip',
    group_lifecycle_policies: 'skip',
    group_setting_templates: 'skip',
    group_settings: 'skip',
    // groups: 'skip',
    identity: 'skip',
    identity_governance: 'skip',
    identity_protection: 'skip',
    identity_providers: 'skip',
    oauth2_permission_grants: 'skip',
    organization: 'skip',
    permission_grants: 'skip',
    policies: 'skip',
    role_management: 'skip',
    schema_extensions: 'skip',
    scoped_role_memberships: 'skip',
    // service_principals: 'skip',
    subscribed_skus: 'skip',
    subscriptions: 'skip',
    teams: 'skip',
    teams_templates: 'skip',
    teamwork: 'skip',
    tenant_relationships: 'skip',
    // users: 'skip',    
}

export const resourcesMap = {
    applications: {
        nameMap: {},
        opIdMap: {
            'applications.ListOwners': 'directory_object_owners',
            'applications.synchronization.ListJobs': 'synchronization_jobs',
            'applications.synchronization.GetJobs': 'synchronization_jobs',
            'applications.synchronization.CreateJobs': 'synchronization_jobs',
            'applications.synchronization.DeleteJobs': 'synchronization_jobs',
            'applications.synchronization.jobs.GetSchema': 'synchronization_schemas',
            'applications.synchronization.templates.GetSchema': 'synchronization_schemas',
            'applications.synchronization.jobs.DeleteSchema': 'synchronization_schemas',
            'applications.synchronization.templates.DeleteSchema': 'synchronization_schemas',
            'applications.synchronization.jobs.schema.ListDirectories': 'synchronization_dirs',
            'applications.synchronization.jobs.schema.GetDirectories': 'synchronization_dirs',
            'applications.synchronization.jobs.schema.CreateDirectories': 'synchronization_dirs',
            'applications.synchronization.jobs.schema.DeleteDirectories': 'synchronization_dirs',
            'applications.synchronization.templates.schema.ListDirectories': 'synchronization_template_dirs',
            'applications.synchronization.templates.schema.GetDirectories': 'synchronization_template_dirs',
            'applications.synchronization.templates.schema.CreateDirectories': 'synchronization_template_dirs',
            'applications.synchronization.templates.schema.DeleteDirectories': 'synchronization_template_dirs',
            'applications.synchronization.ListTemplates': 'synchronization_templates',
            'applications.synchronization.GetTemplates': 'synchronization_templates',
            'applications.synchronization.CreateTemplates': 'synchronization_templates',
            'applications.synchronization.DeleteTemplates': 'synchronization_templates',
        },
    },
    groups: {
        nameMap: {},
        opIdMap: {
            'groups.group.onenote.notebooks.getRecentNotebooks': 'recent_notebooks',
            'groups.group.sites.site.onenote.notebooks.getRecentNotebooks': 'recent_notebooks',
            'groups.group.sites.site.contentTypes.getCompatibleHubContentTypes': 'compatible_hub_content_types',
            'groups.group.sites.site.lists.list.contentTypes.getCompatibleHubContentTypes': 'compatible_hub_content_types',
            'groups.group.sites.site.getApplicableContentTypesForList': 'applicable_content_types',
            'groups.group.sites.site.lists.list.items.listItem.getActivitiesByInterval-4c35': 'item_activities',
            'groups.group.sites.site.lists.list.items.listItem.getActivitiesByInterval-ad27': 'item_activities',
            'groups.group.sites.site.getActivitiesByInterval-4c35': 'item_activities',
            'groups.group.sites.site.getActivitiesByInterval-ad27': 'item_activities',
            'groups.group.sites.site.getByPath': 'sites',
            'groups.group.sites.getAllSites': 'sites',
            'groups.group.team.channels.getAllMessages': 'messages',
            'groups.ListAcceptedSenders': 'accepted_senders',
            'groups.ListMembers': 'members',
            'groups.ListMembersWithLicenseErrors': 'members_with_license_errors',
            'groups.GetMembersWithLicenseErrors': 'members_with_license_errors',
            'groups.ListTransitiveMembers': 'transitive_members',
            'groups.GetTransitiveMembers': 'transitive_members',
            'groups.ListOwners': 'owners',
            'groups.ListRejectedSenders': 'rejected_senders',
            'groups.GetCreatedOnBehalfOf': 'created_on_behalf_of',
            'groups.ListMemberOf': 'member_of',
            'groups.GetMemberOf': 'member_of',
            'groups.ListTransitiveMemberOf': 'transitive_member_of',
            'groups.GetTransitiveMemberOf': 'transitive_member_of',            
        },
    },
}

export const methodNameTransforms = {
    allServices: (operationId) => {
        // Example transform function
        return operationId.split('.').pop();
    },
}

export const methodNameMap = {}

export const objectKeysAndSqlVerbs = {
    applications: {
        application: {
            get_logo: {
                sqlVerb: 'exec',
            },
        },
    },
    groups: {
        actions: {
            get_available_extension_properties: {
                sqlVerb: 'exec',
            },
            get_by_ids: {
                sqlVerb: 'exec',
            },
            validate_properties: {
                sqlVerb: 'exec',
            },
            create_upload_session: {
                sqlVerb: 'exec',
            },
            accept: {
                sqlVerb: 'exec',
            },
            cancel: {
                sqlVerb: 'exec',
            },
            decline: {
                sqlVerb: 'exec',
            },
            dismiss_reminder: {
                sqlVerb: 'exec',
            },
            forward: {
                sqlVerb: 'exec',
            },
            snooze_reminder: {
                sqlVerb: 'exec',
            },
            tentatively_accept: {
                sqlVerb: 'exec',
            },
            get_schedule: {
                sqlVerb: 'exec',
            },
            reply: {
                sqlVerb: 'exec',
            },
            add_group: {
                sqlVerb: 'exec',
            },
            remove_group: {
                sqlVerb: 'exec',
            },
            add_favorite: {
                sqlVerb: 'exec',
            },
            assign_license: {
                sqlVerb: 'exec',
            },
            check_granted_permissions_for_app: {
                sqlVerb: 'exec',
            },
            check_member_groups: {
                sqlVerb: 'exec',
            },
            check_member_objects: {
                sqlVerb: 'exec',
            },
            get_member_groups: {
                sqlVerb: 'exec',
            },
            get_member_objects: {
                sqlVerb: 'exec',
            },
            remove_favorite: {
                sqlVerb: 'exec',
            },
            renew: {
                sqlVerb: 'exec',
            },
            reset_unseen_count: {
                sqlVerb: 'exec',
            },
            restore: {
                sqlVerb: 'exec',
            },
            retry_service_provisioning: {
                sqlVerb: 'exec',
            },
            subscribe_by_mail: {
                sqlVerb: 'exec',
            },
            unsubscribe_by_mail: {
                sqlVerb: 'exec',
            },
            copy_notebook: {
                sqlVerb: 'exec',
            },
            copy_to_notebook: {
                sqlVerb: 'exec',
            },
            copy_to_section_group: {
                sqlVerb: 'exec',
            },
            copy_to_section: {
                sqlVerb: 'exec',
            },
            onenote_patch_content: {
                sqlVerb: 'exec',
            },
            get_notebook_from_web_url: {
                sqlVerb: 'exec',
            },
            associate_with_hub_sites: {
                sqlVerb: 'exec',
            },
            copy_to_default_content_location: {
                sqlVerb: 'exec',
            },
            publish: {
                sqlVerb: 'exec',
            },
            unpublish: {
                sqlVerb: 'exec',
            },
            add_copy: {
                sqlVerb: 'exec',
            },
            add_copy_from_content_type_hub: {
                sqlVerb: 'exec',
            },
            restore_version: {
                sqlVerb: 'exec',
            },
            reauthorize: {
                sqlVerb: 'exec',
            },
            grant: {
                sqlVerb: 'exec',
            },
            add: {
                sqlVerb: 'exec',
            },
            remove: {
                sqlVerb: 'exec',
            },
            set_reaction: {
                sqlVerb: 'exec',
            },
            soft_delete: {
                sqlVerb: 'exec',
            },
            undo_soft_delete: {
                sqlVerb: 'exec',
            },
            unset_reaction: {
                sqlVerb: 'exec',
            },
            complete_migration: {
                sqlVerb: 'exec',
            },
            provision_email: {
                sqlVerb: 'exec',
            },
            remove_email: {
                sqlVerb: 'exec',
            },
            upgrade: {
                sqlVerb: 'exec',
            },
            archive: {
                sqlVerb: 'exec',
            },
            clone: {
                sqlVerb: 'exec',
            },
            send_activity_notification: {
                sqlVerb: 'exec',
            },
            unarchive: {
                sqlVerb: 'exec',
            },
            share: {
                sqlVerb: 'exec',
            },
        },
    },
}



