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
import { useCreateJob } from "./useCreateJob";
import { DEFAULT_FILTER_VALUES } from "@constants/source";
import { StyledCehckboxRow } from "./job.styles";
import { formatSelectOptions } from "@utils/helper";
import { Container } from "@components/container/Container";
import FormHeader from "@components/header/FormHeader";
import { useUpdateJob } from "./useUpdateJob";
import SpinnerMini from "@components/spinner/SpinnerMini";
import { Grid } from "@components/grid/Grid";
import { Column } from "@components/column";
import ButtonGroup from "@components/button-group/ButtonGroup";
interface FormValues {
  name: string;
  emailTemplateId: string;
  emailAccountId: string;
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
  const isUpdateSession = Boolean(jobToEdit);
  const { updateJob } = useUpdateJob();
  const { startJob, isStarting } = useCreateJob();

  // const [isReportAttachment, setIsReportAttachment] = useState(false);

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

  function handleCreateTemplateSubmit(values: FormValues) {
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
      <Form onSubmit={handleSubmit(handleCreateTemplateSubmit)} type="aside_mini">
        <FormHeader heading="Create New Job" style={{ paddingBottom: "1rem" }} />
        <Column content="space-between" style={{ height: "80vh" }}>
          <div>
            <FormRowVertical label="Job Name" error={errors.name?.message}>
              <Input
                bgc="true"
                placeholder="Type here"
                {...register("name", { required: "Name can not be empty." })}
              />
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
                  rules={{ required: "Select a template." }}
                  name="emailTemplateId"
                  control={control}
                  options={formatedOptions || []}
                  onDropdownOpen={fetchTemplates}
                />
              </StyledCehckboxRow>
            </FormRowVertical>
            <FormRowVertical label="" error={errors.emailAccountId?.message}>
              <StyledCehckboxRow>
                <Checkbox
                  id="emailAccountId"
                  checked={!!watchValue.emailAccountId}
                  disabled={false}
                >
                  Email Account
                </Checkbox>
                <SingleSelect
                  rules={{ required: "Select an account." }}
                  name="emailAccountId"
                  control={control}
                  options={formatedEmailAccount || []}
                  onDropdownOpen={fetchEmailAccounts}
                />
              </StyledCehckboxRow>
            </FormRowVertical>
          </div>
          <ButtonGroup gap="sm" content="flex-end">
            <Button variation="outline" size="medium" onClick={onCloseModal}>
              Cancel
            </Button>
            <Button variation="primary" size="medium">
              {isStarting ? <SpinnerMini /> : " Start Job"}
            </Button>
          </ButtonGroup>
        </Column>
      </Form>
    </Container>
  );
};
