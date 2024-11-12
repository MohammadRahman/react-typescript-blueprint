import { Table } from "@components/table";
import styled from "styled-components";
import { MailServerRow } from "./MailServerRow";
import { getServerDataMock } from "@mocks/data";
import CreateMailServerForm from "./CreateMailServerForm";
import FiltersAndSorts from "@components/filters-and-sorts/FiltersAndSorts";
import { Pagination } from "@components/pagination";
import { useEmailAccount } from "./useEmailAccount";


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
  
  const mailServerData = getServerDataMock()
  const {emailLists} = useEmailAccount()

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
            data={mailServerData}
            render={(el: any) => <MailServerRow key={el.id} rowData={el} />}
          />
          <Table.Footer>
              <Pagination count={emailLists?.length}/>
          </Table.Footer>
        </Table>
      </StyledContainer>
    </StyledMailServer>
  );
};
