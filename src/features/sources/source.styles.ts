import styled from "styled-components";

export const StyledSource = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
export const StyledContainer = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  background-color: var(--color-white);
  border: 1px solid var(--color-grey-border);
  border-radius: 1rem;
`;
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column; /* Center the form */
  gap: 1rem;
`;
export const ContainerTwoElements = styled.div`
  width: 50%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;
export const TypeParametersContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Center the form */
  gap: 1rem;
  /* padding: 1rem; */
`;
export const SytledFormButton = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
