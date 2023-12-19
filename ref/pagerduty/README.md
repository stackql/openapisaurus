```
rm -rf dev/pagerduty
rm -rf src/pagerduty
```

### `pre-split`

```
make Accept and Content-Type headers optional

anon_col fixes:

replace this...

```
"properties": {
    "abilities": {
        "type": "array",
        "description": "The set of abilities your account has.",
        "items": {
            "type": "string",
            "description": "A single ability, as a name.",
            "readOnly": true
        }
    }
},
```
with this...

```
"properties": {
    "abilities": {
        "type": "array",
        "description": "The set of abilities your account has.",
        "items": {
            "type": "object",
            "properties": {
                "ability_name": {
                    "type": "string",
                    "description": "A single ability, as a name.",
                    "readOnly": true
                }
            }
        }
    }
}
```

replace this...

```
"schema": {
    "description": "",
    "type": "object",
    "properties": {
    "related_incidents": {
        "type": "array",
        "description": "A list of Related Incidents and their relationships.",
        "items": {
        "properties": {
            "incident": {
            "$ref": "#/components/schemas/Incident"
            },
            "relationships": {
            "type": "array",
            "description": "A list of reasons for why the Incident is considered related.",
            "items": {
                "properties": {
                "type": {
                    "type": "string",
                    "description": "The type of relationship. A relationship outlines the reason why two Incidents are considered related.",
                    "enum": [
                    "machine_learning_inferred",
                    "service_dependency"
                    ]
                },
                "metadata": {
                    "anyOf": [
                    {
                        "$ref": "#/components/schemas/RelatedIncidentMachineLearningRelationship"
                    },
                    {
                        "$ref": "#/components/schemas/RelatedIncidentServiceDependencyRelationship"
                    }
                    ]
                }
                }
            }
            }
        }
        }
    }
    }
},
```

with this...

```
"schema": {
    "description": "",
    "type": "object",
    "properties": {
        "related_incidents": {
            "type": "array",
            "description": "A list of Related Incidents and their relationships.",
            "items": {
                "type": "object",
                "properties": {
                    "incident_details": {
                        "$ref": "#/components/schemas/Incident",
                        "description": "Details of the incident."
                    },
                    "relationship_details": {
                        "type": "array",
                        "description": "A list of reasons for why the Incident is considered related.",
                        "items": {
                            "type": "object",
                            "properties": {
                                "relationship_type": {
                                    "type": "string",
                                    "description": "The type of relationship. A relationship outlines the reason why two Incidents are considered related."
                                },
                                "relationship_metadata": {
                                    "description": "Metadata associated with the relationship.",
                                    "anyOf": [
                                        {
                                            "$ref": "#/components/schemas/RelatedIncidentMachineLearningRelationship"
                                        },
                                        {
                                            "$ref": "#/components/schemas/RelatedIncidentServiceDependencyRelationship"
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        }
    }
},
```

```

### `split`

```
./openapisaurus split \
ref/pagerduty/pager-duty-openapiv3.json \
--providerName=pagerduty \
--svcDiscriminator='["tags"][0] | (input) => input.replace(/ /g, "_")' \
--outputDir=dev \
--overwrite \
--verbose
```
### `dev`

```
./openapisaurus dev \
dev \
--providerName=pagerduty \
--providerConfig='{ "auth": { "type": "api_key", "valuePrefix": "Token token=", "credentialsenvvar": "PAGERDUTY_API_TOKEN" }}' \
--overwrite \
--verbose
```

### `build`

```
./openapisaurus build \
dev \
--providerName=pagerduty \
--outputDir=src \
--overwrite \
--verbose
```

### Inspect Objects

```
node tests/inspectProvider.js pagerduty 2>&1 | tee pagerduty.log
```


### Run Test Suite

from the `stackql-provider-tests` directory:

```
cd ../stackql-provider-tests
sh test-provider.sh \
pagerduty \
false \
/mnt/c/LocalGitRepos/stackql/openapisaurus \
true
```

### Test Locally

```
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```
