import { flexRender, Table } from "@tanstack/react-table";
import styled from "styled-components";
import { StyledRow } from "./table.styles";
import TableEmptyState from "./EmptyTableState";
import SecondaryTable from "@features/jobs/SecondaryTable";
import { Container } from "@components/container/Container";

export const StyledBody = styled.tbody`
  text-align: center;
  position: relative;
`;
type TableBodyProps<TData> = {
  table: Table<TData>;
  filteredData: TData[];
  columns: any[];
  selectedRowId?: string;
};
const TableBody = <TData,>({
  table,
  filteredData,
  columns,
  selectedRowId,
}: TableBodyProps<TData>) => {
  return (
    <StyledBody>
      {filteredData.length === 0 && (
        <TableEmptyState message="Nothing to show" colSpan={columns.length} />
      )}
      {table.getRowModel().rows.map(row => {
        const isActive = selectedRowId && selectedRowId === row.original.jobId;
        return (
          <>
            <StyledRow
              key={row.id}
              style={{
                backgroundColor: isActive ? "var(--color-light-green)" : "transparent",
                transition: "background-color 0.3s ease",
              }}
            >
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  style={{
                    padding: "0.5rem",
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </StyledRow>
            {selectedRowId && selectedRowId === row.original.jobId && (
              <tr>
                <td colSpan={columns.length}>
                  <Container padding="md" bgc="white" border_radius="lg" border="sm">
                    <SecondaryTable jobId={selectedRowId} />
                  </Container>
                </td>
              </tr>
            )}
          </>
        );
      })}
    </StyledBody>
  );
};

export default TableBody;
