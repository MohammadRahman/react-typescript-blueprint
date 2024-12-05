import { usequeryData } from '@context/QueryContext'
import ResizableTable from '@components/table/ResponsiveTable';
import { ColumnDef } from '@tanstack/react-table';
import ActionButtons from '@components/action-button/ActionButtons';

type QueryTableProps = {
  onEdit:(data: any)=> void;
  status: boolean | undefined;
}

const QueryTable = ({onEdit, status: isLoading}:QueryTableProps) => {
    
  const {queryData} = usequeryData();

  console.log("query data", queryData?.list);

    const columns: ColumnDef<any>[] = [
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
            onEdit={(values) => console.log("Edit:", values)} // Replace with actual handler
            isLoading={false} // Adjust based on your loading state
            data={row.original} // Pass the row data
            deleteAccount={(id) => console.log("Delete:", id)} // Replace with actual handler
          />
        ),
        size: 200,
      },
    ];
    
  
  
  
    const tableData = (queryData?.list || []).map((item) => ({
      id: item.id.split("-")[0],
      name: item.name,
      sourceType:  item.type,
      host: item.database?.host || "N/A",
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