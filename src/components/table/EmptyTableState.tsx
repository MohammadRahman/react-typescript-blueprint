import React from "react";
import styled from "styled-components";

interface TableEmptyStateProps {
  message: string;
  colSpan: number;
}

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableEmptyState: React.FC<TableEmptyStateProps> = ({ message, colSpan }) => (
  <tr>
    <td colSpan={colSpan} style={{ textAlign: "center", padding: "2rem" }}>
      <Empty>{message}</Empty>
    </td>
  </tr>
);

export default TableEmptyState;
