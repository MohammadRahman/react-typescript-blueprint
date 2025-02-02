import Button from "@components/button/Button";
import Form from "@components/form/Form";
import FormRowVertical from "@components/form/FormRowVertical";
import Input from "@components/form/Input";
import { SingleSelect } from "@components/select";
import {
  ContainerTwoElements,
  FormContainer,
  SytledFormButton,
  TypeParametersContainer,
} from "./source.styles";
import { useForm } from "react-hook-form";
import { useCreateSource } from "./useCreateSource";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { DATA_SOURCE_TYPES } from "@constants/source";
import FileInput from "@components/form/FileInput";
import { useUpdateSourceAccount } from "./useUpdateSource";
import { useConnectionStr } from "@context/ConnectionStringContext";
import { formatConnectionStr } from "@utils/helper";
import { FormInputWithCheckBox } from "@components/container/FormInputWithCeckbox";
import Checkbox from "@components/form/CheckBox";
import { Grid } from "@components/grid/Grid";
import { Container } from "@components/container/Container";
import { Row } from "@components/row";

type SourceFieldProps = {
  name: string;
  type: number;
  databaseName: string;
  host: string;
  port: number | undefined;
  username: string;
  password: string;
  csv?: FileList;
};
type Database = {
  databaseName?: string;
  host?: string;
  port?: number | undefined;
  username?: string;
  password?: string;
  csv?: FileList;
  type?: number;
  version?: number;
};

export type SourceProps = {
  id?: string;
  name?: string;
  type?: number;
  database: Database;
};

export type CreateSourceFormProps = {
  formData?: {
    version?: number;
    id?: string;
    name?: string;
    type?: number;
    database: Database;
  };
  onCloseModal?: () => void;
};
const CreateSourceForm = ({ formData = { database: {} }, onCloseModal }: CreateSourceFormProps) => {
  const [showOtherParameters, setShowOtherParameters] = useState(false);
  const { createSource, isCreating } = useCreateSource();
  const { updateSourceAccount, isUpdating } = useUpdateSourceAccount();

  const { setConnectionString } = useConnectionStr();

  const { id } = formData;

  const mapToOneObject = {
    id: formData.id,
    name: formData.name,
    type: formData.type,
    ...formData.database,
  };

  const isUpdateSession = Boolean(id);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    register,
    setValue,
    watch,
  } = useForm<SourceFieldProps>({
    defaultValues: isUpdateSession ? mapToOneObject : {},
  });

  const watchValue = watch();

  function clearFields() {
    reset();
    setShowOtherParameters(false);
    localStorage.removeItem("SourceAccountValues");
  }
  function handletypeForm(values: SourceFieldProps) {
    const randomId = uuidv4();
    // const mediaFile = values.file ? values.file?.item(0) : null;
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
      csv: values.csv ? values.csv[0] : null,
      // csv: mediaFile,
    };
    if (isUpdateSession && id) {
      const updatePayload = {
        version: formData?.version,
        id: formData.id,
        name: values.name,
        type: values.type,
        database: {
          version: formData?.version,
          sourceId: formData.id,
          databaseName: values.databaseName,
          host: values.host,
          port: values.port,
          username: values.username,
          password: values.password,
        },
        csv: values.csv ? values.csv[0] : null,
      };
      updateSourceAccount(updatePayload, {
        onSuccess: () => {
          onCloseModal?.();
        },
      });
    } else {
      createSource(formatedPayload, {
        onSuccess: () => {
          clearFields();
        },
        onError: () => {
          localStorage.setItem("SourceAccountValues", JSON.stringify(values)); // Save form values on error
        },
      });
    }
  }

  const dbProps = {
    type: watchValue.type,
    databaseName: watchValue.databaseName || "",
    username: watchValue.username || "",
    password: watchValue.password || "",
    host: watchValue.host || "",
    port: Number(watchValue.port),
  };
  useEffect(() => {
    const str = formatConnectionStr({ database: dbProps });
    setConnectionString(str);
  }, [setConnectionString, dbProps]);

  useEffect(() => {
    const storedValues = localStorage.getItem("SourceAccountValues");
    if (storedValues) {
      reset(JSON.parse(storedValues));
    }
    return () => localStorage.removeItem("SourceAccountValues");
  }, [reset]);

  useEffect(() => {
    if (watchValue.name && watchValue.type) {
      setShowOtherParameters(true);
    } else {
      setShowOtherParameters(false);
    }
    if (isUpdateSession) return;
    switch (watchValue.type) {
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
      case 8:
        setValue("host", "");
        setValue("port", undefined);
        break;
      default:
        setValue("host", "");
        setValue("port", undefined);
        break;
    }
  }, [watchValue.name, watchValue.type, isUpdateSession]);
  return (
    <Form onSubmit={handleSubmit(handletypeForm)} style={{ all: "unset" }}>
      <FormContainer>
        <Grid columns={2} gap="md">
          <FormInputWithCheckBox>
            {watchValue.name && <Checkbox checked={true} id="name" />}
            <FormRowVertical label="" error={errors.name?.message}>
              <Input {...register("name")} placeholder="Server Name" isCheckbox="true" />
            </FormRowVertical>
          </FormInputWithCheckBox>
          <FormInputWithCheckBox>
            {watchValue.type && <Checkbox checked={true} id="type" />}
            <FormRowVertical label="" error={errors.type?.message}>
              <SingleSelect
                name="type"
                control={control}
                isCheckbox="true"
                options={DATA_SOURCE_TYPES}
              />
            </FormRowVertical>
          </FormInputWithCheckBox>
        </Grid>

        {showOtherParameters && watchValue.type != 7 && watchValue.type != 8 ? (
          <Grid columns={2} gap="md">
            <FormInputWithCheckBox>
              {watchValue.username && <Checkbox checked={true} id="userName" />}

              <FormRowVertical error={errors.username?.message}>
                <Input placeholder="User Name" {...register("username")} isCheckbox="true" />
              </FormRowVertical>
            </FormInputWithCheckBox>
            <FormInputWithCheckBox>
              {watchValue.password && <Checkbox checked={true} id="password" />}

              <FormRowVertical error={errors.password?.message}>
                <Input
                  type="password"
                  {...register("password")}
                  placeholder="Password"
                  isCheckbox="true"
                />
              </FormRowVertical>
            </FormInputWithCheckBox>
            <FormInputWithCheckBox>
              {watchValue.host && <Checkbox checked={true} id="host" />}
              <FormRowVertical error={errors.host?.message}>
                <Input placeholder="Host" {...register("host")} isCheckbox="true" />
              </FormRowVertical>
            </FormInputWithCheckBox>
            <FormInputWithCheckBox>
              {watchValue.port && <Checkbox checked={true} id="port" />}
              <FormRowVertical error={errors.port?.message}>
                <Input placeholder="Port" {...register("port")} isCheckbox="true" />
              </FormRowVertical>
            </FormInputWithCheckBox>
            <FormInputWithCheckBox>
              {watchValue.databaseName && <Checkbox checked={true} id="databaseName" />}

              <FormRowVertical error={errors.databaseName?.message}>
                <Input
                  placeholder="Database Name"
                  {...register("databaseName")}
                  isCheckbox="true"
                />
              </FormRowVertical>
            </FormInputWithCheckBox>
            <FormInputWithCheckBox>
              {(watchValue.csv ?? []).length > 0 && <Checkbox checked={true} id="csv" />}

              <FormRowVertical label="" error={errors.csv?.message}>
                <FileInput {...register("csv")} />
              </FormRowVertical>
            </FormInputWithCheckBox>
          </Grid>
        ) : (showOtherParameters && watchValue.type === 7) ||
          (showOtherParameters && watchValue.type === 8) ? (
          <div style={{ minWidth: "60px", maxWidth: "fit-content" }}>
            <FormInputWithCheckBox>
              {watchValue.csv && <Checkbox checked={true} id="csv" />}
              <FormRowVertical label="" error={errors.csv?.message}>
                <FileInput {...register("csv")} />
              </FormRowVertical>
            </FormInputWithCheckBox>
          </div>
        ) : null}

        {showOtherParameters && (
          <Container padding="md" style={{ paddingTop: "2rem" }}>
            <Row style={{ justifyContent: "flex-end", gap: "1rem" }}>
              {!isUpdateSession && (
                <Button type="button" variation="danger" onClick={clearFields}>
                  Cancel
                </Button>
              )}

              <Button variation="primary" size="medium" isLoading={isCreating}>
                Save
              </Button>
            </Row>
          </Container>
        )}
      </FormContainer>
    </Form>
  );
};

export default CreateSourceForm;
