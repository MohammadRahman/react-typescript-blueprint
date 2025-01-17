export type QueryPayload = {
  version: number;
  id: string;
  sourceId: string;
  clientId?: string;
  name: string;
  body: string;
};
export type SearchParamsProps = {};

import { QUERY, QUERY_DELETE, QUERY_FILTER_LIST } from "@apis/api-routes";
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
function deleteQuery(id: string) {
  return queryService.delete(`${QUERY_DELETE}=${id}`);
}
export const queryApi = {
  createQuery,
  getQueryLists,
  updateQuery,
  deleteQuery,
};
