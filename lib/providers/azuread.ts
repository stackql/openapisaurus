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
    groups: {
        nameMap: {},
        opIdMap: {
            'groups.calendar.GetCalendarView': 'calendar_view_event',
            'groups.calendar.ListCalendarView': 'calendar_view_event',
            'groups.calendar.calendarView.ListAttachments': 'calendar_view_calender_attachments',
            'groups.calendar.calendarView.GetAttachments': 'calendar_view_calender_attachments',
            'groups.calendar.calendarView.CreateAttachments': 'calendar_view_calender_attachments',
            'groups.calendar.calendarView.DeleteAttachments': 'calendar_view_calender_attachments',            
        }
    },
    // applications: {
    //     nameMap: {},
    //     opIdMap: {
    //         'applications.GetCreatedOnBehalfOf':'created_on_behalf_of',
    //         'applications.ListOwners':'owners',
    //         'applications.synchronization.ListJobs':'synchronization_jobs',
    //         'applications.synchronization.GetJobs':'synchronization_jobs',
    //         'applications.synchronization.CreateJobs':'synchronization_jobs',
    //         'applications.synchronization.DeleteJobs':'synchronization_jobs',
    //         'applications.synchronization.jobs.GetSchema':'synchronization_jobs_schema',
    //         'applications.synchronization.jobs.DeleteSchema':'synchronization_jobs_schema',
    //         'applications.synchronization.templates.GetSchema':'synchronization_jobs_template_schema',
    //         'applications.synchronization.templates.DeleteSchema':'synchronization_jobs_template_schema',
    //         'applications.synchronization.ListTemplates':'synchronization_templates',
    //         'applications.synchronization.GetTemplates':'synchronization_templates',
    //         'applications.synchronization.CreateTemplates':'synchronization_templates',
    //         'applications.synchronization.DeleteTemplates':'synchronization_templates',
    //         'applications.synchronization.jobs.schema.ListDirectories':'synchronization_directories',
    //         'applications.synchronization.jobs.schema.GetDirectories':'synchronization_directories',
    //         'applications.synchronization.jobs.schema.CreateDirectories':'synchronization_directories',
    //         'applications.synchronization.jobs.schema.DeleteDirectories':'synchronization_directories',
    //         'applications.synchronization.templates.schema.ListDirectories':'synchronization_template_directories',
    //         'applications.synchronization.templates.schema.GetDirectories':'synchronization_template_directories',
    //         'applications.synchronization.templates.schema.CreateDirectories':'synchronization_template_directories',
    //         'applications.synchronization.templates.schema.DeleteDirectories':'synchronization_template_directories',
    //     },
    // },
    // groups: {
    //     nameMap: {},
    //     opIdMap: {
    //         'groups.ListAcceptedSenders': 'accepted_senders',
    //         'groups.calendar.CreateCalendarPermissions': 'calendar_permissions',
    //         'groups.calendar.ListCalendarPermissions': 'calendar_permissions',
    //         'groups.calendar.DeleteCalendarPermissions': 'calendar_permissions',
    //         'groups.calendar.GetCalendarPermissions': 'calendar_permissions',
    //         'groups.calendar.calendarView.CreateAttachments': 'calender_view_attachments',
    //         'groups.calendar.calendarView.ListAttachments': 'calender_view_attachments',
    //         'groups.calendar.calendarView.DeleteAttachments': 'calender_view_attachments',
    //         'groups.calendar.calendarView.GetAttachments': 'calender_view_attachments',
    //         'groups.GetCreatedOnBehalfOf': 'created_on_behalf_of',
    //         'groups.ListMemberOf': 'member_of',
    //         'groups.GetMemberOf': 'member_of',
    //         'groups.ListMembers': 'members',
    //         'groups.ListMembersWithLicenseErrors': 'members_with_license_errors',
    //         'groups.GetMembersWithLicenseErrors': 'members_with_license_errors',
    //         'groups.ListOwners': 'owners',
    //         'groups.ListRejectedSenders': 'rejected_senders',
    //         'groups.ListTransitiveMemberOf': 'transitive_member_of',
    //         'groups.GetTransitiveMemberOf': 'transitive_member_of',
    //         'groups.ListTransitiveMembers': 'transitive_members',
    //         'groups.GetTransitiveMembers': 'transitive_members',
    //         'groups.group.sites.site.contentTypes.getCompatibleHubContentTypes': 'compatible_hub_content_types',
    //         'groups.group.sites.site.lists.list.contentTypes.getCompatibleHubContentTypes': 'compatible_hub_content_types',
    //         'groups.group.onenote.notebooks.getRecentNotebooks': 'recent_notebooks',
    //         'groups.group.sites.site.onenote.notebooks.getRecentNotebooks': 'recent_notebooks',
    //         'groups.group.sites.site.getApplicableContentTypesForList': 'applicable_content_types',
    //         'groups.conversations.ListThreads': 'conversation_threads',
    //         'groups.conversations.GetThreads': 'conversation_threads',
    //         'groups.conversations.CreateThreads': 'conversation_threads',
    //         'groups.conversations.DeleteThreads': 'conversation_threads',
    //         'groups.conversations.threads.ListPosts': 'conversation_posts',
    //         'groups.conversations.threads.GetPosts': 'conversation_posts',
    //         'groups.conversations.threads.posts.GetInReplyTo': 'conversation_reply_posts',
    //         'groups.conversations.threads.posts.ListAttachments': 'conversation_attachments',
    //         'groups.conversations.threads.posts.GetAttachments': 'conversation_attachments',
    //         'groups.conversations.threads.posts.CreateAttachments': 'conversation_attachments',
    //         'groups.conversations.threads.posts.DeleteAttachments': 'conversation_attachments',
    //         'groups.conversations.threads.posts.inReplyTo.ListAttachments': 'conversation_reply_attachments',
    //         'groups.conversations.threads.posts.inReplyTo.GetAttachments': 'conversation_reply_attachments',
    //         'groups.conversations.threads.posts.inReplyTo.CreateAttachments': 'conversation_reply_attachments',
    //         'groups.conversations.threads.posts.inReplyTo.DeleteAttachments': 'conversation_reply_attachments',
    //         'groups.conversations.threads.posts.ListExtensions': 'conversation_extensions',
    //         'groups.conversations.threads.posts.GetExtensions': 'conversation_extensions',
    //         'groups.conversations.threads.posts.CreateExtensions': 'conversation_extensions',
    //         'groups.conversations.threads.posts.DeleteExtensions': 'conversation_extensions',
    //         'groups.conversations.threads.posts.inReplyTo.ListExtensions': 'conversation_reply_extensions',
    //         'groups.conversations.threads.posts.inReplyTo.GetExtensions': 'conversation_reply_extensions',
    //         'groups.conversations.threads.posts.inReplyTo.CreateExtensions': 'conversation_reply_extensions',
    //         'groups.conversations.threads.posts.inReplyTo.DeleteExtensions': 'conversation_reply_extensions',
    //         'groups.calendar.calendarView.GetCalendar': 'calender_view_calender',
    //         'groups.calendar.calendarView.instances.GetCalendar': 'calender_view_calender',
    //         'groups.calendar.events.instances.GetCalendar': 'events_calendar',
    //         'groups.calendar.events.GetCalendar': 'events_calendar',
    //         'groups.calendar.calendarView.ListExtensions': 'calendar_view_extensions',
    //         'groups.calendar.calendarView.GetExtensions': 'calendar_view_extensions',
    //         'groups.calendar.calendarView.instances.ListExtensions': 'calendar_view_extensions',
    //         'groups.calendar.calendarView.instances.GetExtensions': 'calendar_view_extensions',
    //         'groups.calendar.calendarView.CreateExtensions': 'calendar_view_extensions',
    //         'groups.calendar.calendarView.DeleteExtensions': 'calendar_view_extensions',
    //         'groups.calendar.calendarView.instances.CreateExtensions': 'calendar_view_extensions',
    //         'groups.calendar.calendarView.instances.DeleteExtensions': 'calendar_view_extensions',
    //         'groups.calendar.calendarView.ListInstances': 'calendar_view_event_instances',
    //         'groups.calendar.calendarView.GetInstances': 'calendar_view_event_instances',
    //         'groups.calendar.events.ListInstances': 'calendar_event_instances',
    //         'groups.calendar.events.GetInstances': 'calendar_event_instances',
    //         'groups.calendar.ListCalendarView': 'calendar_view_events',
    //         'groups.calendar.GetCalendarView': 'calendar_view_events',
    //         'groups.calendar.ListEvents': 'calendar_events',
    //         'groups.calendar.GetEvents': 'calendar_events',
    //         'groups.calendar.CreateEvents': 'calendar_events',
    //         'groups.calendar.DeleteEvents': 'calendar_events',
    //         'groups.calendar.calendarView.instances.ListAttachments': 'calendar_view_attachments',
    //         'groups.calendar.calendarView.instances.GetAttachments': 'calendar_view_attachments',
    //         'groups.calendar.calendarView.instances.CreateAttachments': 'calendar_view_attachments',
    //         'groups.calendar.calendarView.instances.DeleteAttachments': 'calendar_view_attachments',
    //         'groups.calendar.events.ListAttachments': 'calendar_event_attachments',
    //         'groups.calendar.events.CreateAttachments': 'calendar_event_attachments',
    //         'groups.calendar.events.DeleteAttachments': 'calendar_event_attachments',
    //         'groups.calendar.events.GetAttachments': 'calendar_event_attachments',
    //         'groups.calendar.events.instances.ListAttachments': 'calendar_event_attachments',
    //         'groups.calendar.events.instances.GetAttachments': 'calendar_event_attachments',
    //         'groups.calendar.events.instances.CreateAttachments': 'calendar_event_attachments',
    //         'groups.calendar.events.instances.DeleteAttachments': 'calendar_event_attachments',
    //         'groups.calendar.events.ListExtensions': 'calendar_event_extensions',
    //         'groups.calendar.events.GetExtensions': 'calendar_event_extensions',
    //         'groups.calendar.events.CreateExtensions': 'calendar_event_extensions',
    //         'groups.calendar.events.DeleteExtensions': 'calendar_event_extensions',
    //         'groups.calendar.events.instances.ListExtensions': 'calendar_event_extensions',
    //         'groups.calendar.events.instances.GetExtensions': 'calendar_event_extensions',
    //         'groups.calendar.events.instances.CreateExtensions': 'calendar_event_extensions',
    //         'groups.calendar.events.instances.DeleteExtensions': 'calendar_event_extensions',
    //     },
    // },
}

export const methodNameTransforms = {
    allServices: (operationId) => {
        return operationId.split('.').pop();
    },
}

export const methodNameByOpIdMap = {
    // groups: {
    //     'groups.calendar.calendarView.instances.GetCalendar': 'get_calendar_by_instance',
    //     'groups.calendar.events.instances.GetCalendar': 'get_calendar_by_instance',
    //     'groups.calendar.calendarView.instances.ListExtensions': 'list_extensions_by_instance',
    //     'groups.calendar.calendarView.instances.GetExtensions': 'get_extensions_by_instance',
    //     'groups.calendar.calendarView.instances.CreateExtensions': 'create_extensions_by_instance',
    //     'groups.calendar.calendarView.instances.DeleteExtensions': 'delete_extensions_by_instance',
    //     'groups.calendar.events.instances.ListAttachments': 'list_attachments_by_instance',
    //     'groups.calendar.events.instances.GetAttachments': 'get_attachments_by_instance',
    //     'groups.calendar.events.instances.CreateAttachments': 'create_attachments_by_instance',
    //     'groups.calendar.events.instances.DeleteAttachments': 'delete_attachments_by_instance',
    //     'groups.calendar.events.instances.ListExtensions': 'list_extensions_by_instance',
    //     'groups.calendar.events.instances.GetExtensions': 'get_extensions_by_instance',
    //     'groups.calendar.events.instances.CreateExtensions': 'create_extensions_by_instance',
    //     'groups.calendar.events.instances.DeleteExtensions': 'delete_extensions_by_instance',
    // },
}

export const methodNameMap = {}

export const objectKeysAndSqlVerbs = {}



