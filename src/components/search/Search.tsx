import Input from "@components/form/Input";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import styled from "styled-components";
import { MdOutlineFilterList } from "react-icons/md";
import ButtonIcon from "@components/button-with-icon/ButtonWithIcon";

const StyledSearch = styled.div`
  min-width: 24rem;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: var(--color-white);
  border-radius: 8px;
`;
const StyledInput = styled(Input)`
  outline: none;
  border: none;
  width: 100%;
  padding: 0rem 1rem;
  &:focus {
    outline: none;
  }
`;
const StyledMdOutlineFilterList = styled(MdOutlineFilterList)`
  color: green;
`;
const StyledButtonIcon = styled(ButtonIcon)`
  border-radius: 8px;
  background-color: #f0fdf4;
`;

type SearchProps = {
  onChange: (e: any) => void;
};
export const Search = ({ onChange }: SearchProps) => {
  return (
    <StyledSearch>
      <HiOutlineMagnifyingGlass />
      <StyledInput placeholder="Search" onChange={onChange} />
      <StyledButtonIcon>
        <StyledMdOutlineFilterList />
      </StyledButtonIcon>
    </StyledSearch>
  );
};
