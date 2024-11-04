import { Table } from "@components/table";

interface MailServerRowProps{
  rowData: {
    someData: string;
    someData1: string;
    someData2: string;
    someData3: string;
    someData4: string;
    someData5: string;
  }
}

export const MailServerRow = ({ rowData }: MailServerRowProps) => {
  return (
    <Table.Row>
      <div>{rowData.someData}</div>
      <div>{rowData.someData1}</div>
      <div>{rowData.someData2}</div>
      <div>{rowData.someData3}</div>
      <div>{rowData.someData4}</div>
      <div>{rowData.someData5}</div>
    </Table.Row>
  );
};
