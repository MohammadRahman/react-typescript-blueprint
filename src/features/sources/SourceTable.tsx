import { Table } from "@components/table"
import { SourceRow } from "./SourceRow";
import { useSourceData } from "@context/SourceContext";
import { CreateSourceFormProps } from "./CreateSourceForm";


type SourceTableProps = {
  onEdit:(data: CreateSourceFormProps['formData'])=> void
}

const SourceTable = ({ onEdit }:SourceTableProps) => {
    // const sourceData = getSourceMock();
    const {sourceData} = useSourceData();
    
  return (
    <Table columns="5fr 4fr 4fr 3fr">
          <Table.Header>
            <div>Conn_String</div>
            <div>Source Name</div>
            <div>Test Status</div>
            <div>Actions</div>
          </Table.Header>
          <Table.Body
            data={sourceData?.list || []}
            render={(data: any) => <SourceRow key={data.id} rowData={data} onEdit={onEdit} />}
          />
    </Table>
  )
}

export default SourceTable