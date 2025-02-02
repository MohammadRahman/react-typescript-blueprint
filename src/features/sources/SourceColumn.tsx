import ActionButtons from "@components/action-button/ActionButtons";
import { ColumnDef } from "@tanstack/react-table";
import { useDelete } from "./useDelteSource";
import { DATA_SOURCE_TYPES } from "@constants/source";
import { useSourceData } from "@context/SourceContext";
import Tag from "@components/tag/Tag";

type TableColProps = {
  onEdit: (values: any) => void;
};

export const useSourceColumn = ({ onEdit }: TableColProps) => {
  const { sourceData } = useSourceData();
  const { deleteAccount } = useDelete();

  function findSourceLabel(type: number | string) {
    return DATA_SOURCE_TYPES.find(el => el.value == type)?.label;
  }
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "formatedId",
      header: "ID",
      size: 200,
    },
    {
      accessorKey: "name",
      header: "Conn_String",
      size: 200,
    },
    {
      id: "type",
      header: "Source Type",
      accessorFn: row => findSourceLabel(row.type) || "Unknown",
      size: 150,
    },
    {
      id: "status",
      header: "Status",
      cell: () => {
        const currentLength = sourceData?.list.length || 0;
        if (currentLength < currentLength + 1) {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Tag tagType="normal" type="green">
                Success
              </Tag>
            </div>
          );
        }
      },
      size: 150,
      meta: { align: "center" },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <ActionButtons
          onEdit={values => onEdit(values)}
          isLoading={false}
          data={row.original}
          deleteAccount={() => deleteAccount(row.original.id)}
        />
      ),
      size: 150,
    },
  ];

  const tableData = (sourceData?.list || []).map(item => ({
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

  return { columns, tableData };
};
