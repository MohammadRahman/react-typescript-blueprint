import {
  BASE_URL,
  EMAIL_ACCOUNT,
  EMAIL_ACCOUNT_LIST,
  EMAIL_ACCOUNT_UPDATE,
} from "@apis/api-routes";
import httpCommon from "@apis/http-common";
import { ApiResponse, PaginationPayload, SearchParamsProps } from "@interface/common/common";

import {
  CreateEmailAccountPayload,
  EmailAccount,
  UpdateEmailAccountPayload,
} from "@interface/email/emailTypes";

const emailService = httpCommon(BASE_URL);

/**
 * Creates a new email account.
 * @param emailBody - The payload for creating an email account.
 * @returns A promise that resolves to the created email account.
 */
function createEmailAccount(
  emailBody: CreateEmailAccountPayload
): Promise<ApiResponse<EmailAccount>> {
  return emailService.post<EmailAccount>(EMAIL_ACCOUNT, emailBody);
}
/**
 * Fetches a list of email accounts.
 * @param paginationProperties - Pagination properties (e.g., page, limit).
 * @param signal - Optional AbortSignal for request cancellation.
 * @returns A promise that resolves to an array of email accounts.
 */
function getEmailLists(paginationProperties: PaginationPayload, signal?: AbortSignal) {
  return emailService.post(EMAIL_ACCOUNT_LIST, paginationProperties, { signal });
}
/**
 * Updates an existing email account.
 * @param id - The ID of the email account to update.
 * @param payload - The payload for updating the email account.
 * @returns A promise that resolves to the updated email account.
 */
function upDateEmailAccount(
  id: string,
  payload: UpdateEmailAccountPayload
): Promise<ApiResponse<EmailAccount>> {
  return emailService.put(EMAIL_ACCOUNT, { ...payload, id });
}

/**
 * Deletes an email account.
 * @param id - The ID of the email account to delete.
 * @returns A promise that resolves to a success message.
 */
function deleteEmailAccount(id: string): Promise<Boolean> {
  return emailService.delete(`${EMAIL_ACCOUNT_UPDATE}=${id}`);
}
export const emailAccountApi = {
  createEmailAccount,
  getEmailLists,
  upDateEmailAccount,
  deleteEmailAccount,
};
