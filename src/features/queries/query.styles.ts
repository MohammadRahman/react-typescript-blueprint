import styled from "styled-components";

export const StyledQueries = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const StyledContainer = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  border-radius: 8px;
`;
export const StyledCheckBoxContainer = styled.div`
  border: 1px solid var(--color-grey-200);
  display: flex;
  justify-content: flex-start;
  padding: 0px 1rem;
  align-items: center;
  border-radius: 8px;
  padding: 1rem;
  min-height: 9rem;
  max-height: auto;
  position: relative;
`;
export const StyledCheckbox = styled.div<{ isChecked: boolean | undefined }>`
  position: absolute;
  top: ${({ isChecked }) => (isChecked ? "1rem" : "50%")};
  transform: translateY(-50%);
  transition:
    top 0.3s ease,
    transform 0.3s ease;
`;

export const HiddenContent = styled.div<{ isVisible: boolean | undefined }>`
  position: absolute;
  top: ${({ isVisible }) => (isVisible ? "5rem" : "50%")};
  left: 1rem;
  width: calc(100% - 2rem);
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(-50%);
  transition:
    top 0.3s ease,
    opacity 0.3s ease;
  z-index: 1;
`;
export const StyledTextContainer = styled.div`
  border: 1px solid var(--color-grey-200);
  border-radius: 8px;
  background-color: 1px solid #e5e5e5;
  padding: 1rem 1.5rem;
`;
export const StyledButton = styled.div`
  /* style={{gridColumn: "1 / -1",display: "flex", justifycontent: "flex-end", gap: "1rem" }} */
  grid-column: 1/-1;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
export const StyledActionButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
