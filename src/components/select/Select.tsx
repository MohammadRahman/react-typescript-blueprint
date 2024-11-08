import { Controller } from "react-hook-form";
import Select from "react-select";

type Option = {
  label: string;
  value: string;
};
type SelectProps = {
  name: any;
  options: Option[];
  value?: Option | null;
  control?: any;
  onChange?: (option: Option) => void;
};

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    background: "transparent",
    display: "flex",
    flexWrap: "wrap",
    width: "auto",
    padding: "0.4rem",
  }),
  menu: (provided: any) => ({
    ...provided,
    background: "white",
    borderRadius: "0px",
    marginTop: "-0px",
    width: "100%",
  }),
};

export const SingleSelect = ({ name, control, options }: SelectProps) => {
  // const [selectedOption, setSelectedOption] = useState(null);
  // const handleChange = (selectedOption: any) => {
  //   setSelectedOption(selectedOption);
  // };

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            theme={theme => ({
              ...theme,
              borderRadius: 4,
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
            styles={customStyles}
            // value={selectedOption}
            // onChange={handleChange}
            value={options.find(option => option.value === value)}
            onChange={selectedOption => onChange(selectedOption?.value)}
            options={options}
            components={{
              IndicatorSeparator: () => null,
            }}
          />
        )}
      />
    </>
  );
};
