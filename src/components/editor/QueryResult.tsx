import FormHeader from "@components/header/FormHeader";
import { usequeryData } from "@context/QueryContext";
import ResizableTable from "@components/table/ResponsiveTable";
import { ColumnDef } from "@tanstack/react-table";
import { Container } from "@components/container";

const QueryResult = () => {
  const { queryData } = usequeryData();

  const names = queryData?.queryResult?.names || [];
  const dataList = queryData?.queryResult?.dataList || [{}];

  const columns: ColumnDef<any>[] = names.map(name => {
    return {
      accessorKey: name,
      header: name,
      size: 150,
      // modify the value to render male/female
      // cell: ({ row }) => {
      //   const value = row.original[name];
      //   if (name === "Sex") return <span>{value ? "Male" : "Female"}</span>;
      // },
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
    <Container padding="md" style={{ height: "50%", overflow: "scroll" }}>
      <FormHeader heading="Query Result" />
      <ResizableTable showOperations={false} columns={columns} data={tableData} />
    </Container>
  );
};

export default QueryResult;
