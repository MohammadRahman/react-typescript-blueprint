import { Statistics } from "@features/statistics";
import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
export const Homepage = () => {
  return (
    <>
      <Statistics />
    </>
  );
};
