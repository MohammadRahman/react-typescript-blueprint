import SpinnerMini from "@components/spinner/SpinnerMini";
import { ReactNode } from "react";
import styled, { css, RuleSet } from "styled-components";

const sizes: { small: RuleSet<object>; medium: RuleSet<object>; large: RuleSet<object> } = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
    min-width: 10rem;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  outline: css`
    background-color: var(--color-white);
    border: 1px solid var(--color-grey-200);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #04aa61;
  `,
  createNew: css`
    background-color: #04aa61;
    /* border: 1px solid var(--color-brand-600); */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: var(--color-white);
  `,
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-primary);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  smallDetail: css`
    width: 58px;
    height: 30px;
    border-radius: 8px;
    border: 1px;
    padding: 6px 10px;
    background-color: #04aa61;
    color: white;
  `,
  outlinePrimary: css`
    min-width: 58px;
    height: 30px;
    padding: 6px 10px;
    color: #04aa61;
    border-color: #04aa61;
    border: 1px solid #04aa61;
    background: transparent;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover,
    &:active {
      background-color: #04aa61;
      color: white;
    }
  `,
  outlinePreview: css`
    width: 120px;
    height: 41px;
    padding: 6px 10px;
    color: #04aa61;
    border-color: #04aa61;
    border: 1px solid #04aa61;
    background: transparent;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover,
    &:active {
      background-color: #04aa61;
      color: white;
    }
  `,
  primarySmall: css`
    width: 120px;
    height: 41px;
    color: var(--color-brand-50);
    background-color: var(--color-primary);
  `,
  outlinePrimaryEdit: css`
    min-width: 100px;
    max-width: auto;
    padding: 2px 14px;
    color: #04aa61;
    border: 1px solid #e5e5e5;
    background: transparent;
    &:hover,
    &:active {
      background-color: #04aa61;
      color: white;
    }
  `,
  outlinePrimaryDetails: css`
    min-width: 100px;
    max-width: auto;
    padding: 2px 14px;
    color: #04aa61;
    border: 1px solid #e5e5e5;
    background: transparent;
    &:hover,
    &:active {
      background-color: #04aa61;
      color: white;
    }
  `,
  outlineDanger: css`
    min-width: 100px;
    max-width: auto;
    padding: 2px 14px;
    color: #ff6242;
    background-color: transparent;
    border: 1px solid #e5e5e5;
    &:hover,
    &:active {
      background-color: #ff6242;
      color: white;
      outline: none;
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
  outlineGrey: css`
    min-width: fit-content;
    max-width: auto;
    min-height: 37px;
    max-height: auto;
    border-radius: 8px;
    border: 1px solid #f9f9fb;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #797979;
    background-color: transparent;

    &:hover {
      border: 1px solid var(--color-brand);
      /* background-color: var(--color-red-800); */
    }
  `,
};
type Size = keyof typeof sizes;
type Variation = keyof typeof variations;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: Size;
  variation?: Variation;
  type?: string;
  onClick?: () => void;
  isLoading?: boolean;
  isActive?: boolean;
  children: ReactNode;
};
const StyledButton = styled.button<ButtonProps>`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  ${props => sizes[props.size || "medium"]}
  ${props => variations[props.variation || "primary"]}
`;

function Button({
  size,
  variation,
  onClick,
  type,
  isLoading,
  children,
  ...restProps
}: ButtonProps) {
  return (
    <StyledButton type={type} size={size} variation={variation} onClick={onClick} {...restProps}>
      {isLoading && <SpinnerMini />} {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;
