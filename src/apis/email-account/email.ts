import { EMAIL_ACCOUNT, EMAIL_ACCOUNT_LIST, EMAIL_ACCOUNT_UPDATE } from "@apis/api-routes";
import { emailService } from "@apis/emailService"
import { SearchParamsProps } from "@components/filters-and-sorts/FiltersAndSorts";


export enum EmailType {
    ONE= 1,
   TWO =2
}
export enum SmtpPort {
    ZERO= 0,
    ONE=1
}
export enum SecurityProtocol {
    ZERO= 0,
    ONE=1
}
export enum ImapPort {
    ZERO= 0,
    ONE=1
}
export type CreateEmailAccountPayload = {
    id: string;
    type: EmailType.ONE;
    email: string;
    displayName: string;
    password: string;
    smtpAddress: string;
    smtpPort: SmtpPort.ZERO;
    securityProtocol: SecurityProtocol.ONE;
    imapAddress: string;
    imapEmail: string;
    imapPassword: string;
    imapPort: ImapPort.ZERO
}
type FilterProps = {
    propertyName: string;
    sign: number;
    value: string;
}
type OrdersProps = {
    propertyName: string;
    isDescending: true;
}
export type EmailAccountPaginationPayload = {
    currentPage: number;
    pageSize: number;
    logicalOperator: number;
    filters: Array<FilterProps>;
    orders: Array<OrdersProps>;

}

function createEmailAccount(emailBody: CreateEmailAccountPayload){
    return emailService.post(EMAIL_ACCOUNT, emailBody);
}
function getEmailLists(paginationProperties: SearchParamsProps, signal?: AbortSignal){
    return emailService.post(EMAIL_ACCOUNT_LIST, paginationProperties, {signal});
}
function upDateEmailAccount(id: string, paginationProperties: Omit<CreateEmailAccountPayload, "id">){
    return emailService.put(EMAIL_ACCOUNT, {...paginationProperties, id})
}
function deleteEmailAccount(id: string){
    console.log("id in api", id);
    return emailService.delete(`${EMAIL_ACCOUNT_UPDATE}=${id}`);
}
export const emailAccountApi = {
    createEmailAccount,
    getEmailLists,
    upDateEmailAccount,
    deleteEmailAccount
}