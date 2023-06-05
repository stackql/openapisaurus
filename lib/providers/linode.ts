export const servicesMap = {
    linode: 'instances',
};

export const resourcesMap = {
    account: {
        nameMap: {
            cancel: 'account',
            oauth_clients_thumbnail: 'oauth_clients',
        },
    },
    databases: {
        nameMap: {
            mongodb_instances_backups_restore: 'mongodb_instances_backups',
            mongodb_instances_credentials_reset: 'mongodb_instances_credentials',
            mysql_instances_backups_restore: 'mysql_instances_backups',
            mysql_instances_credentials_reset: 'mysql_instances_credentials',
        },        
    },
    domains: {
        nameMap: {
            clone: 'domains',
            import: 'domains',
        },        
    },
    images: {
        nameMap: {
            upload: 'images',
        },
    },
    instances: {
        nameMap: {
            linode: 'linodes',
            linode_boot: 'linodes',
            linode_clone: 'linodes',
            linode_migrate: 'linodes',
            linode_mutate: 'linodes',
            linode_password: 'linodes',
            linode_reboot: 'linodes',
            linode_rebuild: 'linodes',
            linode_rescue: 'linodes',
            linode_resize: 'linodes',
            linode_shutdown: 'linodes',
            linode_backups: 'backups',
            linode_backups_cancel: 'backups',
            linode_backups_enable: 'backups',
            linode_backups_restore: 'backups',
            linode_configs: 'configs',
            linode_disks: 'disks',
            linode_disks_clone: 'disks',
            linode_disks_password: 'disks',
            linode_disks_resize: 'disks',
            linode_firewalls: 'firewalls',
            linode_ips: 'ips',
            linode_kernels: 'kernels',
            linode_nodebalancers: 'nodebalancers',
            linode_transfer: 'transfer',
            linode_stats: 'stats',
            linode_volumes: 'volumes',
            linode_stackscripts: 'stackscripts',
            linode_types: 'types',
        },
    },
    volumes: {
        nameMap: {
            attach: 'volumes',
            clone: 'volumes',
            detach: 'volumes',
            resize: 'volumes',
        },        
    }
};
export const objectKeysAndSqlVerbs = {
    _defaultObjectKey: '$.data',
    account: {
        account: {
            getAccount: {
                objectKey: '$',
            },
        },
        settings: {
            getAccountSettings: {
                objectKey: '$',
            },
        },
        transfer: {
            getTransfer: {
                objectKey: '$',
            },
        },
        users_grants: {
            getUserGrants: {
                sqlVerb: 'exec',
            },
        },
        oauth_clients: {
            getClientThumbnail: {
                sqlVerb: 'exec',
            },
        },       
    },
    databases: {
        mongodb_instances_credentials: {
            getDatabasesMongoDBInstanceCredentials: {
                objectKey: '$',
            },
        },
        mongodb_instances_backups: {
            postDatabasesMongoDBInstanceBackupRestore: {
                sqlVerb: 'exec',
            },
        },
        mongodb_instances_ssl: {
            getDatabasesMongoDBInstanceSSL: {
                objectKey: '$',
            },
        },
        mysql_instances_credentials: {
            getDatabasesMySQLInstanceCredentials: {
                objectKey: '$',
            },
        },                
        mysql_instances_backups: {
            postDatabasesMySQLInstanceBackupRestore: {
                sqlVerb: 'exec',
            },
        },
        mysql_instances_ssl: {
            getDatabasesMySQLInstanceSSL: {
                objectKey: '$',
            },
        },
        postgresql_instances_credentials: {
            getDatabasesPostgreSQLInstanceCredentials: {
                objectKey: '$',
            },
        },
        postgresql_instances_ssl: {
            getDatabasesPostgreSQLInstanceSSL: {
                objectKey: '$',
            },
        },
    },
    domains: {
        zone_file: {
            getDomainZone: {
                objectKey: '$',
            },
        },
    }, 
    instances: {
        backups: {
            getBackups: {
                objectKey: '$',
            }
        },
        ips: {
            getLinodeIPs: {
                objectKey: '$',
            }
        },
        stats: {
            getLinodeStats: {
                objectKey: '$',
            }
        },
        transfer: {
            getLinodeTransfer: {
                objectKey: '$',
            }
        },
    },
    lke: {
        clusters_dashboard: {
            getLKEClusterDashboard: {
                objectKey: '$',
            }
        },
        clusters_kubeconfig: {
            getLKEClusterKubeconfig: {
                objectKey: '$',
            }
        },
        clusters_nodes: {
            getLKEClusterNode: {
                objectKey: '$',
            }
        },        
    },
    longview: {
        plan: {
            getLongviewPlan: {
                objectKey: '$',
            }
        }
    },
    managed: {
        stats: {
            getManagedStats: {
                sqlVerb: 'exec',
            }
        },
    },
    networking: {
        firewalls_rules: {
            getFirewallRules: {
                objectKey: '$',
            }
        }
    },
    object_storage: {
        buckets_ssl: {
            getObjectStorageSSL: {
                objectKey: '$',
            }
        },
        transfer: {
            getObjectStorageTransfer: {
                objectKey: '$',
            }
        }
    },
    profile: {
        grants: {
            getProfileGrants: {
                sqlVerb: 'exec',
            }
        },
        preferences: {
            getUserPreferences: {
                sqlVerb: 'exec',
            }
        },
        profile: {
            getProfile: {
                objectKey: '$',
            }
        },
        security_questions: {
            getSecurityQuestions: {
                objectKey: '$',
            }
        }        
    },        
}