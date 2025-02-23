import ResizableTable from "@components/table/ResponsiveTable";
import { Container } from "@components/container/Container";
import { useEmailTemplateColumns } from "./EmailTemplateColumns";

type TemplateTableProps = {
  isLoading: boolean;
};
const TemplateTable = ({ isLoading }: TemplateTableProps) => {
  const { tableData, columns } = useEmailTemplateColumns();

  return (
    <Container padding="md" bgc="white" border_radius="lg" border="sm">
      <ResizableTable
        isLoading={isLoading}
        searchProperty={["name"]}
        columns={columns}
        data={tableData}
      />
    </Container>
  );
};

export default TemplateTable;
