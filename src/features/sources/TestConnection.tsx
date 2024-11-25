import Button from "@components/button/Button";
import Input from "@components/form/Input";
import styled from "styled-components";

const StyledTestConnetion = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  width: 50%;
`;

const TestConnection = () => {
  return (
    <StyledTestConnetion>
      <Input placeholder="Conn_String" style={{ width: "80%", backgroundColor: "#F9F9FB" }} />
      <Button variation="createNew" type="medium" style={{ width: "18%" }}>
        Test
      </Button>
    </StyledTestConnetion>
  );
};

export default TestConnection;
