import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts";
import { createOperationId } from "../dev-functions.ts";

Deno.test("create operation id with single param and get", () => {
   // when there is no operationId, create an operationId use the path 
    // create an operationId use the path and verb
    // for example, this path /v2/metrics/{id} get would be v2_metrics_by_id_get
    // /v2/metrics/{id}/{type} get would be v2_metrics_by_id_by_type_get
    const path = "/v2/metrics/{id}";
    const verb = "get";
    const operationId = createOperationId(path, verb)
    assertEquals(operationId, "v2_metrics_by_id_get");
});

Deno.test("create operation id with single param and update", () => {
    const path = "/v2/metrics/{id}";
    const verb = "update";
    const operationId = createOperationId(path, verb)
    assertEquals(operationId, "v2_metrics_by_id_update");
}
)

Deno.test("create operation id with multiple params and get", () => {
    const path = "/v2/metrics/{id}/{type}";
    const verb = "get";
    const operationId = createOperationId(path, verb)
    assertEquals(operationId, "v2_metrics_by_id_by_type_get");
});