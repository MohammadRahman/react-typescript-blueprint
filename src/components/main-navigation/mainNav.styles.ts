import styled from "styled-components";
import { NavLink } from "react-router-dom";

interface NnavListLIProps {
  collapsed?: boolean;
}
export const NnavListLI = styled.li<NnavListLIProps>`
  list-style: none;
`;
export const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 4px;
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
