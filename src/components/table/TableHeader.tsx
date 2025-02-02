import { flexRender, RowData, Table } from "@tanstack/react-table";
import React from "react";
import styled from "styled-components";
import { StyledTh } from "./table.styles";

export const StyledHeader = styled.thead`
  padding: 1rem 2.4rem;
  width: 100%;
  background-color: var(--color-grey-20);
  border-bottom: 1px solid var(--color-grey-100);
  /* text-transform: uppercase; */
  /* letter-spacing: 0.1px; */
  font-weight: 400;
  color: var(--color-grey-600);
  &:hover {
    border-right: 1px solid black;
  }
  &:focus {
    border-right: 1px solid var(--color-grey-100);
  }
`;

type TableHeaderProps<TData> = {
  table: Table<TData>;
};

const TableHeader = <TData,>({ table }: TableHeaderProps<TData>) => {
  return (
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
  );
};

export default TableHeader;
