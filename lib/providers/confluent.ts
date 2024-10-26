export const servicesMap = {}

export const resourcesMap = {}

export const stackqlMethodNameMap = {}

export const objectKeysAndSqlVerbsMap = {
    kafka: {
        mirror_topics: {
            update_kafka_mirror_topics_promote: {
                sqlVerb: 'exec',
            },
            update_kafka_mirror_topics_failover: {
                sqlVerb: 'exec',
            },
            update_kafka_mirror_topics_pause: {
                sqlVerb: 'exec',
            },
            update_kafka_mirror_topics_resume: {
                sqlVerb: 'exec',
            },
            update_kafka_mirror_topics_reverse_and_start_mirror: {
                sqlVerb: 'exec',
            },                                    
            update_kafka_mirror_topics_reverse_and_pause_mirror: {
                sqlVerb: 'exec',
            },
            update_kafka_mirror_topics_truncate_and_restore_mirror: {
                sqlVerb: 'exec',
            },
        },
    },
}

