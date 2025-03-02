// types/emailTypes.ts
export enum EmailType {
  ONE = 1,
  TWO = 2,
  THREE = 3,
}
export enum SmtpPort {
  ZERO = 0,
  ONE = 1,
}
export enum SecurityProtocol {
  ZERO = 0,
  ONE = 1,
}
export enum ImapPort {
  ZERO = 0,
  ONE = 1,
}

export type CreateEmailAccountPayload = {
  id?: string;
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
  imapPort: ImapPort.ZERO;
};

export type EmailAccount = {
  id: string;
  type: EmailType;
  email: string;
  displayName: string;
  password: string;
  smtpAddress: string;
  smtpPort: number;
  securityProtocol: SecurityProtocol;
  imapAddress?: string;
  imapEmail?: string;
  imapPassword?: string;
  imapPort?: string;
  version: number;
};

export type UpdateEmailAccountPayload = Partial<Omit<EmailAccount, "id">>;

export type CreateTemplatePayload = {
  version?: number;
  id?: string;
  name: string;
  queryId: string;
  to: string;
  subject: string;
  body: string;
};
export type TemplatePayload = {
  version: number;
  id: string;
  name: string;
  queryId: string;
  to: string;
  subject: string;
  body: string;
};
