import { Container } from "@components/container";
import ResizableTable from "@components/table/ResponsiveTable";

import { usequeryData } from "@context/QueryContext";
import { ColumnDef } from "@tanstack/react-table";

const QueryDataPreview = () => {
  const { queryData } = usequeryData();
  const names = queryData?.queryResult?.names || [];
  const dataList = queryData?.queryResult?.dataList || [{}];

  const columns: ColumnDef<any>[] = names.map(name => {
    return {
      accessorKey: name,
      header: name,
      size: 150,
    };
  });
  const tableData = dataList.map(item => {
    const obj = {};
    names.forEach(key => {
      obj[key] = item[key];
    });
    return obj;
  });

  return (
    <Container>
      {names.length === 0 || dataList.length === 0 ? (
        "Select a Query to see the data preview"
      ) : (
        <ResizableTable
          heading={`Query Result`}
          showOperations={false}
          columns={columns}
          data={tableData.map((row, index) => ({ ...row, key: index }))}
        />
      )}
    </Container>
  );
};

export default QueryDataPreview;
