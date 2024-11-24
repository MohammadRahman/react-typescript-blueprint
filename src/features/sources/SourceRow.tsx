import { Table } from "@components/table";
import { DATA_SOURCE_TYPES } from "./Sources";

interface SourceRowProps {
  rowData: {
    name: string;
    type: string | number;
    status: 1 | 2;
  }
}

export const SourceRow = ({ rowData }: SourceRowProps) => {

console.log("row data", rowData);

  const statusToTagName = {
    1: "green-Success",
    2: "red-Failed",
  };
  function findSourceLabel(type: number|string){
   return DATA_SOURCE_TYPES.find(el=> el.value == type)?.label
  }
  console.log("source-type", rowData.type);
  return (
    <Table.Row>
      <div>{rowData.name}</div>
      <div>{findSourceLabel(rowData.type)}</div>
      {/* <Tag type={statusToTagName[rowData.status].split("-")[0]}> */}
        {/* {statusToTagName[rowData.status].split("-")[1]} */}
      {/* </Tag> */}
    </Table.Row>
  );
};
