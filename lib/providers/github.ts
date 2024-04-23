export const servicesMap = {
    emojis: 'skip',
    meta: 'skip',
    markdown: 'skip',
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
            'orgs/list-pending-invitations': 'invitations',
            'orgs/create-invitation': 'invitations',
            'orgs/cancel-invitation': 'invitations',
            'orgs/list-invitation-teams': 'invitation_teams',
            'orgs/list-pat-grant-requests': 'pat_grant_requests',
            'orgs/review-pat-grant-requests-in-bulk': 'pat_grant_requests',
            'orgs/review-pat-grant-request': 'pat_grant_requests',
            'orgs/update-pat-accesses': 'pat_grants',
            'orgs/update-pat-access': 'pat_grants',
            'orgs/list-pat-grants': 'pat_grants',
            'orgs/list-pat-grant-repositories': 'repos_for_pat_grants',
            'orgs/list-pat-grant-request-repositories': 'repos_for_pat_grant_requests',
            'orgs/list-webhook-deliveries': 'webhook_deliveries',
            'orgs/get-webhook-delivery': 'webhook_delivery',
            'orgs/redeliver-webhook-delivery': 'webhook_delivery',
            'orgs/get-webhook-config-for-org': 'webhook_config',
            'orgs/update-webhook-config-for-org': 'webhook_config',
            'orgs/list-memberships-for-authenticated-user': 'memberships',	
            'orgs/get-membership-for-authenticated-user': 'memberships',
            'orgs/update-membership-for-authenticated-user': 'memberships',	
            'orgs/check-membership-for-user': 'memberships',	
            'orgs/get-membership-for-user': 'memberships',	
            'orgs/set-membership-for-user': 'memberships',	
            'orgs/remove-membership-for-user': 'memberships',	
            'orgs/list-members': 'members',	
            'orgs/remove-member': 'members',	
            'orgs/check-public-membership-for-user': 'memberships',
            'orgs/set-public-membership-for-authenticated-user': 'memberships',
            'orgs/remove-public-membership-for-authenticated-user': 'memberships', // EXEC
            'orgs/list-public-members': 'members', //EXEC
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
            'pulls/list': 'pull_requests',
            'pulls/create': 'pull_request',
            'pulls/update': 'pull_request',
            'pulls/get': 'pull_request',
            'pulls/check-if-merged': 'pull_request',
            'pulls/merge': 'pull_request',
            'pulls/update-branch': 'pull_request',
            'pulls/list-commits': 'commits',
            'pulls/list-files': 'files',
            // 'pulls/create-reply-for-review-comment': 'replies',
            'pulls/list-comments-for-review': 'comments_for_review',        
        },
    },
    reactions: {
        opIdMap: {
            'reactions/list-for-team-discussion-comment-in-org': 'team_discussions',
            'reactions/create-for-team-discussion-comment-in-org': 'team_discussions',
            'reactions/delete-for-team-discussion-comment': 'team_discussions',
            'reactions/list-for-team-discussion-in-org': 'team_discussions',
            'reactions/create-for-team-discussion-in-org': 'team_discussions',
            'reactions/delete-for-team-discussion': 'team_discussions',
            'reactions/list-for-team-discussion-comment-legacy': 'team_discussions',
            'reactions/create-for-team-discussion-comment-legacy': 'team_discussions',
            'reactions/list-for-team-discussion-legacy': 'team_discussions',
            'reactions/create-for-team-discussion-legacy': 'team_discussions',
            'reactions/list-for-commit-comment': 'commit_comments',
            'reactions/create-for-commit-comment': 'commit_comments',
            'reactions/delete-for-commit-comment': 'commit_comments',
            'reactions/list-for-issue-comment': 'issue_comments',
            'reactions/create-for-issue-comment': 'issue_comments',
            'reactions/delete-for-issue-comment': 'issue_comments',
            'reactions/list-for-issue': 'issue_comments',
            'reactions/create-for-issue': 'issue_comments',
            'reactions/delete-for-issue': 'issue_comments',
            'reactions/list-for-pull-request-review-comment': 'pr_comments',
            'reactions/create-for-pull-request-review-comment': 'pr_comments',
            'reactions/delete-for-pull-request-comment': 'pr_comments',
            'reactions/list-for-release': 'release_comments',
            'reactions/create-for-release': 'release_comments',
            'reactions/delete-for-release': 'release_comments',        
        },
    },	
    repos: {
        opIdMap: {
            'repos/get-clones': 'clone_traffic',
            'repos/get-top-paths': 'content_traffic',
            'repos/get-top-referrers': 'referrer_traffic',
            'repos/get-views': 'view_traffic',
            'repos/list-tag-protection': 'tag_protection',
            'repos/create-tag-protection': 'tag_protection',
            'repos/delete-tag-protection': 'tag_protection',
            'repos/get-code-frequency-stats': 'stats_code_frequency',
            'repos/get-commit-activity-stats': 'stats_commit_activity',
            'repos/get-contributors-stats': 'stats_contributors',
            'repos/get-participation-stats': 'stats_participation',
            'repos/get-punch-card-stats': 'stats_punch_cards',
            'repos/get-latest-release': 'releases_latest',
            'repos/get-webhook-config-for-repo': 'webhook_config',
            'repos/update-webhook-config-for-repo': 'webhook_config',
            'repos/list-webhook-deliveries': 'webhook_deliveries',
            'repos/get-webhook-delivery': 'webhook_delivery',
            'repos/redeliver-webhook-delivery': 'webhook_delivery',
            'repos/get-content': 'content_tree',
            'repos/get-collaborator-permission-level': 'collaborator_permissions',
            'repos/list-pages-builds': 'page_builds',
            'repos/request-pages-build': 'page_builds',
            'repos/get-pages-build': 'page_builds',
            'repos/get-latest-pages-build': 'page_build_latest',
            'repos/create-pages-deployment': 'page_builds',            
            'repos/get-pages-health-check': 'pages_health_check',
            'repos/list-custom-deployment-rule-integrations': 'deployment_rule_integrations',
            'repos/list-commit-statuses-for-ref': 'status_commits',
            'repos/create-commit-status': 'status_commits',
            'repos/list-deployment-statuses': 'status_deployments',
            'repos/create-deployment-status': 'status_deployments',
            'repos/get-deployment-status': 'status_deployments',
            'repos/get-combined-status-for-ref': 'status_combined',
            'repos/list-branches-for-head-commit': 'head_commit_branches',
            'repos/list-pull-requests-associated-with-commit': 'commit_pr_branches',
            'repos/get-branch': 'branch',
            'repos/rename-branch': 'branch',
            'repos/merge-upstream': 'branch',
            'repos/merge': 'branch',
            'repos/get-org-rulesets': 'org_rules',
            'repos/create-org-ruleset': 'org_rules',
            'repos/get-org-ruleset': 'org_rules',
            'repos/update-org-ruleset': 'org_rules',
            'repos/delete-org-ruleset': 'org_rules',
            'repos/get-branch-rules': 'rules',
            'repos/get': 'details',
            'repos/list-activities': 'activities',
            'repos/check-automated-security-fixes': 'security_fixes',
            'repos/enable-automated-security-fixes': 'security_fixes',
            'repos/disable-automated-security-fixes': 'security_fixes',
            'repos/list-languages': 'repos',
            'repos/list-tags': 'tags',
            'repos/list-teams': 'teams',
            'repos/get-all-topics': 'topics',
            'repos/replace-all-topics': 'topics',
            'repos/list-contributors': 'contributors',
            'repos/list-webhooks': 'webhooks',
            'repos/create-webhook': 'webhooks',
            'repos/get-webhook': 'webhooks',
            'repos/update-webhook': 'webhooks',
            'repos/delete-webhook': 'webhooks',
            'repos/ping-webhook': 'webhooks',
            'repos/test-push-webhook': 'webhooks',
            'repos/list-for-authenticated-user': 'repos_for_auth_user',
            'repos/create-for-authenticated-user': 'repos_for_auth_user',
            'repos/get-admin-branch-protection': 'admin_branch_protection',
            'repos/set-admin-branch-protection': 'admin_branch_protection',
            'repos/delete-admin-branch-protection': 'admin_branch_protection',
            'repos/get-pull-request-review-protection': 'pr_review_protection',
            'repos/update-pull-request-review-protection': 'pr_review_protection',
            'repos/delete-pull-request-review-protection': 'pr_review_protection',
            'repos/get-commit-signature-protection': 'commit_signature_protection',
            'repos/create-commit-signature-protection': 'commit_signature_protection',
            'repos/delete-commit-signature-protection': 'commit_signature_protection',
            'repos/get-status-checks-protection': 'status_check_protection',
            'repos/update-status-check-protection': 'status_check_protection',
            'repos/remove-status-check-protection': 'status_check_protection',
            'repos/get-all-status-check-contexts': 'status_check_contexts',
            'repos/add-status-check-contexts': 'status_check_contexts',
            'repos/set-status-check-contexts': 'status_check_contexts',
            'repos/remove-status-check-contexts': 'status_check_contexts',
            'repos/get-access-restrictions': 'branch_restrictions',
            'repos/delete-access-restrictions': 'branch_restrictions',
            'repos/get-apps-with-access-to-protected-branch': 'app_access_restrictions',
            'repos/add-app-access-restrictions': 'app_access_restrictions',
            'repos/set-app-access-restrictions': 'app_access_restrictions',
            'repos/remove-app-access-restrictions': 'app_access_restrictions',
            'repos/get-teams-with-access-to-protected-branch': 'team_access_restrictions',
            'repos/add-team-access-restrictions': 'team_access_restrictions',
            'repos/set-team-access-restrictions': 'team_access_restrictions',
            'repos/remove-team-access-restrictions': 'team_access_restrictions',
            'repos/get-users-with-access-to-protected-branch': 'user_access_restrictions',
            'repos/add-user-access-restrictions': 'user_access_restrictions',
            'repos/set-user-access-restrictions': 'user_access_restrictions',
            'repos/remove-user-access-restrictions': 'user_access_restrictions',
        },
    },
    search: {
        opIdMap: {
            'search/code': 'code',
            'search/commits': 'commits',
            'search/issues-and-pull-requests': 'issues_and_pull_requests',
            'search/labels': 'labels',
            'search/repos': 'repos',
            'search/topics': 'topics',
            'search/users': 'users',
        },
    },
    secret_scanning: {
        opIdMap: {
            'secret-scanning/list-alerts-for-enterprise': 'alerts',
            'secret-scanning/list-alerts-for-org': 'alerts',
            'secret-scanning/list-alerts-for-repo': 'alerts',
            'secret-scanning/get-alert': 'alerts',
            'secret-scanning/update-alert': 'alerts',
            'secret-scanning/list-locations-for-alert': 'locations',
        },
    },
    // security_advisories: {
    //     opIdMap: {
    //         'security-advisories/create-repository-advisory-cve-request': 'cve_requests',
    //         'security-advisories/create-private-vulnerability-report': 'vulnerability_reports',
    //     },
    // },
    teams: {
        opIdMap: {
            'teams/get-membership-for-user-legacy': 'membership',
            'teams/get-membership-for-user-in-org': 'membership',
            'teams/add-or-update-membership-for-user-in-org': 'membership',
            'teams/remove-membership-for-user-in-org': 'membership',
            'teams/add-or-update-membership-for-user-legacy': 'membership',
            'teams/remove-membership-for-user-legacy': 'membership',
            'teams/list-pending-invitations-in-org': 'invitations',
            'teams/list-pending-invitations-legacy': 'invitations',
            'teams/get-by-name': 'details',
            'teams/list-for-authenticated-user': 'teams_for_auth_user',
            'teams/list-projects-in-org': 'projects',
            'teams/list-projects-legacy': 'projects',
            'teams/remove-project-in-org': 'projects',
            'teams/remove-project-legacy': 'projects',
            'teams/check-permissions-for-project-in-org': 'project_permissions',
            'teams/check-permissions-for-project-legacy': 'project_permissions',
            'teams/add-or-update-project-permissions-in-org': 'project_permissions',
            'teams/add-or-update-project-permissions-legacy': 'project_permissions',
            'teams/list-repos-in-org': 'repos',
            'teams/list-repos-legacy': 'repos',
            'teams/remove-repo-legacy': 'repos',
            'teams/remove-repo-in-org': 'repos',
            'teams/check-permissions-for-repo-in-org': 'repo_permissions',
            'teams/add-or-update-repo-permissions-in-org': 'repo_permissions',
            'teams/check-permissions-for-repo-legacy': 'repo_permissions',
            'teams/add-or-update-repo-permissions-legacy': 'repo_permissions',
        },
    },
    users: {
        opIdMap: {
            'users/list-public-emails-for-authenticated-user': 'public_emails',
            'users/list-public-keys-for-user': 'keys_for_user',
            'users/list-followed-by-authenticated-user': 'following',
            'users/check-person-is-followed-by-authenticated': 'following',
            'users/follow': 'following',
            'users/unfollow': 'following',
            'users/list-following-for-user': 'following',
            'users/check-following-for-user': 'following',
            'users/get-context-for-user': 'hovercard',
            'users/list': 'public_users',
        },
    },    
}

export const stackqlMethodNameMap = {
    methodNameByOpIdMap: {},
    methodNameTransforms: {
        allServices: (service, resource, operationId, tag) => {
            const parts = operationId.split('/');
            if (parts.length > 1) {
                return parts[1];
            } else {
                return operationId;
            }
        },
    },
    methodNameMap: {},
}

// export const methodNameMap = {
// }

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
        oauth_applications: {
            delete_token: {
                sqlVerb: 'exec',
            },
        },
    },
    codespaces: {
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
        machines: {	
            repo_machines_for_authenticated_user: {
                sqlVerb: 'select',
            },
            codespace_machines_for_authenticated_user: {
                sqlVerb: 'select',
            },
        },
    },
    dependency_graph: {
        dependency_review: {
            diff_range: {
                sqlVerb: 'select',
            },
        },
        sboms: {
            export_sbom: {
                sqlVerb: 'select',
            },
        },
    },
    pulls: {
        comments: {
            create_reply_for_review_comment: {
                sqlVerb: 'exec',
            },
        },
    },
    teams: {
        membership: {
            add_or_update_membership_for_user_legacy: {
                sqlVerb: 'exec',
            },
            remove_membership_for_user_legacy: {
                sqlVerb: 'exec',
            },			
        },
        discussion_comments: {
            create_discussion_comment_legacy: {
                sqlVerb: 'exec',
            },
            delete_discussion_comment_legacy: {
                sqlVerb: 'exec',
            },			
        },
        discussions: {
            create_discussion_legacy: {
                sqlVerb: 'exec',
            },
            delete_discussion_legacy: {
                sqlVerb: 'exec',
            },			
        },		
        teams: {
            get_legacy: {
                sqlVerb: 'exec',
            },
            delete_legacy: {
                sqlVerb: 'exec',
            },			
        },
        projects: {
            remove_project_legacy: {
                sqlVerb: 'exec',
            },
        },		
        project_permissions: {
            add_or_update_project_permissions_legacy: {
                sqlVerb: 'exec',
            },
        },		
        repo_permissions: {
            add_or_update_repo_permissions_legacy: {
                sqlVerb: 'exec',
            },
        },		
        repos: {
            remove_repo_legacy: {
                sqlVerb: 'exec',
            },
        },	
    },
    repos: {
        rules: {
            get_branch_rules: {
                sqlVerb: 'exec',
            },
        },
        repos: {
            list_languages: {
                sqlVerb: 'exec',
            },
            create_dispatch_event: {
                sqlVerb: 'exec',
            },
            create_using_template: {
                sqlVerb: 'exec',
            },
        },
        page_builds: {
            create_pages_deployment: {
                sqlVerb: 'exec',
            },
        },
    },
    search: {
        code: {
            code: {
                sqlVerb: 'select',
            },
        },
        commits: {
            commits: {
                sqlVerb: 'select',
            },
        },
        issues_and_pull_requests: {
            issues_and_pull_requests: {
                sqlVerb: 'select',
            },
        },
        labels: {
            labels: {
                sqlVerb: 'select',
            },
        },
        repos: {
            repos: {
                sqlVerb: 'select',
            },
        },
        topics: {
            topics: {
                sqlVerb: 'select',
            },
        },
        users: {
            users: {
                sqlVerb: 'select',
            },
        },		
    },
    security_advisories: {
        repository_advisories:{
            create_repository_advisory_cve_request: {
                sqlVerb: 'exec',
            },
            create_private_vulnerability_report: {
                sqlVerb: 'exec',
            },
        },
    },
    orgs: {
        memberships: {
            remove_public_membership_for_authenticated_user: {
                sqlVerb: 'exec',
            },
        },
        members: {
            list_public_members: {
                sqlVerb: 'exec',
            },
        },
    },
    migrations: {
        users: {
            get_archive_for_authenticated_user: {
                sqlVerb: 'exec',
            },
            delete_archive_for_authenticated_user: {
                sqlVerb: 'exec',
            },
        },
        orgs: {
            delete_archive_for_org: {
                sqlVerb: 'exec',
            },
        },
    },
}

