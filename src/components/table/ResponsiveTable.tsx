import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  ColumnResizeMode,
  flexRender,
  ColumnDef,
  PaginationState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Table } from "./Table";
import { Pagination } from "@components/pagination";
import { Row } from "@components/row";
import Input from "@components/form/Input";
import Button from "@components/button/Button";
import { HiOutlineCog8Tooth, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { CiFilter } from "react-icons/ci";
import Dropdown from "@components/dropdown/Dropdown";
import Checkbox from "@components/form/CheckBox";
import Spinner from "@components/spinner/Spinner";
import {
  Empty,
  EmptyWrapper,
  InputWrapper,
  StyledBody,
  StyledHeader,
  StyledRow,
  StyledTable,
  StyledTh,
} from "./table.styles";
import styled from "styled-components";
import TableEmptyState from "./EmptyTableState";
import { RiH2 } from "react-icons/ri";
import FiltersAndSorts from "@components/filters-and-sorts/FiltersAndSorts";
import { Filter } from "@components/filters-and-sorts/Filter";

export const SearchIcon = styled(HiOutlineMagnifyingGlass)`
  position: absolute;
  left: 10px;
  color: gray; /* Adjust color */
  pointer-events: none; /* Prevent interaction with the icon */
`;
const StyledInput = styled(Input)`
  padding-left: 2.5rem;
  &:focus {
    box-shadow: 0 0 3px rgba(0, 123, 255, 0.5);
  }
`;

type TableProps<TData extends object> = {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  isLoading?: boolean;
  searchProperty?: string | string[];
};

const ResizableTable = <TData extends object>({
  data,
  columns,
  searchProperty,
  isLoading,
}: TableProps<TData>) => {
  const [searchProps, setSearchProps] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [showFilter, setShowFilter] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnResizeMode, setColumnResizeMode] = useState<ColumnResizeMode>("onChange");
  const [columnSizing, setColumnSizing] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [columnToggler, setColumnToggler] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{ x: number; y: number } | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        x: rect.x,
        y: rect.y + rect.height + 8, // Add 8px for spacing
      });
    }
    setColumnToggler(prev => !prev);
  };
  const handleSearchChange = (e: any) => {
    setSearchProps(e.target.value);
  };

  // handleMultiple searchProperty
  const handleSearchQuery = useCallback(() => {
    if (searchProps.trim()) {
      // Convert searchProperty to an array if it's a single string
      const propertiesToSearch = Array.isArray(searchProperty) ? searchProperty : [searchProperty];

      // Filter data based on multiple properties
      const result = data.filter((item: any) =>
        propertiesToSearch.some((property: any) =>
          String(item[property] || "")
            .toLowerCase()
            .includes(searchProps.toLowerCase())
        )
      );
      setFilteredData(result);
    } else {
      setFilteredData(data);
    }
  }, [searchProps, searchProperty, data]);
  useEffect(() => {
    handleSearchQuery();
  }, [searchProps, handleSearchQuery]);

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

  // Sync filteredData with data whenever data changes
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  if (isLoading) return <Spinner />;

  const placeHolder = Array.isArray(searchProperty)
    ? `Search by ${searchProperty.join(", ")}`
    : `Search by ${searchProperty}`;

  return (
    <div>
      <div style={{ position: "relative" }}>
        <Row type="horizontal" style={{ paddingBottom: "3rem" }}>
          <InputWrapper>
            <SearchIcon />
            <StyledInput
              style={{ overflowX: "scroll", whiteSpace: "nowrap" }}
              onChange={handleSearchChange}
              value={searchProps}
              placeholder={placeHolder}
            />
            <div style={{ marginLeft: "1rem", display: "flex", alignItems: "center" }}>
              <CiFilter size={24} onClick={() => setShowFilter(prev => !prev)} />
              {showFilter && (
                <div style={{ marginLeft: "2rem" }}>
                  <FiltersAndSorts />
                </div>
              )}
            </div>
          </InputWrapper>

          <div>
            <HiOutlineCog8Tooth size={24} onClick={handleToggleDropdown} />
          </div>
          {columnToggler && (
            <Dropdown>
              <div style={{ marginBottom: "1rem" }}>
                <Checkbox
                  id="all"
                  checked={table.getAllColumns().every(column => column.getIsVisible())}
                  onChange={() => {
                    const allVisible = table.getAllColumns().every(column => column.getIsVisible());
                    table.getAllColumns().forEach(column => column.toggleVisibility(!allVisible));
                  }}
                >
                  <span>Toggle All</span>
                </Checkbox>
              </div>
              {table.getAllColumns().map(column => (
                <div key={column.id}>
                  <Checkbox
                    id={column.id}
                    checked={column.getIsVisible()}
                    onChange={() => column.toggleVisibility(!column.getIsVisible())}
                  >
                    <span>{column.id}</span>
                  </Checkbox>
                </div>
              ))}
            </Dropdown>
          )}
        </Row>
      </div>
      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <div style={{ minWidth: "100%" }}>
          <StyledTable>
            <StyledHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <StyledTh key={header.id} colSpan={header.colSpan} width={header.getSize()}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanResize() && (
                        <div
                          {...{
                            onMouseDown: e => {
                              header.getResizeHandler()(e);
                              e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.1)"; // Highlight during resize
                            },
                            onMouseUp: e => {
                              e.currentTarget.style.backgroundColor = "transparent"; // Reset after resize
                            },
                            onTouchStart: header.getResizeHandler(),
                            style: {
                              position: "absolute",
                              right: 0,
                              top: 0,
                              bottom: 0,
                              width: "5px",
                              cursor: "col-resize",
                              //   backgroundColor: "rgba(0, 0, 0, 0.1)",
                              zIndex: 1,
                              transition: "background-color 0.2s ease",
                            },
                            // onMouseEnter: (e) =>
                            //   (e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.3)"),
                            onMouseLeave: e =>
                              //   (e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.1)"),
                              (e.currentTarget.style.backgroundColor = "transparent"),
                          }}
                        />
                      )}
                      {/* {header.column.getCanFilter() ? (
                            <div>
                              <Filter filterVariant={''} column={header.column} />
                            </div>
                      ) : null} */}
                    </StyledTh>
                  ))}
                </tr>
              ))}
            </StyledHeader>
            <StyledBody>
              {filteredData.length === 0 && (
                <TableEmptyState message="Nothing to show" colSpan={columns.length} />
              )}
              {table.getRowModel().rows.map(row => (
                <StyledRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      style={{
                        // border: "1px solid black",
                        padding: "0.5rem",
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </StyledRow>
              ))}
            </StyledBody>
          </StyledTable>
        </div>
      </div>
      <Table.Footer>
        <Pagination count={filteredData.length} tableI={table} />
      </Table.Footer>
    </div>
  );
};

export default ResizableTable;
