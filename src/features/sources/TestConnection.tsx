import Button from "@components/button/Button";
import Input from "@components/form/Input";
import { Row } from "@components/row";
import { useForm } from "react-hook-form";

type TestConnectionProps = {
  connectionString: string;
};
const TestConnection = ({ connectionString }: TestConnectionProps) => {
  const { register } = useForm();

  return (
    <Row type="horizontal" gap="md" justifyContent="flex-start">
      <Input
        placeholder="Conn_String"
        style={{ width: "80%", backgroundColor: "#F9F9FB" }}
        disabled
        value={connectionString}
        {...register("connStr")}
      />
      <Button variation="createNew" type="button" size="large" style={{ width: "20%" }}>
        Test
      </Button>
    </Row>
  );
};

export default TestConnection;
