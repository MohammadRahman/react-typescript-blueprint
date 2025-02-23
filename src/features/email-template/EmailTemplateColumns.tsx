import { ColumnDef } from "@tanstack/react-table";
import { useDeleteTemplate } from "./useDeleteTemplate";
import { useTemplateData } from "@context/TemplateContext";
import { formatString, transformLongString } from "@utils/helper";
import ActionButtons from "@components/action-button/ActionButtons";

export function useEmailTemplateColumns() {
  const { template } = useTemplateData();
  const { deleteTemplate } = useDeleteTemplate();

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "",
      size: 0,
      cell: () => null,
    },
    {
      accessorKey: "name",
      header: "Name",
      size: 150,
    },
    {
      accessorKey: "subject",
      header: "Subject",
      size: 150,
    },
    {
      accessorKey: "body",
      header: "Description",
      size: 350,
      cell: ({ row }) => {
        const formatedText = transformLongString(row.original.body);
        return (
          <div style={{ display: "flex", alignItems: "flex-start", padding: "1rem" }}>
            <span>{formatedText}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "to",
      header: "To",
      size: 150,
    },
    {
      accessorKey: "queryId",
      header: "",
      size: 0,
      cell: () => null,
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <ActionButtons
          isModal={true}
          modalName="emailTemplate"
          isLoading={false}
          data={row.original}
          deleteAccount={() => deleteTemplate(row.original.id)}
        />
      ),
      size: 150,
    },
  ];
  const tableData = Array.isArray(template?.list)
    ? template.list.map(item => ({
        id: item.id || "Unknown ID",
        name: item.name || "Unknown Name",
        subject: item.subject || "No Subject",
        body: formatString(item.body || ""),
        to: item.to || "Unknown",
        queryId: item.queryId,
      }))
    : [];
  return { tableData, columns };
}
