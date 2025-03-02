import {
  BASE_URL,
  EMAIL_TEMPLATE,
  EMAIL_TEMPLATE_DELETE,
  EMAIL_TEMPLATE_FILTER_LIST,
} from "@apis/api-routes";
import httpCommon from "@apis/http-common";
import { ApiResponse, PaginationPayload, PaginationResponse } from "@interface/common/common";
import { CreateTemplatePayload, TemplatePayload } from "@interface/email/emailTypes";

const emailTemplateService = httpCommon(BASE_URL);

/**
 * Creates a new email template.
 * @param payload - The payload for creating a template.
 * @returns A promise that resolves to the created template.
 */
function createNewTemplate(payload: CreateTemplatePayload): Promise<ApiResponse<TemplatePayload>> {
  return emailTemplateService.post(EMAIL_TEMPLATE, payload);
}
/**
 * Fetches a list of templates.
 * @param payload - Pagination properties (e.g., page, limit).
 * @param signal - Optional AbortSignal for request cancellation.
 * @returns A promise that resolves to an array of templates.
 */
function getTemplateLists(payload: PaginationPayload, signal?: AbortSignal) {
  return emailTemplateService.post(EMAIL_TEMPLATE_FILTER_LIST, payload, { signal });
}
/**
 * Updates an existing template.
 * @param payload - The partial payload for updating the template.
 * @returns A promise that resolves to the updated template.
 */
function updateTemplate(
  payload: Partial<CreateTemplatePayload>
): Promise<ApiResponse<TemplatePayload>> {
  return emailTemplateService.put(EMAIL_TEMPLATE, payload);
}
/**
 * Deletes a template.
 * @param id - The ID of the template to delete.
 * @returns A promise that resolves to a success message.
 */
function deleteTemplate(id: string): Promise<Boolean> {
  return emailTemplateService.delete(`${EMAIL_TEMPLATE_DELETE}=${id}`);
}
export const templateApi = {
  createNewTemplate,
  getTemplateLists,
  updateTemplate,
  deleteTemplate,
};
