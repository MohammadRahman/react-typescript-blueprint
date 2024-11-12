import { EMAIL_ACCOUNT } from "@apis/api-routes";
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
    return emailService.post("/EmailAccount", emailBody);
}
function getEmailLists(paginationProperties: SearchParamsProps){
    return emailService.post("/EmailAccount/list", paginationProperties)
}
function upDateEmailAccount(id: string, paginationProperties: CreateEmailAccountPayload){
    return emailService.put(`/EmailAccount/${id}`, paginationProperties)
}
function deleteEmailAccount(id: string){
    return emailService.delete(`/EmailAccount/${id}`)
}
export const emailAccountApi = {
    createEmailAccount,
    getEmailLists,
    upDateEmailAccount,
    deleteEmailAccount
}