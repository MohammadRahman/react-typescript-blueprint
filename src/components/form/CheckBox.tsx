import styled from "styled-components";

const StyledCheckbox = styled.div`
  display: flex;
  gap: 1.6rem;

  & input[type="checkbox"] {
    appearance: none;
    border: none;
    height: 2.4rem;
    width: 2.4rem;
    cursor: pointer;
    position: relative;
    transition: all 0.3s;
    border: 1px solid black;
    border-radius: 4px;
    accent-color: var(--color-brand-600);

    &:checked {
      border: 1px solid var(--color-brand-600);
      background-color: var(--color-brand-600);
    }
    &:checked::after {
      content: "";
      position: absolute;
      top: 5px;
      left: 9px;
      width: 6px;
      height: 12px;
      border: solid white;
      border-width: 0 2px 2px 0; //Creates the tick shape
      transform: rotate(45deg);
      transition: all 0.3s;
    }
    &:focus {
      outline: none;
    }
  }

  & input[type="checkbox"]:disabled {
    accent-color: var(--color-brand-600);
  }

  /* & label {
    flex: 1;

    display: flex;
    align-items: center;
    gap: 0.8rem;
  } */
`;
type CheckBoxProps = {
  checked: boolean | undefined;
  onChange?: () => void;
  disabled?: boolean;
  id: string;
  children?: React.ReactNode;
};
function Checkbox({ checked, onChange, disabled = false, id, children }: CheckBoxProps) {
  return (
    <StyledCheckbox>
      <input
        // style={{ border: "1px solid black" }}
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={!disabled ? id : ""}>{children}</label>
    </StyledCheckbox>
  );
}

export default Checkbox;
