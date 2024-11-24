import Button from "@components/button/Button";
import Input from "@components/form/Input";
import styled from "styled-components";
import { SingleSelect } from "@components/select";
import { useForm } from "react-hook-form";
import FormRowVertical from "@components/form/FormRowVertical";
import Form from "@components/form/Form";
import { useEffect, useState } from "react";
import FileInput from "@components/form/FileInput";
import { v4 as uuidv4 } from "uuid";
import { useCreateSource } from "./useCreateSource";
import Spinner from "@components/spinner/Spinner";
import SourceTable from "./SourceTable";
import { useSourceData } from "@context/SourceContext";
import { useSourceLists } from "./useSourceLists";
import { Tooltip } from "@components/tool-tip";

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
const FormContainer = styled.div`
  display: flex;
  flex-direction: column; /* Center the form */
  gap: 1rem;
`;
const ContainerTwoElements = styled.div`
  width: 50%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;
const TypeParametersContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Center the form */
  gap: 1rem;
  /* padding: 1rem; */
`;
const SytledFormButton = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
export const DATA_SOURCE_TYPES = [
  { label: "PostgreSQL", value: 1 },
  { label: "SQLite", value: 2 },
  { label: "MySQL", value: 3 },
  { label: "Microsoft SQL Server", value: 4 },
  { label: "MongoDB", value: 5 },
  { label: "Redis", value: 6 },
  { label: "Excel", value: 7 },
];

type SourceFieldProps = {
  name: string | "";
  type: number | undefined;
  databaseName: string | "";
  host: string | "";
  port: number | undefined;
  username: string | "";
  password: string | "";
  file?: File;
};
const defaultSourceFilters = {
  currentPage: 0,
  pageSize: 20,
  logicalOperator: 1,
  filters: [
    {
      propertyName: "type",
      sign: 0,
      value: "1",
    },
  ],
  orders: [
    {
      propertyName: "name",
      isDescending: true,
    },
  ],
};
export const Sources = () => {
  const [showOtherParameters, setShowOtherParameters] = useState(false);
  const { createSource, isCreating } = useCreateSource();
  const { sourceLists } = useSourceLists();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<SourceFieldProps>({ defaultValues: {} });

  const [name, type] = watch(["name", "type"]);

  function handletypeForm(values: SourceFieldProps) {
    const randomId = uuidv4();
    const formatedPayload = {
      version: 0,
      id: randomId,
      name: values.name,
      type: values.type,
      database: {
        version: 0,
        sourceId: randomId,
        databaseName: values.databaseName,
        host: values.host,
        port: values.port,
        username: values.username,
        password: values.password,
      },
    };
    createSource(formatedPayload, {
      onSuccess: () => {
        reset(), localStorage.removeItem("EmailAccountValues");
      },
      onError: () => {
        localStorage.setItem("EmailAccountValues", JSON.stringify(values)); // Save form values on error
      },
    });
  }
  useEffect(() => {
    const storedValues = localStorage.getItem("EmailAccountValues");
    if (storedValues) {
      reset(JSON.parse(storedValues));
    }
    return () => localStorage.removeItem("EmailAccountValues");
  }, [reset]);

  function clearFields() {
    reset({
      name: "",
      type: undefined,
      host: "",
      port: undefined,
      username: "",
      password: "",
      databaseName: "",
    });
    setShowOtherParameters(false);
  }

  useEffect(() => {
    if (name && type) {
      setShowOtherParameters(true);
    } else {
      setShowOtherParameters(false);
    }

    switch (type) {
      case 1:
        setValue("host", "localhost");
        setValue("port", 5432);
        break;
      case 2:
        setValue("host", "localhost");
        setValue("port", undefined);
        break;
      case 3:
        setValue("host", "localhost");
        setValue("port", 3306);
        break;
      case 4:
        setValue("host", "localhost");
        setValue("port", 1433);
        break;
      case 5:
        setValue("host", "localhost");
        setValue("port", 27017);
        break;
      case 6:
        setValue("host", "localhost");
        setValue("port", 6379);
        break;
      case 7:
        setValue("host", "");
        setValue("port", undefined);
        break;
      default:
        setValue("host", "");
        setValue("port", undefined);
        break;
    }
  }, [name, type]); // Re-run whenever `name` or `type` changes

  useEffect(() => {
    sourceLists(defaultSourceFilters);
  }, []);

  if (isCreating) return <Spinner />;

  return (
    <StyledSource>
      <StyledContainer>
        <span>&larr; New Database Connection</span>
        <Form onSubmit={handleSubmit(handletypeForm)} style={{ all: "unset" }}>
          <FormContainer>
            <ContainerTwoElements>
              <FormRowVertical label="" error={errors.name?.message}>
                <Input {...register("name")} placeholder="Name" />
              </FormRowVertical>
              <FormRowVertical label="" error={errors.type?.message}>
                <SingleSelect name="type" control={control} options={DATA_SOURCE_TYPES} />
              </FormRowVertical>
            </ContainerTwoElements>

            {showOtherParameters && type !== 7 ? (
              <TypeParametersContainer>
                <FormRowVertical error={errors.username?.message}>
                  <Input placeholder="User Name" {...register("username")} />
                </FormRowVertical>
                <FormRowVertical error={errors.password?.message}>
                  <Input type="password" placeholder="Password" {...register("password")} />
                </FormRowVertical>
                <FormRowVertical error={errors.host?.message}>
                  <Input placeholder="Host" {...register("host")} />
                </FormRowVertical>
                <FormRowVertical error={errors.port?.message}>
                  <Input placeholder="Port" {...register("port")} />
                </FormRowVertical>
                <FormRowVertical error={errors.databaseName?.message}>
                  <Input placeholder="Database Name" {...register("databaseName")} />
                </FormRowVertical>
              </TypeParametersContainer>
            ) : showOtherParameters && type === 7 ? (
              <div style={{ minWidth: "60px", maxWidth: "fit-content" }}>
                <FormRowVertical label="" error={errors.file?.message}>
                  <FileInput {...register("file")} />
                </FormRowVertical>
              </div>
            ) : null}

            {showOtherParameters && (
              <SytledFormButton>
                <Button variation="outlinePrimary" onClick={clearFields}>
                  Cancel
                </Button>

                <Button>Save</Button>
              </SytledFormButton>
            )}
          </FormContainer>
        </Form>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
            width: "50%",
          }}
        >
          <Input placeholder="Conn_String" style={{ width: "80%", backgroundColor: "#F9F9FB" }} />
          <Button variation="createNew" type="medium" style={{ width: "18%" }}>
            Test
          </Button>
        </div>
      </StyledContainer>
      <SourceTable />
      <StyledContainer></StyledContainer>
    </StyledSource>
  );
};
