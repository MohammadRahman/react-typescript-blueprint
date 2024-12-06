import styled from "styled-components";

export const StyledTable = styled.table`

  border-collapse: collapse;
  width: 100%;
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;

`
export const StyledHeader = styled.thead`
  /* padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600); */
  padding: 1rem 2.4rem;
  background-color: #ececec;
  border-bottom: 1px solid var(--color-grey-100);
  /* text-transform: uppercase; */
  /* letter-spacing: 0.1px; */
  font-weight: 400;
  color: var(--color-grey-600);

  &:hover{
    border-right: 1px solid black;
  }
  &:focus{
    border-right: 1px solid var(--color-grey-100);
  }
`;
type StyledThProps = {
  width: number;
};

export const StyledTh = styled.th<StyledThProps>`
  padding: 1rem;
  position: relative;
  width: ${({ width }: { width: number }) => `${width}px`};

  &:hover {
    border-right: 1px solid #007bff; 
  }

  div {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    cursor: col-resize;
    z-index: 1;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1); /* Highlight resize area on hover */
    }
  }
`;
export const StyledRow = styled.tr`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  &:hover{
    cursor: pointer;
    background-color: var(--color-grey-100);
  }
`;
// Styled empty message
export const Empty = styled.p`
  text-align: center;
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;
export const StyledBody = styled.tbody`
  text-align: center;
  position: relative;
`;
export const StyledPagination = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: space-between;
`;
export const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;
export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%; /* Adjust as needed */
`;
export const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;
export const EmptyWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%; /* Ensure it spans the table width */
`;