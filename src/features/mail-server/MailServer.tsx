import Button from "@components/button/Button";
import FormRowVertical from "@components/form/FormRowVertical";
import Input from "@components/form/Input";
import { Row } from "@components/row";
import { SingleSelect } from "@components/select";
import { Table } from "@components/table";
import styled from "styled-components";
import { MailServerRow } from "./MailServerRow";
import { getServerDataMock } from "@mocks/data";
import { useForm } from "react-hook-form";

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
const StyledBoxContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 1rem;
`;
const StyledSMTPServer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 1rem;
`;
const StyledIMAPServer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 1rem;
`;
const GroupButton = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
const options = [
  {
    label: "somedata",
    value: "somedata",
  },
];
export const MailServer = () => {
  const {control} = useForm();
  
  const mailServerData = getServerDataMock();
  return (
    <StyledMailServer>
      <StyledContainer>
        <Row type="horizontal">
          <span>&larr; Create New Mail Server</span>
          <span>Basilinq Logo</span>
        </Row>
        <StyledBoxContainer>
          <FormRowVertical label="ID*">
            <Input placeholder="type here" style={{ padding: "1rem 1.5rem" }} />
          </FormRowVertical>
          <FormRowVertical label="E-Mail/PEC*">
            <SingleSelect name="" control={control} options={options} />
          </FormRowVertical>
          <FormRowVertical label="Indirizzio e-mail*">
            <SingleSelect name="" control={control} options={options} />
          </FormRowVertical>
        </StyledBoxContainer>
        <hr style={{ border: "none", height: "1px", backgroundColor: "#E5E5E5" }} />
        <h4>Server SMTP</h4>
        <StyledSMTPServer>
          <FormRowVertical label="Email SMTP">
            <Input placeholder="Type here" />
          </FormRowVertical>
          <FormRowVertical label="Password SMTP">
            <Input placeholder="Type here" />
          </FormRowVertical>
          <FormRowVertical label="Indirizzo SMTP">
            <Input placeholder="Type here" />
          </FormRowVertical>
          <FormRowVertical label="Porta SMTP">
            <SingleSelect name="" control={control} options={options} />
          </FormRowVertical>
          <FormRowVertical label="Tippo sicurezza">
            <SingleSelect name="" control={control} options={options} />
          </FormRowVertical>
        </StyledSMTPServer>
        <hr style={{ border: "none", height: "1px", backgroundColor: "#E5E5E5" }} />
        <h4>Server IMAP</h4>
        <StyledIMAPServer>
          <FormRowVertical label="Ntente IMAP">
            <Input placeholder="Type here" />
          </FormRowVertical>
          <FormRowVertical label="Password IMAP">
            <Input placeholder="Type here" />
          </FormRowVertical>
          <FormRowVertical label="Indirizzo IMAP">
            <Input placeholder="Type here" />
          </FormRowVertical>
          <FormRowVertical label="Porta SMTP">
            <Input placeholder="Type here" />
          </FormRowVertical>
        </StyledIMAPServer>
        <GroupButton>
          <Button variation="outlineDanger">Delete</Button>
          <Button variation="outlinePrimaryDetails" size="medium">
            Details
          </Button>
          <Button variation="outlinePrimaryEdit" size="medium">
            Edit
          </Button>
          <Button variation="primary" size="medium">
            Save
          </Button>
        </GroupButton>
      </StyledContainer>
      <StyledContainer>
        <Table columns="1fr 1fr 1fr 1fr 1fr 1fr">
          <Table.Header>
            <div>Information</div>
            <div>Information</div>
            <div>Information</div>
            <div>Information</div>
            <div>Information</div>
            <div>Information</div>
          </Table.Header>
          <Table.Body
            data={mailServerData}
            render={(el: any) => <MailServerRow key={el.id} rowData={el} />}
          />
        </Table>
      </StyledContainer>
    </StyledMailServer>
  );
};
