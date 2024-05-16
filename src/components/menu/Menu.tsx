import { HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledMenuContainer = styled.ul`
  width: 20rem;
  height: auto;
  background-color: var(--color-grey-100);
  border: 1px solid var(--color-grey-300);
  position: fixed;
  top: 5.8rem;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 409923;
  &::after {
    content: "";
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid currentColor;
    position: absolute;
    top: -7px;
    left: 65%;
    /* margin-left: -5px; */
    /* transform: rotate(45deg); */
  }
`;
const StyledList = styled.li`
  padding: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  &:hover {
    cursor: pointer;
    background-color: var(--color-grey-50);
    & svg {
      color: var(--color-brand);
      transition: all 0.3s;
    }
  }
`;
const Menu = () => {
  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("accessToken");
    navigate("/login");
  }
  return (
    <StyledMenuContainer>
      <StyledList>
        <HiOutlineUser />
        <span>Profile</span>
      </StyledList>
      <StyledList onClick={handleLogOut}>
        <HiOutlineLockClosed />
        <span>Log out</span>
      </StyledList>
    </StyledMenuContainer>
  );
};

export default Menu;
