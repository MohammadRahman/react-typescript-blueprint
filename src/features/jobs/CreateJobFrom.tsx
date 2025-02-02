import ButtonGroup from "@components/button-group/ButtonGroup";
import Button from "@components/button/Button";
import Checkbox from "@components/form/CheckBox";
import Form from "@components/form/Form";
import FormRowVertical from "@components/form/FormRowVertical";
import Input from "@components/form/Input";
import { Row } from "@components/row";
import { SingleSelect } from "@components/select";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import { useJobsList } from "./useJobLists";
import { useTemplateData } from "@context/TemplateContext";
import { useEmailTemplate } from "@features/email-template/useEmailTemplate";
import { useEmailAccount } from "@features/mail-server/useEmailAccount";
import { useEmailData } from "@context/EmailAccountContext";
import { useCreateEmailJob } from "./useCreateJob";

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

const formattedValues = {
  page: -1,
  pagesize: -1,
};
interface FormValues {
  jobName: string;
  reportAttachment: string;
  emailTemplate: string;
  mailServer: string;
  eMailType: string;
}
interface TemplateProps {
  id?: number;
  jobName?: string;
  reportAttachment?: string;
  emailTemplate?: string;
  emailAccount?: string;
  eMailType?: string;
}
type NewJobFormProps = {
  templateToEdit?: TemplateProps;
  onCloseModal?: () => void;
};
type StyledCehckboxRowProps = {
  type?: "row" | "column";
};
const StyledCehckboxRow = styled.div<StyledCehckboxRowProps>`
  display: flex;
  flex-direction: ${props => (props.type == "row" ? "row" : "column")};
  border: 1px solid var(--color-grey-300);
  border-radius: 4px;
  padding: 1rem;
  gap: 0.5rem;
  ${props =>
    props.type &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
`;

export const CreateJobFrom = ({ templateToEdit = {}, onCloseModal }: NewJobFormProps) => {
  const { id, ...updateValues } = templateToEdit;
  const isUpdateSession = Boolean(templateToEdit);

  const { job } = useCreateEmailJob();

  const [isReportAttachment, setIsReportAttachment] = useState(false);
  const [isEmailTemplate, setIsEmailTemplate] = useState(false);
  const [isEmailAccount, setIsEmailAccount] = useState(false);
  // const [mailServer, setMailServer] = useState(false);

  const { templateLists } = useEmailTemplate();
  const { emailLists } = useEmailAccount();

  const { template } = useTemplateData();
  const { emailData } = useEmailData();

  const formatedOptions = template?.list.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  const formatedEmailAccount = emailData?.list.map(({ email, id }) => ({
    label: email,
    value: id,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({ defaultValues: isUpdateSession ? updateValues : {} });

  function handleCreateTemplateSubmit(values: TemplateProps) {
    job({
      emailTemplateId: values.emailTemplate,
      emailAccountId: values.emailAccount,
      name: values.jobName,
    });
  }

  useEffect(() => {
    templateLists(formattedValues);
  }, []);

  useEffect(() => {
    emailLists(formattedValues);
  }, []);

  return (
    <div style={{ paddingTop: "1rem", paddingLeft: "6rem" }}>
      <Form onSubmit={handleSubmit(handleCreateTemplateSubmit)} type="modal">
        <span style={{ paddingBottom: "1rem" }}>&larr; Create New Job</span>
        <div style={{ width: "90%" }}>
          <FormRowVertical label="Job Name" error={errors.jobName?.message}>
            <Input placeholder="Type here" {...register("jobName")} />
          </FormRowVertical>
          <FormRowVertical label="" error={errors.reportAttachment?.message}>
            <StyledCehckboxRow>
              <Checkbox
                id="reportAttachment"
                checked={isReportAttachment}
                disabled={false}
                onChange={() => setIsReportAttachment(prev => !prev)}
              >
                Report Attachment (Optional)
              </Checkbox>
              <SingleSelect name="dataSource" control={control} options={formatedOptions || []} />
            </StyledCehckboxRow>
          </FormRowVertical>
          <FormRowVertical label="" error={errors.emailTemplate?.message}>
            <StyledCehckboxRow>
              <Checkbox
                id="emailTemplate"
                checked={isEmailTemplate}
                disabled={false}
                onChange={() => setIsEmailTemplate(prev => !prev)}
              >
                Email Template
              </Checkbox>
              <SingleSelect
                name="emailTemplate"
                control={control}
                options={formatedOptions || []}
              />
            </StyledCehckboxRow>
            <StyledCehckboxRow>
              <Checkbox
                id="emailAccount"
                checked={isEmailAccount}
                disabled={false}
                onChange={() => setIsEmailAccount(prev => !prev)}
              >
                Email Account
              </Checkbox>
              <SingleSelect
                name="emailAccount"
                control={control}
                options={formatedEmailAccount || []}
              />
            </StyledCehckboxRow>
          </FormRowVertical>
          {/* <FormRowVertical label="" error={errors.mailServer?.message}>
            <StyledCehckboxRow type="row">
              <Checkbox
                id="mailServer"
                checked={mailServer}
                disabled={false}
                onChange={() => setMailServer(prev => !prev)}
              >
                Mail Server
              </Checkbox>
              <Button variation="primary">Create</Button>
            </StyledCehckboxRow>
          </FormRowVertical> */}
          {/* <FormRowVertical label="eMail Type" error={errors.eMailType?.message}>
            <SingleSelect name="" control={control} options={selectOptions} />
          </FormRowVertical> */}
          <div style={{ paddingTop: "8rem", paddingBottom: "2rem" }}>
            <Row type="horizontal">
              <Button variation="outlinePrimary" onClick={onCloseModal} style={{ width: "200px" }}>
                Cancel
              </Button>
              <ButtonGroup>
                <Button variation="primary" style={{ width: "200px" }}>
                  Start Job
                </Button>
              </ButtonGroup>
            </Row>
          </div>
        </div>
      </Form>
    </div>
  );
};
