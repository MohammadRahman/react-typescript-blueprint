type FilterOptions = {
  label: string;
  sign: 0;
  value: string;
};

export const FILTER_OPTIONS = [
  { label: "email", sign: 0, value: "email" },
  { label: "type", sign: 0, value: "type" },
  { label: "displayName", sign: 0, value: "displayName" },
  { label: "imapEmail", sign: 0, value: "imapEmail" },
  { label: "smtpAddress", sign: 0, value: "smtpAddress" },
];

export type OrderOptions = {
  label: string;
  value: string;
  isDescending: boolean;
};

export const ORDER_OPTIONS = [
  {
    label: "Email",
    value: "email",
    isDescending: true,
  },
  {
    label: "Type",
    value: "type",
    isDescending: true,
  },
  {
    label: "Name",
    value: "name",
    isDescending: true,
  },
  {
    label: "IMAP email",
    value: "imapEmail",
    isDescending: true,
  },
];

export enum LogicalOperator {
  AND = 1,
  OR = 2,
}

export enum FilterSign {
  EQUALS = 0,
  NOT_EQUALS = 1,
  CONTAINS = 2,
  STARTS_WITH = 3,
  ENDS_WITH = 4,
  GREATER_THAN = 5,
  LESS_THAN = 6,
}

export interface Filter {
  propertyName: string;
  sign: FilterSign;
  value: string | number | boolean;
}

export interface Order {
  propertyName: string;
  isDescending: boolean;
}

export interface FiltersPayload {
  currentPage: number;
  pageSize: number;
  logicalOperator: LogicalOperator;
  filters: Filter[];
  orders: Order[];
}
export interface GetFullList {
  page: number;
  pagesize: number;
  signal?: AbortSignal;
}

export type PaginationPayload = FiltersPayload | GetFullList;

export type PaginationResponse = {
  currentPage: number;
  list: [];
  pageSize: number;
  pageCount: number;
  totalElements: number;
};

export type SearchParamsProps = {
  currentPage?: number;
  filters?: FilterOptions[] | string;
  filterValue?: string;
  orders?: OrderOptions[] | string;
  pageSize?: number;
  logicalOperator?: number;
};

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface CollectionResponse<T> {
  list: T[];
  totalCount: number;
  isLoading: boolean;
  currentPage: number;
  queryResult?: { names: []; dataList: [] };
}

export interface ErrorResponse {
  type: string;
  title: string;
  status: number;
  errors: Record<string, string[]>;
  traceId: string;
}

export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export const SizingMap: Record<Size, string> = {
  xs: "0.5rem",
  sm: "1rem",
  md: "2rem",
  lg: "3rem",
  xl: "4rem",
};
