import { format, parseISO } from "date-fns";

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
export function toCapitalCase(str: string): string {
  return str
    .split(/[-_/]/) // Split by hyphen, underscore, or slash
    .map(
      word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize first letter, lowercase the rest
    )
    .join(" "); // Join the words back with space
}

export function formatDate(dateString: string) {
  const date = parseISO(dateString);

  const formattedDate = format(date, "d MMM yyyy");
  return formattedDate;
}
export function transformLongString(str: string) {
  const sliecedString = str.slice(0, 90);
  if (str.length > 90) {
    return sliecedString.concat("...");
  }
  return sliecedString;
}

export function formatSelectOptions<T extends Record<string, any>>(data: T[], labelKey: keyof T) {
  return data.map(item => ({
    label: item[labelKey],
    value: item.id,
  }));
}
