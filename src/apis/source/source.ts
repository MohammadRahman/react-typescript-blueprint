import {
  BASE_URL,
  DELETE_SOURCE_ACCOUNT,
  SOURCE_ACCOUNT,
  SOURCE_ACCOUNT_FILTER_LIST,
} from "@apis/api-routes";
import httpCommon from "@apis/http-common";
import { ApiResponse, PaginationPayload } from "@interface/common";
import { CreateSource, Source } from "@interface/source";

const sourceService = httpCommon(BASE_URL);

/**
 * Creates a new data source.
 * @param payload - The payload for creating a new data source.
 * @returns A promise that resolves to the created source.
 */
function createSourceAccount(payload: CreateSource): Promise<ApiResponse<Source>> {
  // need to pass "Content-Type": "multipart/form-data" since we'll be sending file
  return sourceService.post(SOURCE_ACCOUNT, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
/**
 * Fetches a list of sources.
 * @param payload - Pagination properties (e.g., page, limit).
 * @param signal - Optional AbortSignal for request cancellation.
 * @returns A promise that resolves to an array of Sources.
 */
function getSourceLists(payload: PaginationPayload, signal?: AbortSignal) {
  return sourceService.post(SOURCE_ACCOUNT_FILTER_LIST, payload, { signal });
}

/**
 * Updates an existing source.
 * @param payload - The partial payload for updating the source.
 * @returns A promise that resolves to the updated source.
 */
function updateSourceData(payload: Partial<Source>): Promise<ApiResponse<Source>> {
  return sourceService.put(SOURCE_ACCOUNT, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
/**
 * Deletes a source.
 * @param id - The ID of the source to delete.
 * @returns A promise that resolves to a success message.
 */
function deleteSourceAccount(id: string): Promise<Boolean> {
  return sourceService.delete(`${DELETE_SOURCE_ACCOUNT}=${id}`);
}
export const sourceApi = {
  createSourceAccount,
  getSourceLists,
  updateSourceData,
  deleteSourceAccount,
};
