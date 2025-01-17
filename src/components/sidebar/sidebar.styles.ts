import styled from "styled-components";

export const StyledSidebar = styled.aside`
  background-color: var(--color-sidebar);
  border-right: 1px solid var(--color-grey-100);
  position: relative;
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
  gap: 3.2rem;
`;
export const CollapsedIcon = styled.aside`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  right: 0;
  top: 0;
`;
