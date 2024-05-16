import { Table } from "@components/table";
import Tag from "@components/tag/Tag";
import React from "react";

export const SourceRow = ({ rowData }) => {
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
