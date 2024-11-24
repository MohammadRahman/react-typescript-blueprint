export type CreateSourceAccountPayload = {}
export type SearchParamsProps = {}

import { DELETE_SOURCE_ACCOUNT, SOURCE_ACCOUNT, SOURCE_ACCOUNT_FILTER_LIST } from "@apis/api-routes";
import { sourceService } from "@apis/sourceService";

function createSourceAccount(emailBody: CreateSourceAccountPayload){
    return sourceService.post(SOURCE_ACCOUNT, emailBody);
}
function getSourceLists(paginationProperties: SearchParamsProps, signal?: AbortSignal){
    return sourceService.post(SOURCE_ACCOUNT_FILTER_LIST, paginationProperties, {signal});
}
function updateSourceAccount(id: string, paginationProperties: Omit<CreateSourceAccountPayload, "id">){
    return sourceService.put(SOURCE_ACCOUNT, {...paginationProperties, id})
}
function deleteSourceAccount(id: string){
    return sourceService.delete(`${DELETE_SOURCE_ACCOUNT}/${id}`);
}
export const sourceApi = {
    createSourceAccount,
    getSourceLists,
    updateSourceAccount,
    deleteSourceAccount
}