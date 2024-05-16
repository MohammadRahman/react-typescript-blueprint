import Button from "@components/button/Button";
import Input from "@components/form/Input";
import { Table } from "@components/table";
import styled from "styled-components";
import { SourceRow } from "./SourceRow";
import { getSourceMock } from "@mocks/data/source-mocks";

const StyledSource = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
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
const StyledCheckBoxContainer = styled.div`
  width: 24%;
  height: 5.5rem;
  border: 1px solid var(--color-grey-200);
  /* background-color: var(--color-grey-50); */
  display: flex;
  justify-content: flex-start;
  padding: 0px 1rem;
  align-items: center;
  border-radius: 8px;
`;
export const Sources = () => {
  const sourceData = getSourceMock();
  return (
    <StyledSource>
      <StyledContainer>
        <span>&larr; New Database Connection</span>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <StyledCheckBoxContainer>Server Name</StyledCheckBoxContainer>
          <StyledCheckBoxContainer>Database Name</StyledCheckBoxContainer>
          <StyledCheckBoxContainer>Username</StyledCheckBoxContainer>
          <StyledCheckBoxContainer>Password</StyledCheckBoxContainer>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input placeholder="Conn_String" style={{ width: "80%", backgroundColor: "#F9F9FB" }} />
          <Button variation="createNew" type="medium" style={{ width: "18%" }}>
            Test
          </Button>
        </div>
      </StyledContainer>
      <StyledContainer>
        <Table columns="5fr 5fr 3fr">
          <Table.Header>
            <div>Conn_String</div>
            <div>Source Name</div>
            <div>Test Status</div>
          </Table.Header>
          <Table.Body
            data={sourceData}
            render={(data: any) => <SourceRow key={data.id} rowData={data} />}
          />
        </Table>
      </StyledContainer>
    </StyledSource>
  );
};
