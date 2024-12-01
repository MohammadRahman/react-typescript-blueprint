import { Table } from '@components/table'
import { usequeryData } from '@context/QueryContext'
import { QueryRow } from './QueryRow';

type QueryTableProps = {
  onEdit:(data: any)=> void;
  status: boolean | undefined;
}

const QueryTable = ({onEdit, status}:QueryTableProps) => {
    const {queryData} = usequeryData();
  return (
    <Table columns="2fr 2fr 2fr 2fr">
          <Table.Header>
            <div>Sources</div>
            <div>SQL Query</div>
            <div>Connection to Database</div>
            <div>Action</div>
          </Table.Header>
          <Table.Body data={queryData?.list || []} render={(el: any) => 
            <QueryRow onEdit={onEdit} isLoading={status} key={el.id} rowData={el} />} 
            />
        </Table>
  )
}

export default QueryTable