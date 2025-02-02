import styled, { css } from "styled-components";

type Size = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";

type IGrid = {
  columns: number;
  rows?: number;
  gap?: Size;
  alignItems?: "start" | "center" | "end" | "stretch";
  justifyItems?: "start" | "center" | "end" | "stretch";
  bgc?: string;
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
`;
