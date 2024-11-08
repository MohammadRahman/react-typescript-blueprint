import styled from "styled-components";

const ButtonIcon = styled.button`
  background: white;
  /* border: none; */
  border: 1px solid var(--color-grey-200);
  padding: 0.6rem;
  /* border-radius: var(--border-radius-sm); */
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    /* color: var(--color-brand-600); */
  }
`;

export default ButtonIcon;
