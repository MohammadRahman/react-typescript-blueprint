export type createNewTemplatePayload = {};
export type SearchParamsProps = {};

import {
  EMAIL_TEMPLATE,
  EMAIL_TEMPLATE_DELETE,
  EMAIL_TEMPLATE_FILTER_LIST,
} from "@apis/api-routes";
import { emailTemplateService } from "@apis/emailTemplateService";

function createNewTemplate(templateBody: createNewTemplatePayload) {
  return emailTemplateService.post(EMAIL_TEMPLATE, templateBody);
}
function getTemplateLists(paginationProperties: SearchParamsProps, signal?: AbortSignal) {
  return emailTemplateService.post(EMAIL_TEMPLATE_FILTER_LIST, paginationProperties, { signal });
}
function updateTemplate(templateBody: createNewTemplatePayload) {
  return emailTemplateService.put(EMAIL_TEMPLATE, templateBody);
}
function deleteTemplate(id: string) {
  return emailTemplateService.delete(`${EMAIL_TEMPLATE_DELETE}=${id}`);
}
export const templateApi = {
  createNewTemplate,
  getTemplateLists,
  updateTemplate,
  deleteTemplate,
};
