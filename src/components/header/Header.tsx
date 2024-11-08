import styled from "styled-components";
import { Avatar } from "../avatar";
import DarkModeToggle from "../toggler/DarkModeToggle";
import { useState } from "react";
import Menu from "@components/menu/Menu";
import { useUser } from "@features/authentication/useUser";
import ButtonIcon from "@components/button-icons/ButtonIcon";
import { HiMagnifyingGlass, HiOutlineBell } from "react-icons/hi2";
import { useLocation } from "react-router-dom";

const StyledHeader = styled.header`
  background-color: #f9f9fb; //var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  /* border-bottom: 1px solid var(--color-grey-100); */
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
  /* height: 4rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 2rem; */
`;

export function Header() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { isAuthenticated } = useUser(localStorage.getItem("token"));

  const location = useLocation();
  console.log(location.pathname);
  const pathName = location?.pathname === "/" ? "home" : location?.pathname.replace("/", "");
  const capitalizedPathName = pathName.charAt(0).toUpperCase().concat(pathName.slice(1));
  return (
    <StyledHeader>
      <p>{capitalizedPathName}</p>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <ButtonIcon>
          <HiMagnifyingGlass />
        </ButtonIcon>
        <DarkModeToggle />
        <ButtonIcon>
          <HiOutlineBell />
        </ButtonIcon>
        {isAuthenticated ? (
          <div onClick={() => setShowMenu(prev => !prev)}>
            <Avatar />
          </div>
        ) : (
          <span>Login</span>
        )}
        {showMenu && <Menu />}
      </div>
    </StyledHeader>
  );
}
