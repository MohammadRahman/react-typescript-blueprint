import { useMemo } from "react";
import { useTable, useColumnOrder } from "react-table";
import "./table.styles.css";
import Checkbox from "@components/form/CheckBox";

type TableProps = {
  tableColumns: Array<{ Header: string; accessor: string }>;
  tableData: Array<any>;
};

const ReactTable = ({ tableColumns, tableData }: TableProps) => {
  const columns = useMemo(() => tableColumns, []);
  const data = useMemo(() => tableData, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable(
    {
      columns,
      data,
    },
    useColumnOrder
  );

  return (
    <>
      <div>
        <Checkbox {...getToggleHideAllColumnsProps()}>Toggle All</Checkbox>
        {allColumns.map(column => (
          <div key={column.id}>
            <Checkbox {...column.getToggleHiddenProps()}>{column.Header}</Checkbox>
          </div>
        ))}
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ReactTable;
