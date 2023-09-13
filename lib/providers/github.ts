export const servicesMap = {
    emojis: 'skip',
    meta: 'skip',
}

export const resourcesMap = {
    actions: {
        opIdMap: {
            'actions/get-actions-cache-usage-for-org': 'cache_usage',
            'actions/get-actions-cache-usage': 'cache_usage',
            'actions/get-actions-cache-usage-by-repo-for-org': 'org_cache_usage',
            'actions/get-github-actions-permissions-organization': 'org_permissions',
            'actions/set-github-actions-permissions-organization': 'org_permissions',
            'actions/list-selected-repositories-enabled-github-actions-organization': 'enabled_repos',
            'actions/set-selected-repositories-enabled-github-actions-organization': 'enabled_repos',
            'actions/enable-selected-repository-github-actions-organization': 'enabled_repos',
            'actions/disable-selected-repository-github-actions-organization': 'enabled_repos',
            'actions/get-allowed-actions-organization': 'allowed_actions',
            'actions/set-allowed-actions-organization': 'allowed_actions',
            'actions/get-allowed-actions-repository': 'allowed_actions',
            'actions/set-allowed-actions-repository': 'allowed_actions',
            'actions/get-github-actions-default-workflow-permissions-organization': 'default_workflow_permissions',
            'actions/set-github-actions-default-workflow-permissions-organization': 'default_workflow_permissions',
            'actions/get-github-actions-default-workflow-permissions-repository': 'default_workflow_permissions',
            'actions/set-github-actions-default-workflow-permissions-repository': 'default_workflow_permissions',
            'actions/get-workflow-access-to-repository': 'workflow_access',
            'actions/set-workflow-access-to-repository': 'workflow_access',            
            'actions/list-runner-applications-for-org': 'runner_applications',
            'actions/list-runner-applications-for-repo': 'runner_applications',
            'actions/list-labels-for-self-hosted-runner-for-org': 'runner_labels',
            'actions/add-custom-labels-to-self-hosted-runner-for-org': 'runner_labels',
            'actions/set-custom-labels-for-self-hosted-runner-for-org': 'runner_labels',
            'actions/remove-all-custom-labels-from-self-hosted-runner-for-org': 'runner_labels',
            'actions/remove-custom-label-from-self-hosted-runner-for-org': 'runner_labels',
            'actions/list-labels-for-self-hosted-runner-for-repo': 'runner_labels',
            'actions/add-custom-labels-to-self-hosted-runner-for-repo': 'runner_labels',
            'actions/set-custom-labels-for-self-hosted-runner-for-repo': 'runner_labels',
            'actions/remove-all-custom-labels-from-self-hosted-runner-for-repo': 'runner_labels',
            'actions/remove-custom-label-from-self-hosted-runner-for-repo': 'runner_labels',
            'actions/list-org-secrets': 'org_secrets',
            'actions/get-org-secret': 'org_secrets',
            'actions/delete-org-secret': 'org_secrets',
            'actions/create-or-update-org-secret': 'org_secrets',
            'actions/list-repo-organization-secrets': 'repo_org_secrets',
            'actions/get-repo-public-key': 'public_keys',
            'actions/get-org-public-key': 'public_keys',
            'actions/get-environment-public-key': 'public_keys',
            'actions/list-selected-repos-for-org-secret': 'repos_for_secret',
            'actions/set-selected-repos-for-org-secret': 'repos_for_secret',
            'actions/add-selected-repo-to-org-secret': 'repos_for_secret',
            'actions/remove-selected-repo-from-org-secret': 'repos_for_secret',
            'actions/list-org-variables': 'org_variables',
            'actions/get-org-variable': 'org_variables',
            'actions/create-org-variable': 'org_variables',
            'actions/update-org-variable': 'org_variables',
            'actions/delete-org-variable': 'org_variables',
            'actions/list-selected-repos-for-org-variable': 'repos_for_org_variable',
            'actions/set-selected-repos-for-org-variable': 'repos_for_org_variable',
            'actions/add-selected-repo-to-org-variable': 'repos_for_org_variable',
            'actions/remove-selected-repo-from-org-variable': 'repos_for_org_variable',
            'actions/list-repo-organization-variables': 'repo_org_variables',
            'actions/download-workflow-run-attempt-logs': 'workflow_run_logs',
            'actions/download-workflow-run-logs': 'workflow_run_logs',
            'actions/delete-workflow-run-logs': 'workflow_run_logs',
            'actions/get-reviews-for-run': 'workflow_run_reviews',
            'actions/get-pending-deployments-for-run': 'pending_deployments_for_run',
            'actions/review-pending-deployments-for-run': 'pending_deployments_for_run',
            'actions/get-workflow-run-usage': 'workflow_run_usage',            
            'actions/get-workflow-usage': 'workflow_usage',
            

    
        },

        
        



    //     nameMap: {
    //     }
    },
    activity: {
        opIdMap: {
            'activity/get-thread-subscription-for-authenticated-user': 'notifications_thread_subscriptions',	
            'activity/set-thread-subscription': 'notifications_thread_subscriptions',	
            'activity/delete-thread-subscription': 'notifications_thread_subscriptions',	
            'activity/list-stargazers-for-repo': 'repo_stargazers',
            'activity/list-watchers-for-repo': 'repo_watchers',
            'activity/get-repo-subscription': 'repo_subscriptions',
            'activity/set-repo-subscription': 'repo_subscriptions',
            'activity/delete-repo-subscription': 'repo_subscriptions',
            'activity/list-public-events': 'public_events',
            'activity/list-public-events-for-repo-network': 'public_events',
            'activity/list-public-org-events': 'public_events',
            'activity/list-public-events-for-user': 'public_events',
            'activity/list-received-events-for-user': 'received_events',
            'activity/list-received-public-events-for-user': 'received_public_events',        
        },
    },
    apps: {
        opIdMap: {
            'apps/get-webhook-config-for-app': 'webhook_config',
            'apps/update-webhook-config-for-app': 'webhook_config',
            'apps/list-webhook-deliveries':	'webhook_deliveries',
            'apps/get-webhook-delivery': 'webhook_delivery',
            'apps/redeliver-webhook-delivery': 'webhook_delivery',
            'apps/list-repos-accessible-to-installation': 'installation_repos',
            'apps/list-installation-repos-for-authenticated-user': 'installation_repos',
            'apps/add-repo-to-installation-for-authenticated-user': 'installation_repos',
            'apps/remove-repo-from-installation-for-authenticated-user': 'installation_repos',
            'apps/get-subscription-plan-for-account': 'marketplace_subs',
            'apps/list-accounts-for-plan': 'marketplace_subs',
            'apps/get-subscription-plan-for-account-stubbed': 'marketplace_subs_stubbed',
            'apps/list-accounts-for-plan-stubbed': 'marketplace_subs_stubbed',
            'apps/list-plans': 'marketplace_listings',
            'apps/list-plans-stubbed': 'marketplace_listings_stubbed',
            'apps/list-subscriptions-for-authenticated-user': 'marketplace_users_subs',
            'apps/list-subscriptions-for-authenticated-user-stubbed': 'marketplace_users_subs_stubbed',
            'apps/get-authenticated': 'integrations',
            'apps/get-by-slug':	'integrations',
            'apps/list-installation-requests-for-authenticated-app': 'integration_installation_requests',
        },
    },
    billing: {
        opIdMap: {
            'billing/get-github-actions-billing-org': 'actions_billing_usage',
            'billing/get-github-actions-billing-user': 'actions_billing_usage',
            'billing/get-github-packages-billing-org': 'packages_billing_usage',
            'billing/get-github-packages-billing-user': 'packages_billing_usage',
            'billing/get-shared-storage-billing-org': 'combined_billing_usage',
            'billing/get-shared-storage-billing-user': 'combined_billing_usage',
        },
    },
    checks: {
        opIdMap: {
            'checks/list-annotations': 'annotations',
            'checks/create-suite': 'suites',
            'checks/set-suites-preferences': 'suites',
            'checks/get-suite': 'suites',
            'checks/rerequest-suite': 'suites',
            'checks/list-suites-for-ref': 'suites',        
        },
    },
    code_scanning: {
        opIdMap: {
            'code-scanning/upload-sarif': 'sarifs',
            'code-scanning/get-sarif': 'sarifs',
            'code-scanning/get-default-setup': 'default_setup',
            'code-scanning/update-default-setup': 'default_setup',
            'code-scanning/list-codeql-databases': 'codeql_databases',
            'code-scanning/get-codeql-database': 'codeql_databases',
            'code-scanning/list-recent-analyses': 'analysis',
            'code-scanning/get-analysis': 'analysis',
            'code-scanning/delete-analysis': 'analysis',
            'code-scanning/get-alert': 'alerts',
            'code-scanning/update-alert': 'alerts',
            'code-scanning/list-alerts-for-org': 'org_alert_items',
            'code-scanning/list-alert-instances': 'alert_instances',
            'code-scanning/list-alerts-for-repo': 'repo_alert_items',
        },
    },
    codespaces: {
        opIdMap: {
            'codespaces/list-selected-repos-for-org-secret': 'org_secrets_repos',
            'codespaces/set-selected-repos-for-org-secret': 'org_secrets_repos',
            'codespaces/add-selected-repo-to-org-secret': 'org_secrets_repos',
            'codespaces/remove-selected-repo-from-org-secret': 'org_secrets_repos',
            'codespaces/get-org-public-key': 'public_keys',
            'codespaces/get-repo-public-key': 'public_keys',
            'codespaces/get-public-key-for-authenticated-user': 'user_public_keys',
            'codespaces/list-repositories-for-secret-for-authenticated-user': 'user_secrets',
            'codespaces/set-repositories-for-secret-for-authenticated-user': 'user_secrets',
            'codespaces/add-repository-for-secret-for-authenticated-user': 'user_secrets',
            'codespaces/remove-repository-for-secret-for-authenticated-user': 'user_secrets',
            'codespaces/get-export-details-for-authenticated-user': 'codespace_export_details',        
        },
    },
    copilot: {
        opIdMap: {
            'copilot/get-copilot-organization-details': 'org_details',
            'copilot/get-copilot-seat-assignment-details-for-user': 'user_seats',
            'copilot/cancel-copilot-seat-assignment-for-users': 'user_seats',
            'copilot/add-copilot-for-business-seats-for-users': 'user_seats',
            'copilot/list-copilot-seats': 'org_seats',
            'copilot/add-copilot-for-business-seats-for-teams': 'org_seats',
            'copilot/cancel-copilot-seat-assignment-for-teams': 'org_seats',        
        },
    },
    dependabot: {
        opIdMap: {
            'dependabot/list-alerts-for-enterprise': 'enterprise_alerts',
            'dependabot/list-alerts-for-org': 'org_alerts',
            'dependabot/list-org-secrets': 'org_secrets',
            'dependabot/get-org-secret': 'org_secrets',
            'dependabot/create-or-update-org-secret': 'org_secrets',
            'dependabot/delete-org-secret': 'org_secrets',
            'dependabot/get-org-public-key': 'public_keys',
            'dependabot/get-repo-public-key': 'public_keys',
            'dependabot/list-selected-repos-for-org-secret': 'repos_for_secret',
            'dependabot/set-selected-repos-for-org-secret': 'repos_for_secret',
            'dependabot/add-selected-repo-to-org-secret': 'repos_for_secret',
            'dependabot/remove-selected-repo-from-org-secret': 'repos_for_secret',        
        },
    },
    gists: {
        opIdMap: {
            'gists/list-public': 'public_gists',
            'gists/list-starred': 'starred_gists',
            'gists/list-commits': 'commits',
            'gists/list-forks': 'forks',
            'gists/get-revision': 'revisions',
            'gists/get': 'gist',        
        },
    },    
    git: {
        opIdMap: {
            'git/get-ref': 'ref',        
        },
    },
    issues: {
        opIdMap: {
            'issues/list-for-authenticated-user': 'user_issues',        
        },
    },
    migrations: {
        opIdMap: {
            'migrations/list-for-org': 'migrations',
            'migrations/start-for-org': 'migrations',
            'migrations/get-status-for-org': 'migrations',
            'migrations/list-for-authenticated-user': 'migrations',
            'migrations/start-for-authenticated-user': 'migrations',
            'migrations/get-status-for-authenticated-user': 'migrations',
            'migrations/download-archive-for-org': 'archives',
            'migrations/delete-archive-for-org': 'archives',
            'migrations/get-archive-for-authenticated-user': 'archives',
            'migrations/delete-archive-for-authenticated-user': 'archives',
            'migrations/list-repos-for-org': 'repos',
            'migrations/unlock-repo-for-org': 'repos',
            'migrations/unlock-repo-for-authenticated-user': 'repos',
            'migrations/list-repos-for-authenticated-user': 'repos',
            'migrations/get-commit-authors': 'commit_authors',
            'migrations/map-commit-author': 'commit_authors',
            'migrations/get-large-files': 'lfs',
            'migrations/set-lfs-preference': 'lfs',        
        },
    },
    orgs: {
        opIdMap: {
            'orgs/list-app-installations': 'app_installations',
            'orgs/get': 'org',
            'orgs/list-for-authenticated-user': 'orgs_for_user',
            'orgs/list-failed-invitations': 'failed_invitations',
            'orgs/list-pending-invitations': 'pending_invitations',
            'orgs/create-invitation': 'invitations',
            'orgs/cancel-invitation': 'invitations',
            'orgs/list-invitation-teams': 'invitation_teams',
            'orgs/check-membership-for-user': 'membership',
            'orgs/get-membership-for-user': 'membership',
            'orgs/set-membership-for-user': 'membership',
            'orgs/remove-membership-for-user': 'membership',
            'orgs/check-public-membership-for-user': 'public_membership',
            'orgs/set-public-membership-for-authenticated-user': 'public_membership',
            'orgs/remove-public-membership-for-authenticated-user': 'public_membership',
            'orgs/list-public-members': 'public_members',
            'orgs/list-memberships-for-authenticated-user': 'memberships_for_user',
            'orgs/get-membership-for-authenticated-user': 'memberships_for_user',
            'orgs/update-membership-for-authenticated-user': 'memberships_for_user',
            'orgs/list-pat-grant-requests': 'pat_grant_requests',
            'orgs/list-pat-grants': 'pat_grants',
            'orgs/list-pat-grant-repositories': 'pat_grant_repos',
            'orgs/list-pat-grant-request-repositories': 'pat_grant_request_repos',
            'orgs/list-webhook-deliveries': 'webhook_deliveries',
            'orgs/get-webhook-delivery': 'webhook_delivery',
            'orgs/redeliver-webhook-delivery': 'webhook_delivery',
            'orgs/get-webhook-config-for-org': 'webhook_config',
            'orgs/update-webhook-config-for-org': 'webhook_config',
        },
    },
    packages: {
        opIdMap: {
            'packages/list-packages-for-organization': 'org_packages',
            'packages/get-package-for-organization': 'org_packages',
            'packages/delete-package-for-org': 'org_packages',
            'packages/restore-package-for-org': 'org_packages',
            'packages/get-all-package-versions-for-package-owned-by-org': 'org_versions',
            'packages/get-package-version-for-organization': 'org_versions',
            'packages/delete-package-version-for-org': 'org_versions',
            'packages/restore-package-version-for-org': 'org_versions',
            'packages/list-docker-migration-conflicting-packages-for-user': 'docker_migration_packages',
            'packages/list-docker-migration-conflicting-packages-for-organization': 'docker_migration_packages',
            'packages/list-docker-migration-conflicting-packages-for-authenticated-user': 'docker_migration_packages',
            'packages/get-all-package-versions-for-package-owned-by-authenticated-user': 'auth_user_versions',
            'packages/get-package-version-for-authenticated-user': 'auth_user_versions',
            'packages/delete-package-version-for-authenticated-user': 'auth_user_versions',
            'packages/restore-package-version-for-authenticated-user': 'auth_user_versions',
            'packages/get-all-package-versions-for-package-owned-by-user': 'user_versions',
            'packages/get-package-version-for-user': 'user_versions',
            'packages/delete-package-version-for-user': 'user_versions',
            'packages/restore-package-version-for-user': 'user_versions',
            'packages/list-packages-for-user': 'user_packages',
            'packages/get-package-for-user': 'user_packages',
            'packages/delete-package-for-user': 'user_packages',
            'packages/restore-package-for-user': 'user_packages',
            'packages/delete-package-for-authenticated-user': 'auth_user_packages',
            'packages/restore-package-for-authenticated-user': 'auth_user_packages',
            'packages/list-packages-for-authenticated-user': 'auth_user_packages',
            'packages/get-package-for-authenticated-user': 'auth_user_packages',        
        },
    },
    pulls: {
        opIdMap: {
        
        },
    },
    rate_limit: {
        opIdMap: {
        
        },
    },
    reactions: {
        opIdMap: {
        
        },
    },	
    repos: {
        opIdMap: {
        
        },
    },
    search: {
        opIdMap: {
        
        },
    },
    secret_scanning: {
        opIdMap: {
        
        },
    },
    security_advisories: {
        opIdMap: {
        
        },
    },
    teams: {
        opIdMap: {
        
        },
    },
    users: {
        opIdMap: {
        
        },
    },    
}

export const methodNameMap = {
}

export const objectKeysAndSqlVerbs = {
    actions: {
        self_hosted_runners: {
            create_registration_token_for_org: {
                sqlVerb: 'exec',
            },
            create_remove_token_for_org: {
                sqlVerb: 'exec',
            },
            create_registration_token_for_repo: {
                sqlVerb: 'exec',
            },
            create_remove_token_for_repo: {
                sqlVerb: 'exec',
            },
        },
    },
    apps: {
        apps: {
            create_installation_access_token: {
                sqlVerb: 'exec',
            },
        },
        oauth_applications: {
            delete_token: {
                sqlVerb: 'exec',
            },
        },
    },
    codespaces: {
        organizations: {
			delete_codespaces_access_users: {
				sqlVerb: 'exec',	
			},
        },
        codespaces: {
			create_with_repo_for_authenticated_user: {
				sqlVerb: 'exec',	
			},
			list_devcontainers_in_repository_for_authenticated_user: {
				sqlVerb: 'exec',	
			},
			create_with_pr_for_authenticated_user: {
				sqlVerb: 'exec',	
			},			
        },
    },
    teams: {
        orgs: {
            get_by_name: {
                sqlVerb: 'exec',
            },
        },
        teams: {
            get_legacy: {
                sqlVerb: 'exec',
            },
        },
    },
    repos: {
        languages: {
            list_languages: {
                sqlVerb: 'exec',
            },
        },
        rules_branches: {
            get_branch_rules: {
                sqlVerb: 'exec',
            },
        },
    },
}
