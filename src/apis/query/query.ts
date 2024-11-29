export type QueryPayload = {}
export type SearchParamsProps = {}

import { EMAIL_TEMPLATE, EMAIL_TEMPLATE_DELETE, EMAIL_TEMPLATE_FILTER_LIST, QUERY, QUERY_FILTER_LIST } from "@apis/api-routes";
import { queryService } from "@apis/queryService";

function createQuery(payload: QueryPayload){
    return queryService.post(QUERY, payload);
}
function getQueryLists(paginationProperties: SearchParamsProps, signal?: AbortSignal){
    return queryService.post(QUERY_FILTER_LIST, paginationProperties, {signal});
}
function updateQuery(payload: QueryPayload){
    return queryService.put(EMAIL_TEMPLATE, payload);
}
function deleteQuery(id: string){
    return queryService.delete(`${EMAIL_TEMPLATE_DELETE}=${id}`);
}
export const queryApi = {
    createQuery,
    getQueryLists,
    updateQuery,
    deleteQuery
}