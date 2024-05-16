import styled, { css } from "styled-components";

const sizes = {
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
    background-color: var(--color-brand-600);

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
    width: auto;
    padding: 8px 14px;
    color: #04aa61;
    border-color: #04aa61;
    border: 1px solid #04aa61;
    background: transparent;
    &:hover,
    &:active {
      background-color: #04aa61;
      color: white;
    }
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
type ButtonProps = {
  size?: any;
  variation?: any;
  type?: string;
  onClick?: () => void;
};
const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  ${props => sizes[props.size]}
  ${props => variations[props.variation]}
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;
