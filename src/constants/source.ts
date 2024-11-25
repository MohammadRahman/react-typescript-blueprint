export const DATA_SOURCE_TYPES = [
    { label: "PostgreSQL", value: 1 },
    { label: "SQLite", value: 2 },
    { label: "MySQL", value: 3 },
    { label: "Microsoft SQL Server", value: 4 },
    { label: "MongoDB", value: 5 },
    { label: "Redis", value: 6 },
    { label: "Excel", value: 7 },
  ];
  export const DEFAULT_SOURCE_FILTER = {
    currentPage: 0,
    pageSize: 20,
    logicalOperator: 1,
    filters: [
      {
        propertyName: "type",
        sign: 0,
        value: "1",
      },
    ],
    orders: [
      {
        propertyName: "name",
        isDescending: true,
      },
    ],
  };