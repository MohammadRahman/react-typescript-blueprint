import Button from "@components/button/Button";
import Input from "@components/form/Input";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const StyledTestConnetion = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  min-width: 50%;
  max-width: 100%;
`;
type TestConnectionProps = {
  connectionString: string;
};
const TestConnection = ({ connectionString }: TestConnectionProps) => {
  const { register } = useForm();

  return (
    <StyledTestConnetion>
      <Input
        placeholder="Conn_String"
        style={{ width: "80%", backgroundColor: "#F9F9FB" }}
        disabled
        value={connectionString}
        {...register("connStr")}
      />
      <Button variation="createNew" type="button" style={{ width: "18%" }}>
        Test
      </Button>
    </StyledTestConnetion>
  );
};

export default TestConnection;
