export type QueryPayload = {
  version: number;
  id: string;
  sourceId: string;
  clientIdField?: string;
  name: string;
  emailField: string;
  body: string;
};
type QueryResultPayload = {
  sourceId: string;
  queryScript: string;
};
export type SearchParamsProps = {};

import { QUERY, QUERY_DELETE, QUERY_FILTER_LIST, QUERY_RESULT } from "@apis/api-routes";
import { queryService } from "@apis/queryService";

function createQuery(payload: QueryPayload) {
  return queryService.post(QUERY, payload);
}
function getQueryLists(paginationProperties: SearchParamsProps, signal?: AbortSignal) {
  return queryService.post(QUERY_FILTER_LIST, paginationProperties, { signal });
}
function updateQuery(payload: QueryPayload) {
  return queryService.put(QUERY, payload);
}
function getQueryFields(id: string) {
  return queryService.post(`${QUERY}/${id}Fields`);
}
function queryResult(data: QueryResultPayload) {
  return queryService.post(QUERY_RESULT, data);
}
function deleteQuery(id: string) {
  return queryService.delete(`${QUERY_DELETE}=${id}`);
}

export const queryApi = {
  createQuery,
  getQueryLists,
  updateQuery,
  deleteQuery,
  getQueryFields,
  queryResult,
};
