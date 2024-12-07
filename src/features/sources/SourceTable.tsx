import { useSourceData } from "@context/SourceContext";
import { CreateSourceFormProps } from "./CreateSourceForm";
import ResizableTable from "@components/table/ResponsiveTable";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ActionButtons from "@components/action-button/ActionButtons";
import { DATA_SOURCE_TYPES } from "@constants/source";
import { useDelete } from "./useDelteSource";
import { useState } from "react";

type SourceTableProps = {
  onEdit: (data: CreateSourceFormProps["formData"]) => void;
  isLoading: boolean;
};
const PAGE_SIZE = 5;

const SourceTable = ({ onEdit, isLoading }: SourceTableProps) => {
  const { sourceData } = useSourceData();
  const { deleteAccount } = useDelete();
  // const [currentPage, setCurrentPage] = useState(1);

  // const startIndex = (currentPage - 1) * PAGE_SIZE;
  // const endIndex = startIndex + PAGE_SIZE;

  function findSourceLabel(type: number | string) {
    return DATA_SOURCE_TYPES.find(el => el.value == type)?.label;
  }

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Conn_String",
      size: 150,
    },
    {
      accessorKey: "formatedId",
      header: "ID",
      size: 200,
    },
    {
      id: "type",
      header: "Source Type",
      accessorFn: row => findSourceLabel(row.type) || "Unknown",
      size: 150,
    },
    {
      id: "databaseHost",
      header: "Database Host",
      accessorFn: row => row.database?.host || "N/A", // Nested field access
      size: 200,
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <ActionButtons
          onEdit={values => onEdit(values)} // Pass the data for editing
          isLoading={false} // Adjust based on your loading state
          data={row.original} // Full row data
          deleteAccount={() => deleteAccount(row.original.id)} // Delete handler
        />
      ),
      size: 200,
    },
  ];

  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  // };

  const tableData = (sourceData?.list || [])
    // .slice(startIndex, endIndex)
    .map(item => ({
      id: item.id,
      formatedId: item.id.split("-")[0],
      name: item.name,
      type: item.type,
      database: {
        databaseName: item.database?.databaseName || "N/A",
        sourceType: findSourceLabel(item.database?.sourceType) || "Unknown",
        host: item.database?.host || "N/A",
        port: item.database?.port || "N/A",
        username: item.database?.username || "N/A",
        password: item.database?.password || "N/A",
      },
    }));

  return (
    <ResizableTable
      searchProperty="name"
      isLoading={isLoading}
      columns={columns}
      data={tableData}
      // currentPage={currentPage}
      // handleChange={handlePageChange}
    />
  );
};

export default SourceTable;
