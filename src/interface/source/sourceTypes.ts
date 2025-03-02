// types/queryTypes.ts

enum DatabaseType {
  ONE = 1,
  TWO = 2,
}
type Database = {
  version?: number;
  sourceId?: string;
  databaseName: string;
  host: string;
  port: number;
  username: string;
  password: string;
};
export type CreateSource = {
  version?: number;
  id?: string;
  name: string;
  type: DatabaseType;
  database: Database;
};

export type Source = {
  id: string;
  name: string;
  type: DatabaseType;
  database: {
    sourceId: string;
    databaseName: string;
    type: DatabaseType;
    host: string;
    port: number;
    username: string;
    password: string;
    version: number;
  };
  csv?: null;
  version: number;
};
