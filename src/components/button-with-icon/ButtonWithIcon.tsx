import styled, { css } from "styled-components";

type ButtonIconProps = {
  variation?: "round" | "square";
  type?: "edit" | "delete";
};

const ButtonWithIcon = styled.button<ButtonIconProps>`
  background: var(--color-white);
  border: 1px solid var(--color-grey-20);
  padding: 0.6rem;
  border-radius: ${props => (props.variation === "square" ? "4px" : "50%")};
  transition: all 0.2s;
  &:hover {
    background-color: ${props =>
      props.variation === "square" && props.type === "edit"
        ? "var(--color-brand)"
        : props.type === "delete"
          ? "var(--color-red-200)"
          : "var(--color-grey-50)"};
    color: ${props =>
      props.type === "edit"
        ? "var(--color-white)"
        : props.type === "delete"
          ? "var(--color-white)"
          : "var(--color-black)"};
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  & svg {
    width: 2rem;
    height: 2rem;
  }
  ${props =>
    props.variation === "round" &&
    css`
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: var(--color-primary);
      color: var(--color-white);
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: var(--color-primary);
        color: var(--color-white);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      & svg {
        width: 1.5rem;
        height: 1.5rem;
      }
    `}
`;

export default ButtonWithIcon;
