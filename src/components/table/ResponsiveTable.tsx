import { useMemo, useState } from "react";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  ColumnResizeMode,
  ColumnDef,
  PaginationState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Table } from "./Table";
import { Pagination } from "@components/pagination";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

import Spinner from "@components/spinner/Spinner";
import { StyledTable } from "./table.styles";
import styled from "styled-components";
import TableOperations from "./TableOperations";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Heading from "@components/heading/Heading";
import { Loader } from "@components/spinner";

export const SearchIcon = styled(HiOutlineMagnifyingGlass)`
  position: absolute;
  left: 5px;
  color: gray;
  pointer-events: none;
`;

type TableProps<TData extends object> = {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  isLoading?: boolean;
  searchProperty?: string | string[];
  heading?: string;
  selectedRowId?: string;
  showOperations?: boolean;
};

const ResizableTable = <TData extends object>({
  data,
  columns,
  searchProperty,
  isLoading,
  heading,
  selectedRowId,
  showOperations = true,
}: TableProps<TData>) => {
  const [filteredData, setFilteredData] = useState(data);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnResizeMode, _] = useState<ColumnResizeMode>("onChange");
  const [columnSizing, setColumnSizing] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const currentData = useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, pagination.pageIndex, pagination.pageSize]);

  const table = useReactTable({
    data: currentData,
    columns,
    filterFns: {},
    state: {
      pagination,
      columnVisibility,
      columnSizing,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnSizingChange: setColumnSizing,
    onPaginationChange: setPagination,
    columnResizeMode,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  });

  if (isLoading) return <Loader loading={isLoading} />;
  // if (isLoading) return <Spinner />;

  return (
    <div>
      {showOperations ? (
        <TableOperations
          data={data}
          setFilteredData={setFilteredData}
          searchProperty={searchProperty}
          table={table}
        />
      ) : null}

      <div style={{ overflowX: "auto" }}>
        <div style={{ minWidth: "100%" }}>
          {heading && (
            <Heading as="h2" style={{ paddingBottom: "1.5rem" }}>
              {heading}
            </Heading>
          )}
          <StyledTable>
            <TableHeader table={table} />
            <TableBody
              selectedRowId={selectedRowId}
              table={table}
              filteredData={filteredData}
              columns={columns}
            />
          </StyledTable>
        </div>
      </div>
      <Table.Footer>
        <Pagination pageSize={pagination.pageSize} count={filteredData.length} tableI={table} />
      </Table.Footer>
    </div>
  );
};

export default ResizableTable;
