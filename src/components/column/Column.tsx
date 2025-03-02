import styled, { css } from "styled-components";

type StyledColumnProps = {
  gap?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  content?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
};

const GAP_VALUES: Record<NonNullable<StyledColumnProps["gap"]>, string> = {
  xs: "4px",
  sm: "0.8rem",
  md: "1.2rem",
  lg: "1.6rem",
  xl: "2.4rem",
  xxl: "3.2rem",
};

export const Column = styled.div<StyledColumnProps>`
  display: flex;
  flex-direction: column;
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
    props.content &&
    css`
      justify-content: ${props.content};
    `}
`;
