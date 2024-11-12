import { CreateEmailAccountPayload, EmailType, ImapPort, SecurityProtocol, SmtpPort } from "@apis/email-account";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";
import { useCreateEmailAccount } from "./useCreateEmailAccount";
import Form from "@components/form/Form";
import { Row } from "@components/row";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import FormRowVertical from "@components/form/FormRowVertical";
import Input from "@components/form/Input";
import { SingleSelect } from "@components/select";
import Button from "@components/button/Button";
import { useUpdateEmailAccount } from "./useUpdateEmailAccount";


const StyledBoxContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 1rem;
`;
const StyledSMTPServer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 1rem;

  &:nth-child(1) {
    margin-bottom: 2rem; /* padding for the first child */
  }

  &:nth-child(2) {
    margin-bottom: 3rem; /* padding for the second child */
  }

`;
const StyledIMAPServer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 1rem;
`;
const GroupButton = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
const StyledContainer = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: white;
  border-radius: 8px;
`;
const options = [
  {
    label: "1",
    value: String(EmailType.ONE),
  },
  {
    label: "2",
    value: String(EmailType.TWO),
  },
];
const SECURITY_PROTOCOL = [
  {
    label: "0",
    value: String(SecurityProtocol.ZERO),
  },
  {
    label: "1",
    value: String(SecurityProtocol.ONE),
  },
];
const SMTP_PORT = [
  {
    label: "0",
    value: String(SmtpPort.ZERO),
  },
  {
    label: "1",
    value: String(SmtpPort.ONE),
  },
];
const IMAP_PORT = [
  {
    label: "0",
    value: String(ImapPort.ZERO),
  },
  {
    label: "1",
    value: String(ImapPort.ONE),
  },
];

type CreateMailServerFormProps = {
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
        imapPort?: ImapPort.ZERO
    };
}
const CreateMailServerForm = ({formData = {}}: CreateMailServerFormProps) => {
    
  const {updateEmailAccount} = useUpdateEmailAccount()
    const {id, ...otherProps} = formData;
    
    const accountId = uuidv4();

    console.log(otherProps);

    const isUpdateSession = Boolean(id)

    const {createEmailAccount, isLoading} = useCreateEmailAccount();

    const {control, formState: {errors}, reset, register, handleSubmit} = useForm<CreateEmailAccountPayload>({
        defaultValues: isUpdateSession ? formData : {}
    });
    
//   const mailServerData = getServerDataMock()
  
  function createEmailFormHandler(formValues: CreateEmailAccountPayload){
    if(isUpdateSession && id){
        updateEmailAccount({id, data: formValues})
    }else{
        createEmailAccount({...formValues,id: accountId, type: Number(formValues.type), 
            smtpPort: Number(formValues.smtpPort), 
            securityProtocol: Number(formValues.securityProtocol),
            imapPort: Number(formValues.imapPort)
          }, {
            onSuccess: ()=> {
            reset(),
            localStorage.removeItem('EmailAccountValues');
          },
          onError: () => {
            localStorage.setItem('EmailAccountValues', JSON.stringify(formValues)); // Save form values on error
          },
        })
    }
  }
  
  useEffect(() => {
    const storedValues = localStorage.getItem('EmailAccountValues');
    if (storedValues) {
      reset(JSON.parse(storedValues));
    }
    return ()=> localStorage.removeItem("EmailAccountValues")
  }, [reset]);

  if(isLoading) return <h1>Loading...</h1>

  return (
    <StyledContainer>
    <Form type="regular" onSubmit={handleSubmit(createEmailFormHandler)}>
        <Row type="horizontal">
          <span>&larr; Create New Mail Server</span>
          <span>Basilinq Logo</span>
        </Row>
        <StyledBoxContainer>
          {/* <FormRowVertical label="ID*" error={errors.id?.message}>
            <Input placeholder="type here" {...register('id')} style={{ padding: "1rem 1.5rem" }} />
          </FormRowVertical> */}
          <FormRowVertical label="Type" error={errors.type?.message}>
            <SingleSelect name="type" control={control} options={options} />
          </FormRowVertical>
          <FormRowVertical label="Email" error={errors.email?.message}>
            <Input placeholder="type Email" {...register('email')} style={{ padding: "1rem 1.5rem" }} />
          </FormRowVertical>
          <FormRowVertical label="Display Name" error={errors.displayName?.message}>
            <Input placeholder="type Name" {...register('displayName')} style={{ padding: "1rem 1.5rem" }} />
          </FormRowVertical>
          <FormRowVertical label="Password" error={errors.password?.message}>
            <Input placeholder="Type here"type="password" {...register("password")}/>
          </FormRowVertical>
        </StyledBoxContainer>
        <hr style={{ border: "none", height: "1px", backgroundColor: "#E5E5E5" }} />
        <h4>Server SMTP</h4>
        <StyledSMTPServer>
          <FormRowVertical label="SMTP Address" error={errors.smtpAddress?.message}>
            <Input placeholder="Type here" {...register("smtpAddress")}/>
          </FormRowVertical>
          <FormRowVertical label="SMTP Port" error={errors.smtpPort?.message}>
          <SingleSelect name="smtpPort" control={control} options={SMTP_PORT} />
          </FormRowVertical>
          <FormRowVertical label="Security Protocol" error={errors.securityProtocol}>
            <SingleSelect name="securityProtocol" control={control} options={SECURITY_PROTOCOL} />
          </FormRowVertical>
        </StyledSMTPServer>
        <hr style={{ border: "none", height: "1px", backgroundColor: "#E5E5E5" }} />
        <h4>Server IMAP</h4>
        <StyledIMAPServer>
          <FormRowVertical label="IMAP Address" error={errors.imapAddress?.message}>
            <Input placeholder="Type here" {...register("imapAddress")} />
          </FormRowVertical>
          <FormRowVertical label="IMAP email" error={errors.imapEmail?.message}>
            <Input placeholder="Type here" {...register("imapEmail")} />
          </FormRowVertical>
          <FormRowVertical label="IMAP Password" error={errors.imapPassword?.message}>
            <Input placeholder="Type here"  type="password" {...register("imapPassword")} />
          </FormRowVertical>
          <FormRowVertical label="IMAP PORt" error={errors.imapPort?.message}>
            <SingleSelect name="imapPort" control={control} options={IMAP_PORT} />
          </FormRowVertical>
        </StyledIMAPServer>
        <GroupButton>
          <Button variation="outlineDanger">Delete</Button>
          <Button variation="outlinePrimaryDetails" size="medium">
            Details
          </Button>
          <Button variation="outlinePrimaryEdit" size="medium">
            Edit
          </Button>
          <Button variation="primary" size="medium">
            Save
          </Button>
        </GroupButton>
        </Form>
      </StyledContainer>
  )
}

export default CreateMailServerForm