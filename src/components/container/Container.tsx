import styled, { css } from "styled-components";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

type IPadding = {
  padding?: Size;
  bgc?: string;
  border_radius?: Size;
  border?: Exclude<Size, "xs" | "xl">;
  overflow?: "hidden" | "";
};
const paddingMap: Record<Size, string> = {
  xs: "0.5rem",
  sm: "1rem",
  md: "2rem",
  lg: "3rem",
  xl: "4rem",
};
const border_radiusMap: Record<Size, string> = {
  xs: "4px",
  sm: "8px",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
};
const borderMap: Record<Exclude<Size, "xs">, string> = {
  sm: "1px solid var(--color-grey-border)",
  md: "2px solid var(--color-grey-border)",
  lg: "3px solid var(--color-grey-border)",
  xl: "1rem solid var(--color-grey-border)",
};

export const Container = styled.div<IPadding>`
  width: 100%;
  ${({ padding }) =>
    padding &&
    css`
      padding: ${paddingMap[padding]};
    `}
  ${({ border_radius }) =>
    border_radius &&
    css`
      border-radius: ${border_radiusMap[border_radius]};
    `}
  ${({ border }) =>
    border &&
    css`
      border: ${borderMap[border]};
    `}
  background-color: ${({ bgc }) => `var(--color-${bgc})` || "inherit"};
  overflow: ${({ overflow }) =>
    overflow &&
    css`
      overflow: hidden;
    `};
`;
