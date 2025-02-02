import styled from "styled-components";

type ButtonIconProps = {
  variation?: "round" | "square";
  type?: "edit" | "delete";
};

const ButtonWithIcon = styled.button<ButtonIconProps>`
  background: white;
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
`;

export default ButtonWithIcon;
