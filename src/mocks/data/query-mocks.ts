const queryData = [] as any;

function createQuery(howMany: number) {
  const data = [];
  const source = 1;
  for (let i = 0; i < howMany; i++) {
    const dataSource = source + i;
    const isSqlQuery = 1;
    const isDatabaseConnection = 1;

    data.push({
      id: i + 1,
      dataSource: "Query" + " " + dataSource,
      isSqlQuery,
      isDatabaseConnection,
    });
  }
  return data;
}
export function getQueryMock() {
  if (queryData.length == 0) {
    const calculatedQuery = createQuery(4);
    queryData.push(...calculatedQuery);
  }
  return queryData;
}
