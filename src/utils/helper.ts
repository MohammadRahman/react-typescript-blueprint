type Database = {
  type: number;
  username: string;
  password: string;
  databaseName: string;
  host: string;
  port: number | string;
};
type ConnectionStrProps = {
  database: Database;
};
export function formatString(input: string) {
  return input.replace(/<\/?[^>]+(>|$)/g, "").trim();
}
export function formatConnectionStr({ database }: ConnectionStrProps) {
  const { type, username, password, host, databaseName, port } = database;

  switch (type) {
    case 1:
      return `postgres://${username}:${password}@${host}:${port}/${databaseName}`;
    case 2:
      return `sqlite://${databaseName}`;
    case 3:
      return `mysql://${username}:${password}@${host}:${port}/${databaseName}`;
    default:
      return "";
  }
}
