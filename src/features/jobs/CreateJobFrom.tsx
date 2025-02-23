import ButtonGroup from "@components/button-group/ButtonGroup";
import Button from "@components/button/Button";
import Checkbox from "@components/form/CheckBox";
import Form from "@components/form/Form";
import FormRowVertical from "@components/form/FormRowVertical";
import Input from "@components/form/Input";
import { Row } from "@components/row";
import { SingleSelect } from "@components/select";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTemplateData } from "@context/TemplateContext";
import { useEmailTemplate } from "@features/email-template/useEmailTemplate";
import { useEmailAccount } from "@features/mail-server/useEmailAccount";
import { useEmailData } from "@context/EmailAccountContext";
import { useCreateEmailJob } from "./useCreateJob";
import { DEFAULT_FILTER_VALUES } from "@constants/source";
import { StyledCehckboxRow } from "./job.styles";
import { formatSelectOptions } from "@utils/helper";
import { Container } from "@components/container/Container";
import FormHeader from "@components/header/FormHeader";
import { useUpdateJob } from "./useUpdateJob";
interface FormValues {
  jobId?: string;
  name: string;
  reportAttachment: string;
  emailTemplateId: string;
  emailAccountId: string;
  eMailType: string;
}
interface JobProps {
  jobId?: string;
  name?: string;
  reportAttachment?: string;
  emailTemplateId?: string;
  emailAccountId?: string;
  eMailType?: string;
}
type NewJobFormProps = {
  jobToEdit?: JobProps;
  onCloseModal?: () => void;
};

export const CreateJobFrom = ({ jobToEdit = {}, onCloseModal }: NewJobFormProps) => {
  const { jobId, ...updateValues } = jobToEdit;
  console.log("updateValues", jobToEdit);
  const isUpdateSession = Boolean(jobToEdit);
  const { updateJob } = useUpdateJob();
  const { startJob } = useCreateEmailJob();

  const [isReportAttachment, setIsReportAttachment] = useState(false);

  const { templateLists } = useEmailTemplate();
  const { emailLists } = useEmailAccount();

  const [isTemplatesFetched, setHasTemplateFetched] = useState(false);
  const [isEmailAccountFetched, setHasEmailAccountFetched] = useState(false);

  const { template } = useTemplateData();
  const { emailData } = useEmailData();

  const formatedOptions = formatSelectOptions(template?.list || [], "name");
  const formatedEmailAccount = formatSelectOptions(emailData?.list || [], "email");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<FormValues>({ defaultValues: isUpdateSession ? updateValues : {} });

  const watchValue = watch();

  function handleCreateTemplateSubmit(values: JobProps) {
    if (isUpdateSession) {
      updateJob({
        jobId: jobToEdit.jobId,
        emailTemplateId: jobToEdit.emailTemplateId,
        emailAccountId: jobToEdit.emailAccountId,
        name: jobToEdit.name,
      });
    }
    startJob(
      {
        emailTemplateId: values.emailTemplateId,
        emailAccountId: values.emailAccountId,
        name: values.name,
      },
      {
        onSuccess: () => {
          onCloseModal?.();
        },
      }
    );
  }

  const fetchTemplates = () => {
    if (!isTemplatesFetched) {
      templateLists(DEFAULT_FILTER_VALUES);
      setHasTemplateFetched(true);
    }
  };

  const fetchEmailAccounts = () => {
    if (!isEmailAccountFetched) {
      emailLists(DEFAULT_FILTER_VALUES);
      setHasEmailAccountFetched(true);
    }
  };
  return (
    <Container padding="md">
      <Form onSubmit={handleSubmit(handleCreateTemplateSubmit)} type="modal">
        <FormHeader heading="Create New Job" style={{ paddingBottom: "1rem" }} />
        <Row type="vertical" gap="md">
          <FormRowVertical label="Job Name" error={errors.name?.message}>
            <Input
              bgc="true"
              placeholder="Type here"
              {...register("name", { required: "Name can not be empty." })}
            />
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
              <SingleSelect
                name="dataSource"
                control={control}
                options={formatedOptions || []}
                onDropdownOpen={fetchTemplates}
              />
            </StyledCehckboxRow>
          </FormRowVertical>
          <FormRowVertical label="" error={errors.emailTemplateId?.message}>
            <StyledCehckboxRow>
              <Checkbox
                id="emailTemplateId"
                checked={!!watchValue.emailTemplateId}
                disabled={false}
              >
                Email Template
              </Checkbox>
              <SingleSelect
                name="emailTemplateId"
                control={control}
                options={formatedOptions || []}
                onDropdownOpen={fetchTemplates}
              />
            </StyledCehckboxRow>
          </FormRowVertical>
          <FormRowVertical label="" error={errors.emailAccountId?.message}>
            <StyledCehckboxRow>
              <Checkbox id="emailAccountId" checked={!!watchValue.emailAccountId} disabled={false}>
                Email Account
              </Checkbox>
              <SingleSelect
                name="emailAccountId"
                control={control}
                options={formatedEmailAccount || []}
                onDropdownOpen={fetchEmailAccounts}
              />
            </StyledCehckboxRow>
          </FormRowVertical>
          <Container>
            <Row type="horizontal">
              <Button
                variation="outlineDanger"
                onClick={onCloseModal}
                style={{ width: "200px", height: "4.5rem" }}
              >
                Cancel
              </Button>
              <ButtonGroup>
                <Button variation="primary" style={{ width: "200px" }}>
                  Create Job
                </Button>
              </ButtonGroup>
            </Row>
          </Container>
        </Row>
      </Form>
    </Container>
  );
};
