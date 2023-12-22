export const servicesMap = {}

export const resourcesMap = {}

export const stackqlMethodNameMap = {
    methodNameByOpIdMap: {},
    methodNameTransforms: {},
    methodNameMap: {},
}

export const objectKeysAndSqlVerbs = {
    dashboard_lists: {
        dashboard_list_items: {
            get_dashboard_list_items: {
                objectKey: '$.dashboards',
            },
        },
    },

    _defaultObjectKey: '$.data',    
}


// running DESCRIBE EXTENDED datadog.security_monitoring.security_monitoring_rules...
// ERROR [could not resolve json schema for key = '$.data': GetSelectableObjectSchema(): schema unsuitable for select query]

// datadog.security_monitoring.security_monitoring_rules

//datadog.usage_metering.active_billing_dimensions

// cost_by_orgs:
// id: datadog.usage_metering.cost_by_orgs
// name: cost_by_orgs
// title: Cost By Orgs
// resTokens: []
// methods:
//   get_cost_by_org:
//     operation:
//       $ref: usage_metering.yaml#/paths/~1api~1v2~1usage~1cost_by_org/get
//       operationId: GetCostByOrg
//     response:
//       mediaType: application/json;datetime-format=rfc3339
//       openAPIDocKey: '200'
//       objectKey: $.data

// estimated_cost_by_orgs:
// id: datadog.usage_metering.estimated_cost_by_orgs
// name: estimated_cost_by_orgs
// title: Estimated Cost By Orgs
// resTokens: []
// methods:
//   get_estimated_cost_by_org:
//     operation:
//       $ref: usage_metering.yaml#/paths/~1api~1v2~1usage~1estimated_cost/get
//       operationId: GetEstimatedCostByOrg
//     response:
//       mediaType: application/json;datetime-format=rfc3339
//       openAPIDocKey: '200'
//       objectKey: $.data

// historical_cost_by_orgs:
// id: datadog.usage_metering.historical_cost_by_orgs
// name: historical_cost_by_orgs
// title: Historical Cost By Orgs
// resTokens: []
// methods:
//   get_historical_cost_by_org:
//     operation:
//       $ref: usage_metering.yaml#/paths/~1api~1v2~1usage~1historical_cost/get
//       operationId: GetHistoricalCostByOrg
//     response:
//       mediaType: application/json;datetime-format=rfc3339
//       openAPIDocKey: '200'
//       objectKey: $.data

// hourly_usages:
// id: datadog.usage_metering.hourly_usages
// name: hourly_usages
// title: Hourly Usages
// resTokens: []
// methods:
//   get_hourly_usage:
//     operation:
//       $ref: usage_metering.yaml#/paths/~1api~1v2~1usage~1hourly_usage/get
//       operationId: GetHourlyUsage
//     response:
//       mediaType: application/json;datetime-format=rfc3339
//       openAPIDocKey: '200'
//       objectKey: $.data

// monthly_cost_attributions:
// id: datadog.usage_metering.monthly_cost_attributions
// name: monthly_cost_attributions
// title: Monthly Cost Attributions
// resTokens: []
// methods:
//   get_monthly_cost_attribution:
//     operation:
//       $ref: usage_metering.yaml#/paths/~1api~1v2~1cost_by_tag~1monthly_cost_attribution/get
//       operationId: GetMonthlyCostAttribution
//     response:
//       mediaType: application/json;datetime-format=rfc3339
//       openAPIDocKey: '200'
//       objectKey: $.data


// projected_costs:
// id: datadog.usage_metering.projected_costs
// name: projected_costs
// title: Projected Costs
// resTokens: []
// methods:
//   get_projected_cost:
//     operation:
//       $ref: usage_metering.yaml#/paths/~1api~1v2~1usage~1projected_cost/get
//       operationId: GetProjectedCost
//     response:
//       mediaType: application/json;datetime-format=rfc3339
//       openAPIDocKey: '200'
//       objectKey: $.data
