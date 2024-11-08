import ButtonGroup from "@components/button-group/ButtonGroup";
import Button from "@components/button/Button";
import Form from "@components/form/Form";
import FormRowVertical from "@components/form/FormRowVertical";
import Input from "@components/form/Input";
import { RichText } from "@components/rich-text/RichText";
import { Row } from "@components/row";
import { SingleSelect } from "@components/select";
import { useForm } from "react-hook-form";
// import { useCreateEmailTemplate } from "./useCreateEmailTemplate";
// import { useUpdateEmailTemplate } from "./useUpdateEmailTemplate";

const selectOptions = [
  {
    label: "data source 1",
    value: "1",
  },
  {
    label: "data source 1",
    value: "2",
  },
  {
    label: "data source 1",
    value: "3",
  },
];
interface ReportFormProps {
  id?: number
  name?: string;
  dataSource?: string;
  template?: string;
  description?: string;
}
type NewTemplateFormProps = {
  templateToEdit?: ReportFormProps;
  onCloseModal?: () => void;
};
interface FormValues {
  name: string;
  dataSource: string;
  template: string;
  description: string;
}
export const NewReportForm = ({ templateToEdit = {}, onCloseModal }: NewTemplateFormProps) => {
  //   const { isCreating, createEmailTemplate } = useCreateEmailTemplate();
  //   const { isEditing, updateEmailTemplate } = useUpdateEmailTemplate();

  const { id, ...updateValues } = templateToEdit;
  const isUpdateSession = Boolean(templateToEdit);
  //   const isWorking = isCreating || isEditing;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({ defaultValues: isUpdateSession ? updateValues : {} });

  function handleCreateTemplateSubmit(values: any) {
    console.log("create email template values", values);
  }
  return (
    <>
      <Form onSubmit={handleSubmit(handleCreateTemplateSubmit)}>
        <span style={{ paddingBottom: "1rem" }}>&larr; Create New Email Template</span>
        <div style={{ width: "90%" }}>
          <FormRowVertical label="Name" error={errors.name?.message}>
            <Input placeholder="Type here" {...register("name")} />
          </FormRowVertical>
          <FormRowVertical label="Select data for source" error={errors.dataSource?.message}>
            <SingleSelect name="dataSource" control={control} options={selectOptions} />
          </FormRowVertical>
          <FormRowVertical label="Subject" error={errors.template?.message}>
            <Input placeholder="Subject" {...register("template")} />
          </FormRowVertical>

          <FormRowVertical label="Description" error={errors.description?.message}>
            <RichText name="description" control={control} />
          </FormRowVertical>
          <div style={{ paddingTop: "1rem", paddingBottom: "2rem" }}>
            <Row type="horizontal">
              <Button variation="outlinePrimary" onClick={onCloseModal}>Cancel</Button>
              <ButtonGroup>
                <Button variation="outlinePrimary">Preview</Button>
                <Button variation="primary">Save Template</Button>
              </ButtonGroup>
            </Row>
          </div>
        </div>
      </Form>
    </>
  );
};
