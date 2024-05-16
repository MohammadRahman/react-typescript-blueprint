import { Table } from "@components/table";
import React from "react";

export const MailServerRow = ({ rowData }) => {
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
