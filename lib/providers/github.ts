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
