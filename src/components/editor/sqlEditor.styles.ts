import styled from "styled-components";

export const EditorHeader = styled.div`
  width: 100%;
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--color-sidebar);
`;
export const EditorFooter = styled.div`
  width: 100%;
  height: 40px;
  position: relative;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  background-color: var(--color-sidebar);
  align-items: center;
  z-index: 1000000;
`;
export const StyledIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  gap: 1px;
  height: 100%;
  position: absolute;
  right: 5px;
`;
export const StyledMark = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: var(--color-white);
  &:hover {
    cursor: pointer;
    border-radius: 50%;
  }
`;
type StyledQueryProps = {
  isQueryRun?: boolean;
};
export const StyledQuery = styled.div.withConfig({
  shouldForwardProp: prop => prop !== "isQueryRun",
})<StyledQueryProps>`
  width: ${props => (props.isQueryRun ? "60%" : "100%")};
  height: 100%;
`;
export const StyledQueryResult = styled.div<StyledQueryProps>`
  width: 40%;
  height: 100%;
  border-left: 1px solid var(--color-grey-20);
`;
