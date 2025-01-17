import styled, { css } from "styled-components";

type StyledRowProps = {
  type?: string;
  gap?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
};
type GapSizes = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
const GAP_VALUES: Record<GapSizes, string> = {
  xs: "4px",
  sm: "0.8rem",
  md: "1.2rem",
  lg: "1.6rem",
  xl: "2.4rem",
  xxl: "3.2rem",
};
// export const Row = styled.div<StyledRowProps>`
//   display: flex;

//   ${props =>
//     props.type === "horizontal" &&
//     css`
//       justify-content: space-between;
//       align-items: center;
//     `}

//   ${props =>
//     props.type === "vertical" &&
//     css`
//       flex-direction: column;
//       gap: 1.6rem;
//     `}
// `;
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
    props.gap
      ? css`
          gap: ${GAP_VALUES[props.gap]};
        `
      : css`
          justify-content: space-between;
        `}
`;

Row.defaultProps = {
  type: "vertical",
};
