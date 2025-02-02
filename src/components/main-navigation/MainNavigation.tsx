import { HiOutlineHome, HiOutlineNewspaper } from "react-icons/hi2";
import { PiChartPieSlice, PiDatabase } from "react-icons/pi";
import { CiServer } from "react-icons/ci";
import { LuClipboardList } from "react-icons/lu";
import { NnavListLI, StyledNavLink } from "./mainNav.styles";
import Icon from "@components/icon/Icon";
import { Row } from "@components/row";

interface MainNavigationProps {
  collapse: boolean;
}

export const MainNavigation = ({ collapse }: MainNavigationProps) => {
  return (
    <nav>
      <Row type="vertical" gap="xs">
        <NnavListLI>
          <StyledNavLink to="/">
            {collapse ? (
              <>
                {/* <Icon name="query" library="custom" />
                <span>Home</span> */}
                <HiOutlineHome /> <span>Home</span>
              </>
            ) : (
              <Icon name="home" library="custom" />
            )}
          </StyledNavLink>
        </NnavListLI>
        <NnavListLI>
          <StyledNavLink to="/jobs">
            {collapse ? (
              <>
                {/* <Icon name="bag" library="custom" /> <span>Jobs</span> */}
                <HiOutlineNewspaper /> <span>Jobs</span>
              </>
            ) : (
              <HiOutlineNewspaper />
            )}
          </StyledNavLink>
        </NnavListLI>
        <NnavListLI>
          <StyledNavLink to="/email-template">
            {collapse ? (
              <>
                <HiOutlineNewspaper /> <span>Email Template</span>
              </>
            ) : (
              <HiOutlineNewspaper />
            )}
          </StyledNavLink>
        </NnavListLI>
        <NnavListLI>
          <StyledNavLink to="/reports">
            {collapse ? (
              <>
                <LuClipboardList /> <span>Reports</span>
              </>
            ) : (
              <LuClipboardList />
            )}
          </StyledNavLink>
        </NnavListLI>
        <NnavListLI>
          <StyledNavLink to="/mail-server">
            {collapse ? (
              <>
                <CiServer /> <span>Mail Servers</span>
              </>
            ) : (
              <CiServer />
            )}
          </StyledNavLink>
        </NnavListLI>
        <NnavListLI>
          <StyledNavLink to="/queries">
            {collapse ? (
              <>
                <PiChartPieSlice /> <span>Queries</span>
              </>
            ) : (
              <PiChartPieSlice />
            )}
          </StyledNavLink>
        </NnavListLI>
        <NnavListLI>
          <StyledNavLink to="/data-source">
            {collapse ? (
              <>
                <PiDatabase /> <span>Sources</span>
              </>
            ) : (
              <PiDatabase />
            )}
          </StyledNavLink>
        </NnavListLI>
        <NnavListLI>
          <StyledNavLink to="/profile">
            {collapse ? (
              <>
                <HiOutlineNewspaper /> <span>User</span>
              </>
            ) : (
              <HiOutlineNewspaper />
            )}
          </StyledNavLink>
        </NnavListLI>
        <NnavListLI>
          <StyledNavLink to="/support">
            {collapse ? (
              <>
                <HiOutlineNewspaper /> <span>Support</span>
              </>
            ) : (
              <HiOutlineNewspaper />
            )}
          </StyledNavLink>
        </NnavListLI>
      </Row>
    </nav>
  );
};
