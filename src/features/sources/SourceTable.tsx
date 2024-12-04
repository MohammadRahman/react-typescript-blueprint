import { useSourceData } from "@context/SourceContext";
import { CreateSourceFormProps } from "./CreateSourceForm";
import ResizableTable from "@components/table/ResponsiveTable";
import { ColumnDef } from "@tanstack/react-table";
import ActionButtons from "@components/action-button/ActionButtons";
import { DATA_SOURCE_TYPES } from "@constants/source";



type Database = {
  sourceId: string;
  databaseName: string;
  type: number;
  host: string;
  port: number;
  username: string;
  password: string;
  version: number
}

type Source = {
  id: string;
  name: string;
  type: number;
  database: Database
};


type SourceTableProps = {
  onEdit:(data: CreateSourceFormProps['formData'])=> void;
  isLoading: boolean;
}

const SourceTable = ({ onEdit, isLoading }:SourceTableProps) => {
    
  const {sourceData} = useSourceData();

  function findSourceLabel(type: number|string){
    return DATA_SOURCE_TYPES.find(el=> el.value == type)?.label
   }
  
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name", // Matches top-level "name"
      header: "Conn_String",
      size: 50,
    },
    {
      accessorKey: "id", // Matches top-level "id"
      header: "Source ID",
      size: 200,
    },
    {
      id: "sourceType",
      header: "Source Type",
      accessorFn:(row) => findSourceLabel(row.sourceType) || "Unknown", // Custom logic for sourceType
      size: 150,
    },
    {
      id: "status",
      header: "Status",
      accessorFn: (row) => row.database?.host || "N/A", // Access nested "database.host"
      size: 200,
    },
  ];
  



  const tableData = (sourceData?.list || []).map((item) => ({
    id: item.id.split("-")[0],
    name: item.name,
    sourceType:  item.type,
    host: item.database?.host || "N/A",
  }));

    return(
      <ResizableTable searchProperty="name" isLoading={isLoading} columns={columns} data={tableData}/>
    )
  // return (
  //   <Table columns="5fr 4fr 4fr 3fr">
  //         <Table.Header>
  //           <div>Conn_String</div>
  //           <div>Source Name</div>
  //           <div>Test Status</div>
  //           <div>Actions</div>
  //         </Table.Header>
  //         <Table.Body
  //           data={sourceData?.list || []}
            // render={(data: any) => <SourceRow isLoading={isLoading} key={data.id} rowData={data} onEdit={onEdit} />}
  //         />
  //   </Table>
  // )
}

export default SourceTable;