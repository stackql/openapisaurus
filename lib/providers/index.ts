import * as fivetran from './fivetran.ts';
import * as digitalocean from './digitalocean.ts';
import * as cloudflare from './cloudflare.ts';
import * as jira from './jira.ts';
import * as linode from './linode.ts';
import * as purestorage from './purestorage.ts';
import * as godaddy from './godaddy.ts';
import * as datadog from './datadog.ts';


export default {
    fivetran,
    digitalocean,
    cloudflare,
    jira,
    linode,
    purestorage,
    godaddy,
    datadog,
};

//
// {provider}.ts contents
//

/*
export const servicesMap = {
    // renames a service or combines multiple services into one
    {original_service_name}: '{new_service_name}',
};

export const resourcesMap = {
    {service}: {
        nameMap: {
            // renames a resource or combines multiple resources into one
            {inResourceName}: {outResourceName},
        },
        opIdMap: {
            // maps an operation to a different resource in the same service
            {opId}: {resourceName},
        },
    },
};

export const objectKeysAndSqlVerbs = {
    _defaultObjectKey: '$.{something}',  // sets the default object key for all select methods
    {service}: {
        {resource}: {
            {operation}: {
                objectKey: '$.{something}',  // sets the object key for a specific operation, overrides the default if set
                sqlVerb: '{sqlVerb}',  // sets the sql verb for a specific operation, overrides the default
            },
        }
    }
};

// NEW

export const objectKeysAndSqlVerbs: IObjectKeysAndSqlVerbs = {
    _defaultObjectKey: '$.{something}',  // sets the default object key for all select methods
    services: {
        {service}: {
            {resource}: {
                {operation}: {
                    objectKey: '$.{something}',  // sets the object key for a specific operation, overrides the default if set
                    sqlVerb: '{sqlVerb}',  // sets the sql verb for a specific operation, overrides the default
                },
            }
        }
    }
};

*/
