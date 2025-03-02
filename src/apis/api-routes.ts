export const BASE_URL = import.meta.env.VITE_EMAIL_ACCOUNT;

export const REPORTS = "/reports";
export const USERS = "/users";
export const LOGIN = "/auth/login";
export const EMAIL_ACCOUNT = "/EmailAccount";
export const EMAIL_ACCOUNT_LIST = "/EmailAccount/FilterList";
export const EMAIL_ACCOUNT_UPDATE = "/EmailAccount/:id?id";

export const SOURCE_ACCOUNT = "/Source";
export const DELETE_SOURCE_ACCOUNT = "/Source/:id?id";
export const SOURCE_ACCOUNT_FILTER_LIST = "/Source/FilterList";

export const EMAIL_TEMPLATE = "/EmailTemplate";
export const EMAIL_TEMPLATE_DELETE = "/EmailTemplate/:id?id";
export const EMAIL_TEMPLATE_FILTER_LIST = "/EmailTemplate/FilterList";

export const QUERY = "/Query";
export const QUERY_RESULT = "/Query/Data";
export const QUERY_EDIT = "/Query";
export const QUERY_DELETE = "/Query/:id?id";
export const QUERY_FILTER_LIST = "/Query/FilterList";

export const JOB_START = "/Job/start";
export const JOB_DETAILS = "/Job";
export const JOB_FILTER_LIST = "/Job/FilterList";
