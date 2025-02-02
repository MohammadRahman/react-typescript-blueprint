import styled from "styled-components";

export const FormInputWithCheckBox = styled.div`
  border: 1px solid var(--color-grey-10);
  height: 5rem;
  display: flex;
  gap: 1rem;
  padding: 1rem 0rem 1rem 1rem;
  align-items: center;
  border-radius: 8px;
  position: relative;
  &:focus-within {
    border: 2px solid var(--color-primary);
    box-shadow: 0 0 8px rgba(4, 170, 97, 0.7);
  }
`;
