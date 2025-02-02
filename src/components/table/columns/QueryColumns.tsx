import ActionButtons from "@components/action-button/ActionButtons";
import { usequeryData } from "@context/QueryContext";
import { useDeleteQuery } from "@features/queries/useDeleteQuery";
import { ColumnDef } from "@tanstack/react-table";

type TableColProps = {
  onEdit: (values: any) => void;
};

export const useQueryColumns = ({ onEdit }: TableColProps) => {
  const { queryData } = usequeryData();
  const { deleteQuery } = useDeleteQuery();

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "",
      size: 0,
      cell: () => null,
    },
    {
      accessorKey: "name",
      header: "Sources",
      size: 50,
    },
    {
      accessorKey: "body",
      header: "SQL Query",
      accessorFn: row => (row.body !== "" ? "Yes" : "No"),
      size: 200,
    },
    {
      accessorKey: "sourceId",
      header: "Connection to Database",
      accessorFn: row => (row.sourceId !== "" ? "Yes" : "No"),
      size: 200,
    },
    {
      accessorKey: "clientId",
      header: "Client Id",
      accessorFn: row => (row.clientId !== "" ? "Yes" : "No"),
      size: 200,
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <ActionButtons
          onEdit={() => onEdit(row.original)}
          isDetails={true}
          isLoading={false}
          data={row.original}
          deleteAccount={() => deleteQuery(row.original.originalId)}
        />
      ),
      size: 200,
    },
  ];

  const tableData = (queryData?.list || []).map(item => ({
    id: item.id,
    formattedId: item.id.split("-")[0],
    name: item.name,
    sourceId: item.sourceId,
    clientId: item.clientId,
    body: item.body,
  }));

  return { columns, tableData };
};
