import ResizableTable from '@components/table/ResponsiveTable'
import { useDeleteTemplate } from './useDeleteTemplate';
import { ColumnDef } from '@tanstack/react-table';
import { useTemplateData } from '@context/TemplateContext';
import ActionButtons from '@components/action-button/ActionButtons';
import { formatString } from '@utils/helper';

const TemplateTable = () => {

    const {template} = useTemplateData();
    const {deleteTemplate} = useDeleteTemplate();

    const columns: ColumnDef<any>[] = [
        {
          accessorKey: "id",
          header: "",
          size: 0,
          cell: ()=> null
        },
        {
          accessorKey: "name",
          header: "Name",
          size: 150
        },
        {
          accessorKey: "subject",
          header: "Subject",
          size: 150
        },
        {
          accessorKey: "body",
          header: "Description",
          size: 150
        },
        {
          accessorKey: "to",
          header: "To",
          size: 150
        },
        {
          accessorKey: "queryId",
          header: "",
          size: 0,
          cell: ()=> null
        },
        {
          id: "actions", // Custom column for actions
          header: "Action",
          cell: ({ row }) => (
            <ActionButtons
            //   onEdit={(values) => onEdit(values)} 
              isModal={true}
              modalName="emailTemplate"
              isLoading={false}
              data={row.original}
              deleteAccount={() => deleteTemplate(row.original.id)}
            />
          ),
          size: 150,
        },
      ]
      const tableData = Array.isArray(template?.list)
      ? template.list.map(item => ({
            id: item.id || "Unknown ID",
            name: item.name || "Unknown Name",
            subject: item.subject || "No Subject",
            body: formatString(item.body || ""),
            to: item.to || "Unknown",
            queryId: item.queryId
        }))
      : [];
    
  return (
    <ResizableTable searchProperty="name" columns={columns} data={tableData}/>
  )
}

export default TemplateTable;