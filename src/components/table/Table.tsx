import { ReactNode, createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: white;
  border-radius: 7px;
  padding: 1rem;
  overflow: hidden;
`;
type CommonRowProps = {
  columns: string;
  color?: string;
};
const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: ${props => props.columns};
  /* column-gap: 2.4rem; */
  align-items: center;
  transition: none;
`;
const StyledRow = styled(CommonRow)`
  /* padding: 0 2.4rem; */
  padding: 1rem 2.4rem;
  /* max-height: auto; */

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;
const StyledHeader = styled(CommonRow)`
  padding: 1rem 2.4rem;
  background-color: #ececec;
  border-bottom: 1px solid var(--color-grey-100);
  /* text-transform: uppercase; */
  /* letter-spacing: 0.1px; */
  font-weight: 400;
  color: var(--color-grey-600);
`;
const StyledBody = styled.section`
  /* margin: 0.4rem 0; */
`;
const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;
type TableContextProps = {
  columns: any;
};
const TableContext = createContext<TableContextProps | undefined>(undefined);

type TableProps = {
  columns: any;
  children: ReactNode;
};
type HeaderProps = {
  children: ReactNode;
};
export function Table({ columns, children }: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }: HeaderProps) {
  const { columns } = useContext(TableContext) as TableContextProps;
  return (
    <StyledHeader role="row" columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}
type RowProps = {
  children: ReactNode;
};
function Row({ children }: RowProps) {
  const { columns } = useContext(TableContext) as TableContextProps;
  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}
type BodyProps<T> = {
  data: T[];
  render: (item: T, idx: number) => React.ReactNode;
};
function Body<T>({ data, render }: BodyProps<T>) {
  if (data?.length == 0) return <Empty>No data to show at the moment</Empty>;

  return <StyledBody>{data?.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Footer = Footer;
Table.Body = Body;
