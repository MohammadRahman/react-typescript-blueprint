import React from "react";
import styled from "styled-components";

type StyledDayStatsProps = {
  color?: string;
};
const StyledDayStats = styled.div<StyledDayStatsProps>`
  width: 100%;
  height: 56px;
  background-color: white;
  border-left: ${props => `1px solid ${props.color}`};
  padding: 8px 16px 8px 16px;
  border-radius: 0px 12px 12px 0px;
`;
export const DayStats = ({ stats }) => {
  return (
    <StyledDayStats color={stats.color}>
      <p>Email {stats.jobType}</p>
      <p>{stats.quantity}</p>
    </StyledDayStats>
  );
};
