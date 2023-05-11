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
            instances_backups: 'backups',
            instances_configs: 'configs',
            instances_disks: 'disks',
            instances_firewalls: 'firewalls',
            instances_ips: 'ips',
            instances_nodebalancers: 'nodebalancers',
            instances_transfer: 'transfer',
            instances_stats: 'stats',
            instances_volumes: 'volumes',
        },
    },
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
                objectKey: '$',
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