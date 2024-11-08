import { HiOutlineHome, HiOutlineNewspaper } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
interface NnavListLIProps {
  collapsed?: boolean;
}
const NnavListLI = styled.li<NnavListLIProps>`
  list-style: none;
`;
const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--color-white);
    font-size: 1.2rem;
    font-weight: 500;
    padding: 1rem 2rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-green-200);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-white);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-black-100);
  }
`;
interface MainNavigationProps {
  collapse: boolean;
}

export const MainNavigation = ({ collapse }: MainNavigationProps) => {
  return (
    <nav>
      <NavList>
        <NnavListLI>
          <StyledNavLink to="/">
            {collapse ? (
              <>
                <HiOutlineHome /> <span>Home</span>
              </>
            ) : (
              <HiOutlineHome />
            )}
          </StyledNavLink>
        </NnavListLI>
        <NnavListLI>
          <StyledNavLink to="/jobs">
            {collapse ? (
              <>
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
                <HiOutlineNewspaper /> <span>Reports</span>
              </>
            ) : (
              <HiOutlineNewspaper />
            )}
          </StyledNavLink>
        </NnavListLI>
        <NnavListLI>
          <StyledNavLink to="/mail-server">
            {collapse ? (
              <>
                <HiOutlineNewspaper /> <span>Mail Servers</span>
              </>
            ) : (
              <HiOutlineNewspaper />
            )}
          </StyledNavLink>
        </NnavListLI>
        <NnavListLI>
          <StyledNavLink to="/queries">
            {collapse ? (
              <>
                <HiOutlineNewspaper /> <span>Queries</span>
              </>
            ) : (
              <HiOutlineNewspaper />
            )}
          </StyledNavLink>
        </NnavListLI>
        <NnavListLI>
          <StyledNavLink to="/data-source">
            {collapse ? (
              <>
                <HiOutlineNewspaper /> <span>Sources</span>
              </>
            ) : (
              <HiOutlineNewspaper />
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
      </NavList>
    </nav>
  );
};
