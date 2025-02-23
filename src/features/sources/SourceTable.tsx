import { CreateSourceFormProps } from "./CreateSourceForm";
import ResizableTable from "@components/table/ResponsiveTable";
import { useSourceColumn } from "./SourceColumn";

type SourceTableProps = {
  onEdit: (data: CreateSourceFormProps["formData"]) => void;
  isLoading: boolean;
};
const SourceTable = ({ onEdit, isLoading }: SourceTableProps) => {
  const { columns, tableData } = useSourceColumn({ onEdit });
  return (
    <ResizableTable
      searchProperty="name"
      isLoading={isLoading}
      columns={columns}
      data={tableData}
      heading="Others Operation"
    />
  );
};

export default SourceTable;
