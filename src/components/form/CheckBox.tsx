import styled from "styled-components";

const StyledCheckbox = styled.div`
  display: flex;
  gap: 1.6rem;

  & input[type="checkbox"] {
    height: 2.4rem;
    width: 2.4rem;
    /* outline-offset: 2px; */
    /* transform-origin: 0; */
    /* border: 1px solid black; */
    accent-color: var(--color-brand-600);
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
  checked: boolean;
  onChange: () => void;
  disabled: boolean;
  id: string;
  children: React.ReactNode;
};
function Checkbox({ checked, onChange, disabled = false, id, children }: CheckBoxProps) {
  return (
    <StyledCheckbox>
      <input
        style={{ border: "1px solid black" }}
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
