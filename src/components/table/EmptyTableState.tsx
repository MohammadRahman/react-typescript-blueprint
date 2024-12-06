import React from 'react';
import styled from 'styled-components';

// Define the props interface
interface TableEmptyStateProps {
  message: string; // The message to display
  colSpan: number; // Number of columns to span across
}

// Styled component for the empty message
const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

// Functional component with TypeScript
const TableEmptyState: React.FC<TableEmptyStateProps> = ({ message, colSpan }) => (
  <tr>
    <td colSpan={colSpan} style={{ textAlign: "center", padding: "2rem" }}>
      <Empty>{message}</Empty>
    </td>
  </tr>
);

export default TableEmptyState;
