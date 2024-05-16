import { faker } from "@faker-js/faker";

const sourceData = [] as any;

function createSource(howMany: number) {
  const data = [];

  for (let i = 0; i < howMany; i++) {
    const name = "Need to pay";
    const source = i + 1;
    const status = faker.number.int({ min: 1, max: 2 });
    data.push({
      id: i + 1,
      dataSource: "Query" + " " + source,
      name,
      status,
    });
  }
  return data;
}
export function getSourceMock() {
  if (sourceData.length == 0) {
    const calculatedQuery = createSource(4);
    sourceData.push(...calculatedQuery);
  }
  return sourceData;
}
