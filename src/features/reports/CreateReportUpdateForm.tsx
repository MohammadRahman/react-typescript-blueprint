import ButtonGroup from "@components/button-group/ButtonGroup";
import Button from "@components/button/Button";
import Form from "@components/form/Form";
import FormRowVertical from "@components/form/FormRowVertical";
import Input from "@components/form/Input";
import { RichText } from "@components/rich-text/RichText";
import { Row } from "@components/row";
import { SingleSelect } from "@components/select";
import { useForm } from "react-hook-form";

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
type CreateReportUpdateFormProps = {
  onCloseModal?: ()=> void 
}
export const CreateReportUpdateForm = ({onCloseModal}: CreateReportUpdateFormProps) => {
  const {
    register,
    formState: { errors },
    control
  } = useForm();
  return (
    <div style={{ height: "100%" }}>
      <Form style={{ width: "100%" }}>
        <span style={{ paddingBottom: "1rem" }}>&larr; Create New Report</span>
        <div style={{ width: "90%" }}>
          <FormRowVertical label="Name" error={errors.name?.message}>
            <Input placeholder="Type here" {...register("name")} />
          </FormRowVertical>
          <FormRowVertical label="Select data for source" error={errors.select?.message}>
            <SingleSelect name="" control={control} options={selectOptions} />
          </FormRowVertical>
          <FormRowVertical label="Subject" error={errors.templateSubject?.message}>
            <Input placeholder="Subject" {...register("templateSubject")} />
          </FormRowVertical>
          <FormRowVertical label="Description" error={errors.description?.message}>
            <RichText name=""/>
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
    </div>
  );
};
