import { Table } from "@components/table";
import Tag from "@components/tag/Tag";

interface SourceRowProps {
  rowData: {
    name: string;
    dataSource: string;
    status: 1 | 2;
  }
}

export const SourceRow = ({ rowData }: SourceRowProps) => {
  const statusToTagName = {
    1: "green-Success",
    2: "red-Failed",
  };
  return (
    <Table.Row>
      <div>{rowData.name}</div>
      <div>{rowData.dataSource}</div>
      <Tag type={statusToTagName[rowData.status].split("-")[0]}>
        {statusToTagName[rowData.status].split("-")[1]}
      </Tag>
    </Table.Row>
  );
};
