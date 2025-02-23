import styled, { css } from "styled-components";

type Size = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";

type IGrid = {
  columns: number;
  rows?: number;
  gap?: Size;
  alignItems?: "start" | "center" | "end" | "stretch";
  justifyItems?: "start" | "center" | "end" | "stretch";
  bgc?: string;
  responsive?: {
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
  };
};
const breakpoints = {
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};
const gapMap: Record<Size, string> = {
  xs: "4px",
  sm: "8px",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  xxl: "2.5rem",
  xxxl: "3rem",
};

export const Grid = styled.div<IGrid>`
  display: grid;
  width: 100%;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`};
  ${({ rows }) =>
    rows &&
    css`
      grid-template-rows: repeat(${rows}, 1fr);
    `}
  ${({ gap }) =>
    gap &&
    css`
      gap: ${gapMap[gap]};
    `}
  ${({ alignItems }) =>
    alignItems &&
    css`
      align-items: ${alignItems};
    `}
  ${({ justifyItems }) =>
    justifyItems &&
    css`
      justify-items: ${justifyItems};
    `}
  background-color: ${({ bgc }) => `var(--color-${bgc})` || "inherit"};

  /* Responsive Columns */
  ${({ responsive }) =>
    responsive &&
    Object.entries(responsive).map(
      ([key, value]) => css`
        @media (min-width: ${breakpoints[key as keyof typeof breakpoints]}) {
          grid-template-columns: repeat(${value}, 1fr);
        }
      `
    )}
`;
