import styled, { css } from "styled-components";

type StyledCehckboxRowProps = {
  type?: "row" | "column";
};
export const StyledCehckboxRow = styled.div<StyledCehckboxRowProps>`
  display: flex;
  flex-direction: ${props => (props.type == "row" ? "row" : "column")};
  border: 1px solid var(--color-grey-300);
  border-radius: 4px;
  padding: 1rem;
  gap: 0.5rem;
  ${props =>
    props.type &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
`;

export const StyledStatsCard = styled.div`
  width: 100%;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(5, 1fr);
`;
