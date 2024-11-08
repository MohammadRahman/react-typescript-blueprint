const mailServerData = [] as any;

function createMailServerData(howMany: number) {
  const data = [];

  for (let i = 0; i < howMany; i++) {
    data.push({
      id: i + 1,
      someData: "some data",
      someData1: "some data",
      someData2: "some data",
      someData3: "some data",
      someData4: "some data",
      someData5: "some data",
    });
  }
  return data;
}
export function getServerDataMock() {
  if (mailServerData.length == 0) {
    const calculatedQuery = createMailServerData(4);
    mailServerData.push(...calculatedQuery);
  }
  return mailServerData;
}
