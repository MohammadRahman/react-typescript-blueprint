import styled from "styled-components";

export const StyledBoxContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 1rem;
`;
export const StyledSMTPServer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 1rem;

  &:nth-child(1) {
    margin-bottom: 2rem; /* padding for the first child */
  }

  &:nth-child(2) {
    margin-bottom: 3rem; /* padding for the second child */
  }
`;
export const StyledIMAPServer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 1rem;
`;
export const GroupButton = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
export const StyledContainer = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: white;
  border-radius: 8px;
`;

export const StyledShowAdvance = styled.div`
  width: fit-content;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem 0rem;
  cursor: pointer;
`;
