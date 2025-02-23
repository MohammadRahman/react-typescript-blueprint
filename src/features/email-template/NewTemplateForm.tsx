import Button from "@components/button/Button";
import Form from "@components/form/Form";
import FormRowVertical from "@components/form/FormRowVertical";
import Input from "@components/form/Input";
import { Row } from "@components/row";
import { SingleSelect } from "@components/select";
import { useForm } from "react-hook-form";
import { useCreateEmailTemplate } from "./useCreateEmailTemplate";
import { useUpdateTemplate } from "./useUpdateTemplate";
import { v4 as uuidv4 } from "uuid";
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

interface FormValues {
  id?: string;
  name: string;
  subject: string;
  template: string;
  body: string;
  queryId?: string;
  to?: string;
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
  const [value, setValue] = useState(isUpdateSession ? templateToEdit.subject : "");
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
    const templateId = uuidv4();
    const formatedValues = {
      version: 0,
      id: templateId,
      name: values.name,
      queryId: values.queryId,
      to: values.to,
      subject: value,
      // subject: values.subject,
      body: values.body,
    };
    if (isUpdateSession) {
      updateTemplate(
        {
          id: templateToEdit.id,
          version: 0,
          name: values.name,
          queryId: values.queryId,
          to: values.to,
          // auto complete values
          subject: value,
          // subject: values.subject,
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
        <Container padding="md">
          <Grid columns={2} gap="md">
            <FormRowVertical label="Name" error={errors.name?.message}>
              <Input bgc="true" placeholder="Type here" {...register("name")} />
            </FormRowVertical>

            <FormRowVertical label="Query" error={errors.queryId?.message}>
              <SingleSelect
                name="queryId"
                control={control}
                options={transformedOptions || []}
                isLoading={isLoading}
                onDropdownOpen={fetchSources}
              />
            </FormRowVertical>

            <FormRowVertical label="To" error={errors.to?.message}>
              <Input bgc="true" placeholder="Type here" {...register("to")} />
            </FormRowVertical>

            <FormRowVertical label="Subject" error={errors.subject?.message}>
              <AutocompleteInput
                value={value || ""}
                onChange={setValue}
                placeholder="Type @ to trigger dropdown"
                bgc="true"
                fieldValues={memoizedFieldValues}
              />
            </FormRowVertical>

            <FormRowVertical
              label="Body"
              error={errors.body?.message}
              style={{ gridColumn: "span 2" }}
            >
              <RichText name="body" control={control} fieldValues={memoizedFieldValues} />
            </FormRowVertical>
          </Grid>

          <Row justifycontent="space-between" style={{ paddingTop: "1rem" }}>
            <div>
              <Button variation="outlinePreview" onClick={onCloseModal}>
                Cancel
              </Button>
            </div>

            <Row gap="sm">
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
            </Row>
          </Row>
        </Container>
      </Form>
    </Container>
  );
};
