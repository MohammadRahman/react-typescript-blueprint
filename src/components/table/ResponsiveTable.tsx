import { useCallback, useEffect, useRef, useState } from "react";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  ColumnResizeMode,
  flexRender,
  ColumnDef,
  PaginationState,
} from "@tanstack/react-table";
import { Table } from "./Table";
import { Pagination } from "@components/pagination";
import { Row } from "@components/row";
import Input from "@components/form/Input";
import Button from "@components/button/Button";
import { HiOutlineCog8Tooth } from "react-icons/hi2";
import { CiFilter } from "react-icons/ci";
import Dropdown from "@components/dropdown/Dropdown";
import Checkbox from "@components/form/CheckBox";
import Spinner from "@components/spinner/Spinner";
import { Empty, StyledBody, StyledHeader, StyledRow, StyledTable, StyledTh } from "./table.styles";

type TableProps<TData extends object> = {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  isLoading?: boolean;
  searchProperty?: string;
};

const ResizableTable = <TData extends object>({ data, columns, searchProperty, isLoading }: TableProps<TData>) => {
  const [searchProps, setSearchProps] = useState("");
  const [filteredData, setFilteredData] = useState(data);


  console.log("seacrh text", searchProps);
 
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
  const handleChange = (e: any) => {
    setSearchProps(e.target.value);
  };

  const handleSearchQuery = useCallback(() => {
    if (searchProps.trim() && searchProperty) {
      const result = data.filter((item: any) =>
        String(item[searchProperty])
          .toLowerCase()
          .includes(searchProps.toLowerCase())
      );
      setFilteredData(result);
    } else {
      setFilteredData(data); // Reset to all data if search is cleared
    }
  }, [searchProps, searchProperty, data]);

  // Trigger search query when `searchProps` changes
  useEffect(() => {
    handleSearchQuery();
  }, [searchProps, handleSearchQuery]);
  const table = useReactTable({
    data:filteredData,
    columns,
    state: {
      columnVisibility,
      columnSizing,
      pagination,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnSizingChange: setColumnSizing,
    onPaginationChange: setPagination,
    columnResizeMode,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    pageCount: Math.ceil(data.length / pagination.pageSize),
  });


  // Sync filteredData with data whenever data changes
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div style={{ position: "relative" }}>
        <Row type="horizontal" style={{ paddingBottom: "3rem" }}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Input onChange={handleChange} value={searchProps} placeholder="email or name" />
            <Button type="button" onClick={handleSearchQuery}>search</Button>
          </div>
          <div>
            <HiOutlineCog8Tooth size={24} onClick={handleToggleDropdown} />
            <CiFilter size={24} />
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
                    <StyledTh
                      key={header.id}
                      colSpan={header.colSpan}
                      width={header.getSize()}
                      // style={{
                      //   padding: '1rem',
                      //   position: "relative",                   
                        // width: header.getSize(),
                      // }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanResize() && (
                        <div
                          {...{
                            // onMouseDown: header.getResizeHandler(),
                            // onTouchStart: header.getResizeHandler(),
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
                    </StyledTh>
                  ))}
                </tr>
              ))}
            </StyledHeader>
            <StyledBody>
              {filteredData.length === 0 && <Empty>Nothing to show</Empty>}
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
        <Pagination count={data.length} />
      </Table.Footer>
    </div>
  );
};

export default ResizableTable;
