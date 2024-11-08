import { HiOutlineUser } from "react-icons/hi2";
import styled from "styled-components";

const StyledAvatar = styled.div`
  width: 3rem;
  height: 3rem;
  border: 1px solid var(--color-grey-100);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    width: 2rem;
    height: 2rem;
  }
  &:hover {
    cursor: pointer;
  }
`;
export const Avatar = () => {
  return (
    <StyledAvatar>
      <HiOutlineUser />
    </StyledAvatar>
  );
};
