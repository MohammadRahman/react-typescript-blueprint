import { Container } from "@components/container/Container";
import ResizableTable from "@components/table/ResponsiveTable";
import { useJobColumns } from "./JobColumns";

interface IJobTable {
  isLoading?: boolean;
}

const JobTable = ({ isLoading }: IJobTable) => {
  const { tableData, columns, selectedRowId } = useJobColumns();
  return (
    <Container padding="md" bgc="white" border_radius="lg" border="sm">
      <ResizableTable
        searchProperty={["name"]}
        columns={columns}
        isLoading={isLoading}
        selectedRowId={selectedRowId}
        data={tableData}
      />
    </Container>
  );
};

export default JobTable;
