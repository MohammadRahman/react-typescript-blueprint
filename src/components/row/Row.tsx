import styled, { css } from "styled-components";

type StyledRowProps = {
  type?: "horizontal" | "vertical";
  gap?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl"; // Predefined gap sizes
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline"; // Flexbox alignment options
  justifycontent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
};

const GAP_VALUES: Record<NonNullable<StyledRowProps["gap"]>, string> = {
  xs: "4px",
  sm: "0.8rem",
  md: "1.2rem",
  lg: "1.6rem",
  xl: "2.4rem",
  xxl: "3.2rem",
};

export const Row = styled.div<StyledRowProps>`
  display: flex;

  ${props =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${props =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
    `}

  ${props =>
    props.gap &&
    css`
      gap: ${GAP_VALUES[props.gap]};
    `}

  ${props =>
    props.alignItems &&
    css`
      align-items: ${props.alignItems};
    `}

  ${props =>
    props.justifycontent &&
    css`
      justify-content: ${props.justifycontent};
    `}
`;

Row.defaultProps = {
  type: "horizontal",
};
