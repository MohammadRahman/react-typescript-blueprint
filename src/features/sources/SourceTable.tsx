import { Table } from "@components/table"
import { SourceRow } from "./SourceRow";
import { useSourceData } from "@context/SourceContext";

const SourceTable = () => {
    // const sourceData = getSourceMock();
    const {sourceData} = useSourceData();
    
console.log("sourceData in table", sourceData);
  return (
    <Table columns="5fr 5fr 3fr">
          <Table.Header>
            <div>Conn_String</div>
            <div>Source Name</div>
            <div>Test Status</div>
          </Table.Header>
          <Table.Body
            data={sourceData?.list || []}
            render={(data: any) => <SourceRow key={data.id} rowData={data} />}
          />
    </Table>
  )
}

export default SourceTable