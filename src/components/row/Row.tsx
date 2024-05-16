import styled, { css } from "styled-components";

type StyledRowProps = {
  type?: string;
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
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};
