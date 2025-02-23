import { Controller } from "react-hook-form";
import Select from "react-select";

type Option = {
  label: string;
  value: string | number;
};
type SelectProps = {
  rules?: any;
  name: any;
  options: Option[];
  value?: Option | null;
  control?: any;
  onChange?: (option: Option) => void;
  isCheckbox?: string;
  isLoading?: boolean;
  onDropdownOpen?: any;
};

const customStyles = (isCheckbox: SelectProps["isCheckbox"]) => ({
  control: (provided: any, state: any) => ({
    ...provided,
    background: "transparent",
    display: "flex",
    flexWrap: "wrap",
    width: "auto",
    padding: "0.4rem",
    border:
      isCheckbox && !state.isFocused && !state.menuIsOpen
        ? "none"
        : "1px solid var(--color-grey-300)",
    border_radius: isCheckbox ? "0" : "var(--border-radius-sm)",
    boxShadow: "none",
    "&:hover": {
      border: isCheckbox ? "none" : "1px solid var(--color-grey-300)",
    },
    "&:focus-within": {
      border: isCheckbox ? "none" : "1px solid var(--color-grey-300)", // Prevent focus border
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    background: "white",
    border_radius: "0px",
    marginTop: "-0px",
    width: "100%",
  }),
});

export const SingleSelect = ({
  name,
  control,
  isLoading,
  options,
  rules,
  isCheckbox,
  onDropdownOpen,
}: SelectProps) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Select
              isClearable
              theme={theme => ({
                ...theme,
                border_radius: isCheckbox ? 0 : 4,
                background: "transparent",
                colors: {
                  ...theme.colors,
                  primary25: "",
                  primary: "#04AA61",
                },
                menu: (provided: any) => ({
                  ...provided,
                  background: "transparent",
                  width: "4em",
                }),
              })}
              styles={customStyles(isCheckbox)}
              value={options.find(option => option.value === value) || null}
              onChange={selectedOption => onChange(selectedOption ? selectedOption.value : null)}
              options={options}
              onMenuOpen={onDropdownOpen}
              isLoading={isLoading}
              components={{
                IndicatorSeparator: () => null,
              }}
            />
            {/* {error && <p style={{ color: "red", marginTop: "0.25rem" }}>{error.message}</p>}  */}
          </>
        )}
      />
    </>
  );
};
