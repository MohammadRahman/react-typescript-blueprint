import { Row } from "@components/row";
import { InputWrapper } from "./table.styles";
import { SearchIcon } from "./ResponsiveTable";
import styled from "styled-components";
import Input from "@components/form/Input";
import { useCallback, useEffect, useRef, useState } from "react";
import { CiFilter } from "react-icons/ci";
import FiltersAndSorts from "@components/filters-and-sorts/FiltersAndSorts";
import { HiOutlineCog8Tooth } from "react-icons/hi2";
import Dropdown from "@components/dropdown/Dropdown";
import Checkbox from "@components/form/CheckBox";
import { Table } from "@tanstack/react-table";

const StyledInput = styled(Input)`
  padding-left: 2.5rem;
  &:focus {
    box-shadow: 0 0 3px rgba(0, 123, 255, 0.5);
  }
`;

type TableOpsProps<TData> = {
  searchProperty: string | string[] | undefined;
  data: any[];
  table: Table<TData>;
  setFilteredData: any;
};

const TableOperations = <TData,>({
  searchProperty,
  data,
  table,
  setFilteredData,
}: TableOpsProps<TData>) => {
  const [searchProps, setSearchProps] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ x: number; y: number } | null>(null);
  const [columnToggler, setColumnToggler] = useState(false);

  const placeHolder = Array.isArray(searchProperty)
    ? `${searchProperty.join(", ")}`
    : `${searchProperty}`;

  const handleSearchQuery = useCallback(() => {
    if (searchProps.trim()) {
      const propertiesToSearch = Array.isArray(searchProperty) ? searchProperty : [searchProperty];

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

  const handleSearchChange = (e: any) => {
    setSearchProps(e.target.value);
  };

  const handleToggleDropdown = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        x: rect.x,
        y: rect.y + rect.height + 8,
      });
    }
    setColumnToggler(prev => !prev);
  };
  useEffect(() => {
    handleSearchQuery();
  }, [searchProps, handleSearchQuery]);

  return (
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
  );
};

export default TableOperations;
