import { useState } from "react";
import { Header } from "@components/header";
import { Sidebar } from "@components/sidebar";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

interface StyledLayoutProps {
  active?: boolean;
}
const StyledLayout = styled.div<StyledLayoutProps>`
  display: grid;
  grid-template-columns: ${props => (props.active ? "24rem" : "6rem")} 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
`;
const Main = styled.main`
  background-color: var(--color-grey-20);
  /* padding: 4rem 4.8rem 6.4rem; */
  padding: 1.6rem 4rem;
  overflow: scroll;
`;
export const AdminLayout = () => {
  const [collapse, setCollapsed] = useState(true);
  return (
    <StyledLayout active={collapse}>
      <Header />
      <Sidebar setCollapsed={setCollapsed} collapse={collapse} />
      <Main>
        <Outlet />
      </Main>
    </StyledLayout>
  );
};
