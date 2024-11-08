import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styled from "styled-components";

const StyledDatePicker = styled(DayPicker)`
  .my-today {
    background-color: #04aa61;
    color: var(--color-white);
    font-weight: bold;
    border-radius: 50%;
  }
  .my-selected:not([disabled]) {
    background-color: #04aa61;
    color: var(--color-white);
    font-weight: bold;
    border-radius: 50%;
  }
  .my-selected:hover:not([disabled]) {
    background-color: #04aa61;
    color: var(--color-white);
    font-weight: bold;
    border-radius: 50%;
  }
  .DayPicker-Day:hover:not([disabled]) {
    background-color: initial; /* Remove background color on hover */
    border-color: green; /* Apply green border color on hover */
  }
`;

export function DayPickerCalender() {
  const [selected, setSelected] = useState<Date>();
  return (
    <>
      <StyledDatePicker
        disableNavigation
        mode="single"
        selected={selected}
        onSelect={setSelected}
        modifiersClassNames={{
          selected: "my-selected",
          today: selected ? "" : "my-today",
        }}
      />
    </>
  );
}
