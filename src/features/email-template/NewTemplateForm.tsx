import Button from "@components/button/Button";
import Form from "@components/form/Form";
import FormRowVertical from "@components/form/FormRowVertical";
import Input from "@components/form/Input";
import { Row } from "@components/row";
import { SingleSelect } from "@components/select";
import { useForm } from "react-hook-form";
import { useCreateEmailTemplate } from "./useCreateEmailTemplate";
import { useUpdateTemplate } from "./useUpdateTemplate";
import { usequeryData } from "@context/QueryContext";
import { Modal } from "@components/modal";
import RenderHTML from "./RenderHTML";
import { useEffect, useMemo, useState } from "react";
import { DEFAULT_FILTER_VALUES } from "@constants/source";
import { useQueryData } from "@features/queries/useQueryData";
import FormHeader from "@components/header/FormHeader";
import { Container } from "@components/container/Container";
import { Grid } from "@components/grid/Grid";
import AutocompleteInput from "@components/form/AutoCompleteInput";
import { RichText } from "@components/rich-text/LexicalRichText";
import { useFindQueryFields } from "@features/queries/useFindQueryId";
import ButtonGroup from "@components/button-group/ButtonGroup";

interface FormValues {
  id?: string;
  name: string;
  subject: string;
  template: string;
  body: string;
  queryId: string;
  to: string;
}
interface TemplateProps {
  id?: string;
  name?: string;
  subject?: string;
  template?: string;
  body?: string;
  queryId?: string;
  to?: string;
}
type NewTemplateFormProps = {
  templateToEdit?: TemplateProps;
  onCloseModal?: () => void;
};
export const NewTemplateForm = ({ templateToEdit = {}, onCloseModal }: NewTemplateFormProps) => {
  const { updateTemplate } = useUpdateTemplate();
  const { queryData } = usequeryData();
  const { queryFields, queryFiledData } = useFindQueryFields();
  const [hasFetched, setHasFetched] = useState(false);
  const { queryLists, isLoading } = useQueryData();

  const memoizedFieldValues = useMemo(() => queryFiledData, [queryFiledData]);
  const transformedOptions = queryData?.list.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  const { id, ...updateValues } = templateToEdit;
  const isUpdateSession = Boolean(id);
  // const [value, setValue] = useState(isUpdateSession ? templateToEdit.subject : "");
  const { createTemplate } = useCreateEmailTemplate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm<FormValues>({ defaultValues: isUpdateSession ? updateValues : {} });

  const fetchSources = () => {
    if (!hasFetched) {
      queryLists(DEFAULT_FILTER_VALUES);
      setHasFetched(true);
    }
  };

  const [body, queryId] = watch(["body", "queryId"]);
  function handleCreateTemplateSubmit(values: any) {
    const formatedValues = {
      name: values.name || "",
      queryId: values.queryId || "",
      to: values.to || "",
      subject: values.subject || "",
      body: values.body,
    };
    if (isUpdateSession) {
      console.log("values during update", {
        id: templateToEdit.id,
        version: 0,
        name: values.name,
        queryId: values.queryId,
        to: values.to,
        subject: values.subject,
        body: values.body,
      });
      updateTemplate(
        {
          id: templateToEdit.id,
          version: 0,
          name: values.name,
          queryId: values.queryId,
          to: values.to,
          subject: values.subject,
          body: values.body,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createTemplate(formatedValues, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  }

  useEffect(() => {
    if (isUpdateSession) {
      queryLists(DEFAULT_FILTER_VALUES);
    }
  }, [isUpdateSession]);

  useEffect(() => {
    if (queryId) {
      queryFields(queryId);
    }
  }, [queryId]);

  return (
    <Container padding="md">
      <Form onSubmit={handleSubmit(handleCreateTemplateSubmit)} type="modal">
        <FormHeader heading="Create New Email Template" />
        <Container
          padding="sm"
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ flexGrow: 1 }}>
            <Grid columns={2} gap="md">
              <FormRowVertical label="Name" error={errors.name?.message}>
                <Input
                  bgc="true"
                  placeholder="Type here"
                  {...register("name", { required: "Name is required" })}
                />
              </FormRowVertical>

              <FormRowVertical label="Query" error={errors.queryId?.message}>
                <SingleSelect
                  name="queryId"
                  control={control}
                  options={transformedOptions || []}
                  isLoading={isLoading}
                  onDropdownOpen={fetchSources}
                  rules={{ required: "Query is quired" }}
                />
              </FormRowVertical>

              <FormRowVertical label="To" error={errors.to?.message}>
                <Input
                  bgc="true"
                  placeholder="Type here"
                  {...register("to", { required: "Email to is required" })}
                />
              </FormRowVertical>

              <FormRowVertical label="Subject" error={errors.subject?.message}>
                <AutocompleteInput
                  // value={value || ""}
                  control={control}
                  name="subject"
                  rules={{ required: "Subject is required." }}
                  // onChange={setValue}
                  placeholder="Type @ to trigger dropdown"
                  bgc="true"
                  fieldValues={memoizedFieldValues}
                  // error={errors.subject?.message}
                />
              </FormRowVertical>

              <FormRowVertical
                label="Body"
                error={errors.body?.message}
                style={{ gridColumn: "span 2" }}
              >
                <RichText
                  rules={{ required: "Message is required" }}
                  name="body"
                  control={control}
                  fieldValues={memoizedFieldValues}
                />
              </FormRowVertical>
            </Grid>
          </div>
          <ButtonGroup gap="md" content="space-between">
            <Button variation="outlinePreview" onClick={onCloseModal}>
              Cancel
            </Button>

            <Modal>
              <Modal.Open opens="htmlPreview">
                <Button variation="outlinePreview" type="button">
                  Preview
                </Button>
              </Modal.Open>
              <Modal.Window name="htmlPreview" type="htmlPreview">
                <RenderHTML content={body} />
              </Modal.Window>
            </Modal>
            <Button variation="primarySmall">Save Template</Button>
          </ButtonGroup>
        </Container>
      </Form>
    </Container>
  );
};
// Row justifycontent="space-between" style={{ paddingTop: "1rem" }}
