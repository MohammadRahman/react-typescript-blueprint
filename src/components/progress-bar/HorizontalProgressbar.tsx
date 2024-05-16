import React from "react";
import styled from "styled-components";

const StyledProgressbarContainer = styled.div`
  width: 90%;
  min-height: 12px;
  border: 1px solid var(--color-grey-100);
  border-radius: 16px;
  background-color: #ff6242;
`;
type ProgressBarProp = {
  percent: number;
};
const ProgressBar = styled.div<ProgressBarProp>`
  max-width: ${props => props.percent}%;
  min-height: 12px;
  border-radius: 16px;
  background-color: ${props => (props.percent ? "#04AA61" : "#ff6242")};
`;
type ProgressBarProps = {
  percent: number;
};
export const HorizontalProgressbar = ({ percent }: ProgressBarProps) => {
  return (
    <StyledProgressbarContainer>
      <ProgressBar percent={percent} />
    </StyledProgressbarContainer>
  );
};
