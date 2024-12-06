import { usequeryData } from '@context/QueryContext'
import ResizableTable from '@components/table/ResponsiveTable';
import { ColumnDef } from '@tanstack/react-table';
import ActionButtons from '@components/action-button/ActionButtons';
import { useDeleteQuery } from './useDeleteQuery';

type QueryTableProps = {
  onEdit:(data: any)=> void;
  status: boolean | undefined;
}
const QueryTable = ({onEdit, status: isLoading}:QueryTableProps) => {
    
  const {queryData} = usequeryData();
  const {deleteQuery} = useDeleteQuery()


    const columns: ColumnDef<any>[] = [
      {
        accessorKey: "id", // Matches top-level "name"
        header: "",
        size: 0,
        cell: ()=> null
      },
      {
        accessorKey: "name", // Matches top-level "name"
        header: "Sources",
        size: 50,
      },
      {
        accessorKey: "body", // Matches top-level "body"
        header: "SQL Query",
        accessorFn: (row) => (row.body !== "" ? "Yes" : "No"), // Check if body is not empty
        size: 200,
      },
      {
        accessorKey: "sourceId", // Matches top-level "sourceId"
        header: "Connection to Database",
        accessorFn: (row) => (row.sourceId !== "" ? "Yes" : "No"), // Check if sourceId is not empty
        size: 200,
      },
      {
        id: "actions", // Custom column for actions
        header: "Action",
        cell: ({ row }) => (
          <ActionButtons
            onEdit={(values) => onEdit(values)} // Replace with actual handler
            isLoading={false} // Adjust based on your loading state
            data={row.original} // Pass the row data
            deleteAccount={() => deleteQuery(row.original.originalId)} // Replace with actual handler
          />
        ),
        size: 200,
      },
    ];
    
  
  
  
    const tableData = (queryData?.list || []).map((item) => ({
      id: item.id,
      formatedId: item.id.split("-")[0],
      name: item.name,
      sourceId:  item.sourceId,
      body: item.body,
    }));

      return(
        <ResizableTable searchProperty="name" isLoading={isLoading} columns={columns} data={tableData}/>
      )
  // return (
  //   <Table columns="2fr 2fr 2fr 2fr">
  //         <Table.Header>
  //           <div>Sources</div>
  //           <div>SQL Query</div>
  //           <div>Connection to Database</div>
  //           <div>Action</div>
  //         </Table.Header>
  //         <Table.Body data={queryData?.list || []} render={(el: any) => 
  //           <QueryRow onEdit={onEdit} isLoading={status} key={el.id} rowData={el} />} 
  //           />
  //       </Table>
  // )
}

export default QueryTable