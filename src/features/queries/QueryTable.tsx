import { useQueryColumns } from "@components/table/columns/QueryColumns";
import ResizableTable from "@components/table/ResponsiveTable";

type QueryTableProps = {
  onEdit: (data: any) => void;
  status: boolean | undefined;
  // setShowDataView: (t: boolean) => void;
};
const QueryTable = ({ onEdit, status: isLoading }: QueryTableProps) => {
  const { columns, tableData } = useQueryColumns({ onEdit });
  return (
    <ResizableTable
      heading="Others Queries"
      searchProperty="name"
      isLoading={isLoading}
      columns={columns}
      data={tableData}
    />
  );
};

export default QueryTable;
