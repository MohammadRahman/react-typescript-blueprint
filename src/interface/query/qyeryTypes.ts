// types/queryTypes.ts

export type CreateQuery = {
  version?: number;
  id?: string;
  sourceId: string;
  clientIdField: string;
  emailField: string;
  name: string;
  body: string;
};

export type Query = {
  id: string;
  sourceId: string;
  clientIdField: string;
  emailField: string;
  name: string;
  body: string;
  version: number;
};
export type QueryFields = Array<string>;

export type QueryResultPayload = {
  sourceId: string;
  queryScript: string;
};

export interface DataListItem {
  [key: string]: string | number | boolean;
}

export interface QueryResult {
  names: string[];
  dataList: DataListItem[];
}
