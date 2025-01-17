import ButtonGroup from "@components/button-group/ButtonGroup";
import Button from "@components/button/Button";
import Form from "@components/form/Form";
import FormRowVertical from "@components/form/FormRowVertical";
import Input from "@components/form/Input";
import { RichText } from "@components/rich-text/RichText";
import { Row } from "@components/row";
import { SingleSelect } from "@components/select";
import { useForm } from "react-hook-form";
import { useCreateEmailTemplate } from "./useCreateEmailTemplate";
import { useUpdateTemplate } from "./useUpdateTemplate";
import { v4 as uuidv4 } from "uuid";
import { usequeryData } from "@context/QueryContext";
import { useEffect, useState } from "react";
import { Modal } from "@components/modal";
import RenderHTML from "./RenderHTML";

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
  const [bodyContent, setBodyContent] = useState("");
  const queryLists = queryData?.list.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  const { id, ...updateValues } = templateToEdit;
  const isUpdateSession = Boolean(id);
  const { createTemplate } = useCreateEmailTemplate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm<FormValues>({ defaultValues: isUpdateSession ? updateValues : {} });

  const [body] = watch(["body"]);

  function handleCreateTemplateSubmit(values: any) {
    const templateId = uuidv4();
    const formatedValues = {
      version: 0,
      id: templateId,
      name: values.name,
      queryId: values.queryId,
      to: values.to,
      subject: values.subject,
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

  return (
    <div style={{ paddingTop: "1rem", paddingLeft: "6rem" }}>
      <Form onSubmit={handleSubmit(handleCreateTemplateSubmit)} type="modal">
        <span style={{ paddingBottom: "1rem" }}>&larr; Create New Email Template</span>
        <div style={{ width: "90%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div style={{ width: "49%" }}>
              <FormRowVertical label="Name" error={errors.name?.message}>
                <Input placeholder="Type here" {...register("name")} />
              </FormRowVertical>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div style={{ width: "49%" }}>
              <FormRowVertical label="To" error={errors.to?.message}>
                <Input placeholder="Type here" {...register("to")} />
              </FormRowVertical>
            </div>
            <div style={{ width: "49%" }}>
              <FormRowVertical label="Query" error={errors.queryId?.message}>
                <SingleSelect name="queryId" control={control} options={queryLists || []} />
              </FormRowVertical>
            </div>
          </div>

          <FormRowVertical label="Subject" error={errors.subject?.message}>
            <Input placeholder="Subject" {...register("subject")} />
          </FormRowVertical>
          <FormRowVertical label="body" error={errors.body?.message}>
            <RichText name="body" control={control} />
          </FormRowVertical>
          <div style={{ paddingTop: "1rem", paddingBottom: "2rem" }}>
            <Row type="horizontal">
              <Button variation="outlinePrimary" onClick={onCloseModal}>
                Cancel
              </Button>
              <ButtonGroup>
                <Modal>
                  <Modal.Open opens="htmlPreview">
                    <Button variation="outlinePrimary" type="button">
                      Preview
                    </Button>
                  </Modal.Open>
                  <Modal.Window name="htmlPreview" type="htmlPreview">
                    <RenderHTML content={body} />
                  </Modal.Window>
                </Modal>
                <Button variation="primary">Save Template</Button>
              </ButtonGroup>
            </Row>
          </div>
        </div>
      </Form>
    </div>
  );
};
