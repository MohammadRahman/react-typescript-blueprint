import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const PAGE_SIZE = 5;

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;
interface PaginationButtonProps {
  active?: boolean;
}
const PaginationButton = styled.button<PaginationButtonProps>`
  background-color: ${props => (props.active ? " var(--color-brand-600)" : "var(--color-grey-50)")};
  color: ${props => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
type PaginationProps = {
  count: number;
  tableI: any;
  pageSize: number;
};
export function Pagination({ count, tableI, pageSize }: PaginationProps) {
  const currentPage = tableI.getState().pagination.pageIndex + 1;
  const pageCount = Math.ceil(count / pageSize);

  function nextPage() {
    tableI.nextPage();
  }
  function prevPage() {
    tableI.previousPage();
  }
  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * pageSize + 1}</span> to{" "}
        <span>{currentPage === pageCount ? count : currentPage * pageSize}</span> of{" "}
        <span>{count}</span> results
      </P>
      <div>
        <select
          style={{
            padding: "0.7rem",
            border: "1px solid var(--color-grey-100)",
            border_radius: "4px",
          }}
          value={tableI.getState().pagination.pageSize}
          onChange={e => {
            tableI.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Page size {pageSize}
            </option>
          ))}
        </select>
      </div>
      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft /> <span>Previous</span>
        </PaginationButton>
        <PaginationButton onClick={nextPage} disabled={currentPage === pageCount}>
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}
