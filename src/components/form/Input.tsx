import styled, { css } from "styled-components";

type OptionalProp = {
  isCheckbox?: "true";
};

const Input = styled.input<OptionalProp>`
  ${props =>
    props.isCheckbox === "true" &&
    css`
      border: none !important;
      border-radius: 0 !important;
      border-top-right-radius: 8px !important;
      border-bottom-right-radius: 8px !important;

      &:focus,
      &:active {
        border: none !important;
        /* border-radius: 0 !important; */
        outline: none;
      }
    `}
  border: 1px solid var(--color-grey-300);
  border-radius: 8px;
  padding: 1rem 1.5rem;
`;

export default Input;
