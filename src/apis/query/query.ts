import { BASE_URL, QUERY, QUERY_DELETE, QUERY_FILTER_LIST, QUERY_RESULT } from "@apis/api-routes";
import httpCommon from "@apis/http-common";
import { ApiResponse, PaginationPayload } from "@interface/common";
import { CreateQuery, Query, QueryFields, QueryResult, QueryResultPayload } from "@interface/query";

const queryService = httpCommon(BASE_URL);

/**
 * create a new Query.
 * @param payload - The payload for create a new query.
 * @returns A promise that resolves to the started job.
 */
function createQuery(payload: CreateQuery): Promise<ApiResponse<Query>> {
  return queryService.post(QUERY, payload);
}

/**
 * Fetches a list of queries.
 * @param payload - Pagination properties (e.g., page, limit).
 * @param signal - Optional AbortSignal for request cancellation.
 * @returns A promise that resolves to an array of queries.
 */
function getQueryLists(paginationProperties: PaginationPayload, signal?: AbortSignal) {
  return queryService.post(QUERY_FILTER_LIST, paginationProperties, { signal });
}

/**
 * Updates an existing Query.
 * @param payload - The partial payload for updating Query.
 * @returns A promise that resolves to the updated template.
 */
function updateQuery(payload: Partial<Query>) {
  return queryService.put(QUERY, payload);
}

/**
 * Fetches a list of querie fields.
 * @param queryId - queryId.
 * @returns A promise that resolves to an array of querie fields.
 */
function getQueryFields(queryId: string): Promise<ApiResponse<QueryFields>> {
  return queryService.post(`${QUERY}/${queryId}Fields`);
}

/**
 * Fetches a query Result.
 * @param payload - sourceId and queryScript.
 * @returns A promise that resolves to an array of query results.
 */
function queryResult(payload: QueryResultPayload): Promise<QueryResult> {
  return queryService.post(QUERY_RESULT, payload);
}

/**
 * Deletes a Query.
 * @param id - The ID of the query to delete.
 * @returns A promise that resolves to a success message.
 */
function deleteQuery(id: string): Promise<Boolean> {
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
