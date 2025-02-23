import Heading from "@components/heading/Heading";

import { usequeryData } from "@context/QueryContext";

const QueryDataPreview = () => {
  const { queryData } = usequeryData();
  return (
    <>
      <Heading as="h2">Show data preview</Heading>
      <p style={{ paddingTop: "1rem" }}>{JSON.stringify(queryData?.queryResult?.names)}</p>
      <p style={{ paddingTop: "1rem" }}>{JSON.stringify(queryData?.queryResult?.dataList)}</p>
    </>
  );
};

export default QueryDataPreview;
