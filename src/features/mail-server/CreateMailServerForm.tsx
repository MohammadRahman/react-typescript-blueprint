import { useEffect, useState } from "react";
import { useCreateEmailAccount } from "./useCreateEmailAccount";
import Form from "@components/form/Form";
import { useForm } from "react-hook-form";
import FormRowVertical from "@components/form/FormRowVertical";
import Input from "@components/form/Input";
import { SingleSelect } from "@components/select";
import Button from "@components/button/Button";
import { useUpdateEmailAccount } from "./useUpdateEmailAccount";
import Spinner from "@components/spinner/Spinner";
import { HiMiniChevronDown, HiMiniChevronUp } from "react-icons/hi2";
import { mailTypes, ports, securityProtocols } from "@configs/mailServer";
import FormHeader from "@components/header/FormHeader";
import { GroupButton } from "./mailServer.styles";
import { Grid } from "@components/grid/Grid";
import { Container } from "@components/container/Container";
import { Row } from "@components/row";
import {
  CreateEmailAccountPayload,
  EmailType,
  ImapPort,
  SecurityProtocol,
  SmtpPort,
} from "@interface/email";

export type CreateMailServerFormProps = {
  formData?: {
    id?: string;
    type?: EmailType.ONE;
    email?: string;
    displayName?: string;
    password?: string;
    smtpAddress?: string;
    smtpPort?: SmtpPort.ZERO;
    securityProtocol?: SecurityProtocol.ONE;
    imapAddress?: string;
    imapEmail?: string;
    imapPassword?: string;
    imapPort?: ImapPort.ZERO;
  };
  onCloseModal?: () => void;
};
const CreateMailServerForm = ({ formData = {}, onCloseModal }: CreateMailServerFormProps) => {
  const [showAdvanceOptions, setShowAdvanceOptions] = useState(false);
  const { updateEmailAccount, isUpdating } = useUpdateEmailAccount();

  const { id } = formData;

  const isUpdateSession = Boolean(id);

  const { createEmailAccount, isCreating } = useCreateEmailAccount();

  const {
    control,
    formState: { errors },
    reset,
    register,
    handleSubmit,
  } = useForm<CreateEmailAccountPayload>({
    defaultValues: isUpdateSession ? formData : {},
  });

  const isLoading = isCreating || isUpdating;
  function clearFields() {
    reset();
    localStorage.removeItem("EmailAccountValues");
  }
  function createEmailFormHandler(formValues: CreateEmailAccountPayload) {
    if (isUpdateSession && id) {
      updateEmailAccount(
        { id, data: formValues },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
    } else {
      console.log("formValues in createMailServer", formValues);

      createEmailAccount(
        {
          ...formValues,
          type: Number(formValues.type),
          smtpPort: Number(formValues.smtpPort),
          securityProtocol: Number(formValues.securityProtocol),
          imapPort: Number(formValues.imapPort),
        },
        {
          onSuccess: () => {
            reset(), localStorage.removeItem("EmailAccountValues");
          },
          onError: () => {
            localStorage.setItem("EmailAccountValues", JSON.stringify(formValues)); // Save form values on error
          },
        }
      );
    }
  }

  useEffect(() => {
    const storedValues = localStorage.getItem("EmailAccountValues");
    if (storedValues) {
      reset(JSON.parse(storedValues));
    }
    return () => localStorage.removeItem("EmailAccountValues");
  }, [reset]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Form type="regular" onSubmit={handleSubmit(createEmailFormHandler)}>
        <FormHeader logo={true} heading="Create New Mail Server" />
        <Row type="vertical" gap="lg">
          <Grid columns={4} gap="md">
            <FormRowVertical label="Type" error={errors.type?.message}>
              <SingleSelect
                rules={{ required: "Type is required" }}
                name="type"
                control={control}
                options={mailTypes}
              />
            </FormRowVertical>
            <FormRowVertical label="Email" error={errors.email?.message}>
              <Input
                type="email"
                placeholder="type Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
              />
            </FormRowVertical>
            <FormRowVertical label="Display Name" error={errors.displayName?.message}>
              <Input
                type="text"
                placeholder="type Name"
                {...register("displayName", { required: "Display Name is required" })}
              />
            </FormRowVertical>
            <FormRowVertical label="Password" error={errors.password?.message}>
              <Input
                placeholder="Type here"
                type="password"
                {...register("password", { required: "Password is required" })}
              />
            </FormRowVertical>
          </Grid>
          <hr style={{ border: "none", height: "1px", backgroundColor: "#E5E5E5" }} />
          <Container>
            <h4>Server SMTP</h4>
            <Grid columns={3} gap="md">
              <FormRowVertical label="SMTP Address" error={errors.smtpAddress?.message}>
                <Input
                  type="text"
                  placeholder="Type here"
                  {...register("smtpAddress", { required: "SMTP Address is required" })}
                />
              </FormRowVertical>
              <FormRowVertical label="SMTP Port" error={errors.smtpPort?.message}>
                <SingleSelect
                  rules={{ required: "SMTP port is required" }}
                  name="smtpPort"
                  control={control}
                  options={ports}
                />
              </FormRowVertical>
              <FormRowVertical label="Security Protocol" error={errors.securityProtocol?.message}>
                <SingleSelect
                  rules={{ required: "Security protocol is required" }}
                  name="securityProtocol"
                  control={control}
                  options={securityProtocols}
                />
              </FormRowVertical>
            </Grid>
          </Container>
          <hr style={{ border: "none", height: "1px", backgroundColor: "#E5E5E5" }} />

          <Container
            onClick={() => setShowAdvanceOptions(prev => !prev)}
            style={{ width: "fit-content", display: "flex" }}
          >
            <p>Show Advance Options</p>
            {showAdvanceOptions ? <HiMiniChevronUp size={20} /> : <HiMiniChevronDown size={20} />}
          </Container>
          {showAdvanceOptions && (
            <Container>
              <h4>Server IMAP</h4>
              <Grid columns={4} gap="md">
                <FormRowVertical label="IMAP Address" error={errors.imapAddress?.message}>
                  <Input type="text" placeholder="Type here" {...register("imapAddress")} />
                </FormRowVertical>
                <FormRowVertical label="IMAP Email" error={errors.imapEmail?.message}>
                  <Input type="text" placeholder="Type here" {...register("imapEmail")} />
                </FormRowVertical>
                <FormRowVertical label="IMAP Password" error={errors.imapPassword?.message}>
                  <Input placeholder="Type here" type="password" {...register("imapPassword")} />
                </FormRowVertical>
                <FormRowVertical label="IMAP Port" error={errors.imapPort?.message}>
                  <SingleSelect name="imapPort" control={control} options={ports} />
                </FormRowVertical>
              </Grid>
            </Container>
          )}
          <GroupButton>
            <Button
              type="button"
              variation="outlinePrimaryEdit"
              size="medium"
              onClick={clearFields}
            >
              Cancel
            </Button>
            <Button variation="primary" size="medium">
              {isUpdateSession ? "Update" : "Save"}
            </Button>
          </GroupButton>
        </Row>
      </Form>
    </>
  );
};

export default CreateMailServerForm;
