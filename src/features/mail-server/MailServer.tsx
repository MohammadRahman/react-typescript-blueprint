import { Table } from "@components/table";
import styled from "styled-components";
import { MailServerRow } from "./MailServerRow";
import CreateMailServerForm from "./CreateMailServerForm";
import FiltersAndSorts from "@components/filters-and-sorts/FiltersAndSorts";
import { Pagination } from "@components/pagination";
import { useEmailData } from "@context/EmailAccountContext";
import { useSearchParams } from "react-router-dom";

const PAGE_SIZE = 5;

const StyledMailServer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const StyledContainer = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: white;
  border-radius: 8px;
`;


export const MailServer = () => {
  
  const { emailData } = useEmailData();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const paginatedData = emailData?.list.slice(startIdx, endIdx);

if(emailData?.isLoading) return <h1>Loading...</h1>
  return (
    <StyledMailServer>
      <StyledContainer>
        <CreateMailServerForm />
      </StyledContainer>
      <StyledContainer>
          <FiltersAndSorts/>
      </StyledContainer>
      <StyledContainer>
        <Table columns="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr">
          <Table.Header>
            <div>ID</div>
            <div>Type</div>
            <div>Email</div>
            <div>Name</div>
            <div>SMTP port</div>
            <div>S. Protocol</div>
            <div>IMAP address</div>
            <div>IMAP Email</div>
            <div>IMAP Port</div>
            <div>Actions</div>
          </Table.Header>
          <Table.Body
            data={paginatedData || []}
            render={(el: any) => <MailServerRow key={el.id} rowData={el} />}
          />
          <Table.Footer>
              <Pagination count={emailData?.list?.length || 0}/>
          </Table.Footer>
        </Table>
      </StyledContainer>
    </StyledMailServer>
  );
};
