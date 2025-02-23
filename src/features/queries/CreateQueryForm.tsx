import Form from "@components/form/Form";
import { StyledButton } from "./query.styles";
import FormRowVertical from "@components/form/FormRowVertical";
import Input from "@components/form/Input";
import Checkbox from "@components/form/CheckBox";
import { SingleSelect } from "@components/select";
import SQLQueryEditor from "@components/editor/MonacoSqlEditor";
import { HiOutlineEye } from "react-icons/hi2";
import Button from "@components/button/Button";
import { useForm } from "react-hook-form";
import { useCreateQuery } from "./useCreateQuery";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useUpdateQuery } from "./useUpdateQuery";
import { QueryPayload } from "@apis/query";
import { useSourceData } from "@context/SourceContext";
import { useSourceLists } from "@features/sources/useSourceLists";
import { DEFAULT_FILTER_VALUES } from "@constants/source";
import { FormInputWithCheckBox } from "@components/container/FormInputWithCeckbox";
import { Grid } from "@components/grid/Grid";
import SqlEditor from "@components/editor/SqlEditor";

export type CreateQueryFormProps = {
  formData?: {
    version?: number;
    id?: string;
    name?: string;
    body?: string;
    sourceId?: string;
    emailField?: string;
    clientIdField?: string;
  };
  onCloseModal?: () => void;
};
const CreateQueryForm = ({ formData = {}, onCloseModal }: CreateQueryFormProps) => {
  const { id } = formData;
  const isUpdateSession = Boolean(id);
  const { updateQueryData, isUpdating } = useUpdateQuery();
  const [query, setQuery] = useState(isUpdateSession ? formData.body : "");
  const { sourceLists, isLoading } = useSourceLists();
  const { sourceData } = useSourceData();

  const [dataSource, setDataSource] = useState(!!formData.sourceId);
  const [clientIdField, setclientIdField] = useState(!!formData.clientIdField);
  const [databaseConnection, setDatabaseConnection] = useState(false);
  const [sqlQuery, setSqlQuery] = useState(!!formData.body);
  const [showEditor, setShowEditor] = useState(false);

  const { createQuery } = useCreateQuery();

  const sources =
    sourceData &&
    (sourceData?.list || []).map(source => ({
      label: source.name,
      value: source.id,
    }));

  const {
    control,
    reset,
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: isUpdateSession ? formData : {},
  });
  const watchValue = watch();

  function clearFields() {
    reset();
    setDataSource(false);
    setDatabaseConnection(false);
    setSqlQuery(false);
    setQuery("");
    onCloseModal?.();
  }

  function submitHandler(values: CreateQueryFormProps["formData"]) {
    const queryId = uuidv4();
    const formatedUpdatePayload: QueryPayload = {
      version: 0,
      id: formData.id || "",
      name: values?.name || "",
      sourceId: values?.sourceId || "",
      clientIdField: values?.clientIdField || "",
      emailField: values?.emailField || "",
      body: values?.body || "",
    };
    if (isUpdateSession) {
      updateQueryData(formatedUpdatePayload, {
        onSuccess: () => {
          clearFields();
        },
      });
    } else {
      createQuery(
        {
          version: 0,
          id: queryId,
          sourceId: values?.sourceId,
          clientIdField: values?.clientIdField,
          emailField: values?.emailField,
          name: values?.name,
          body: query,
        },
        {
          onSuccess: () => {
            clearFields();
          },
        }
      );
    }
  }

  const [hasFetched, setHasFetched] = useState(false);

  const fetchSources = () => {
    if (!hasFetched) {
      sourceLists(DEFAULT_FILTER_VALUES);
      setHasFetched(true);
    }
  };

  return (
    <Form onSubmit={handleSubmit(submitHandler)} style={{ padding: "0" }}>
      <Grid columns={3} gap="xxxl" style={{ marginBottom: "1rem" }}>
        <FormInputWithCheckBox>
          <Checkbox checked={true} id="name" />
          <FormRowVertical error={errors.name?.message}>
            <Input {...register("name")} placeholder="Name" isCheckbox="true" />
          </FormRowVertical>
        </FormInputWithCheckBox>
        <FormInputWithCheckBox>
          <Checkbox checked={true} id="clientIdField" />
          <FormRowVertical error={errors.clientIdField?.message}>
            <Input {...register("clientIdField")} placeholder="Client Id" isCheckbox="true" />
          </FormRowVertical>
        </FormInputWithCheckBox>
        <FormInputWithCheckBox>
          <Checkbox checked={true} id="email" />
          <FormRowVertical error={errors.emailField?.message}>
            <Input {...register("emailField")} placeholder="Email" isCheckbox="true" />
          </FormRowVertical>
        </FormInputWithCheckBox>
        <FormInputWithCheckBox style={{ width: "100%" }}>
          <Checkbox checked={true} id="dataSource" />
          <FormRowVertical error={errors.sourceId?.message}>
            <SingleSelect
              name="sourceId"
              isCheckbox="true"
              control={control}
              options={sources || []}
              isLoading={isLoading}
              onDropdownOpen={fetchSources}
            />
          </FormRowVertical>
        </FormInputWithCheckBox>
        <FormInputWithCheckBox>
          <FormRowVertical label="">
            <Checkbox
              id="sqlQuery"
              checked={sqlQuery}
              onChange={() => {
                setSqlQuery(prev => !prev);
                setShowEditor(!showEditor);
              }}
            >
              <span>SQL query</span>
            </Checkbox>
            {sqlQuery && (
              <>
                {!showEditor && (
                  <div style={{ position: "absolute", right: "1rem" }}>
                    <HiOutlineEye
                      type="button"
                      onClick={() => setShowEditor(true)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                )}
                {showEditor && (
                  <div>
                    <SqlEditor
                      register={register}
                      setValue={setValue}
                      watch={watch}
                      setShowEditor={setShowEditor}
                      setQuery={setQuery}
                      sourceId={watchValue.sourceId || ""}
                      width="800px"
                      height="500px"
                    />
                  </div>
                  // <SQLQueryEditor
                  //   setShowEditor={setShowEditor}
                  //   query={query || ""}
                  //   setQuery={setQuery}
                  // />
                )}
              </>
            )}
          </FormRowVertical>
        </FormInputWithCheckBox>
        <StyledButton>
          <Button type="button" onClick={clearFields}>
            Cancel
          </Button>
          <Button>Save</Button>
        </StyledButton>
      </Grid>
    </Form>
  );
};

export default CreateQueryForm;
