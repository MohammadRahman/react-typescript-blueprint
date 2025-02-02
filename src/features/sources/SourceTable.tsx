import { useSourceData } from "@context/SourceContext";
import { CreateSourceFormProps } from "./CreateSourceForm";
import ResizableTable from "@components/table/ResponsiveTable";
import { ColumnDef } from "@tanstack/react-table";
import ActionButtons from "@components/action-button/ActionButtons";
import { DATA_SOURCE_TYPES } from "@constants/source";
import { useDelete } from "./useDelteSource";
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
