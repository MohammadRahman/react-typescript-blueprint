import Button from "@components/button/Button";
import { Table } from "@components/table";
import React from "react";

export const QueryRow = ({ rowData }) => {
  return (
    <Table.Row>
      <div>{rowData.dataSource}</div>
      <div>{rowData.isSqlQuery && rowData.isSqlQuery ? "Yes" : "-"}</div>
      <div>{rowData.isDatabaseConnection && rowData.isDatabaseConnection ? "Yes" : "-"}</div>
      <Button variation="outlinePrimary" type="small">
        Show Data
      </Button>
    </Table.Row>
  );
};
