import { CreateEmailAccountPayload, EmailType, ImapPort, SecurityProtocol, SmtpPort } from "@apis/email-account";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import Form from "@components/form/Form";
import { Row } from "@components/row";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import FormRowVertical from "@components/form/FormRowVertical";
import Input from "@components/form/Input";
import { SingleSelect } from "@components/select";
import Button from "@components/button/Button";
import { useUpdateEmailAccount } from "./useUpdateEmailAccount";
import { HiMiniChevronDown, HiMiniChevronUp } from "react-icons/hi2";
import { useCreateEmailAccount } from "./useCreateEmailAccount";


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
    label: "Standard",
    value: 1,
  },
  {
    label: "PEC",
    value: 2,
  },
  {
    label: "REM",
    value: 3,
  },
];
const SECURITY_PROTOCOL = [
  {
    label: "SSL",
    value: 1,
  },
  {
    label: "TLS",
    value: 2,
  },
];
const PORTS = [
  {
    label: "SMTP",
    value: 465,
  },
  {
    label: "IMAP",
    value: 993,
  },
];

const StyledShowAdvance = styled.div`
  width: fit-content;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem 0rem;
  cursor: pointer;
`
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
        imapPort?: ImapPort.ZERO
    };
    onCloseModal?:()=> void;
}
const CreateMailServerForm = ({formData = {}, onCloseModal}: CreateMailServerFormProps) => {
    
  const [showAdvanceOptions, setShowAdvanceOptions] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const {updateEmailAccount, isUpdating} = useUpdateEmailAccount();

    const {id, ...otherProps} = formData;
    
    const accountId = uuidv4();

    const isUpdateSession = Boolean(id)

    const {createEmailAccount, isCreating} = useCreateEmailAccount();

    const {control, formState: {errors}, reset, register, handleSubmit} = useForm<CreateEmailAccountPayload>({
        defaultValues: isUpdateSession ? formData : {}
    });
    
  const isLoading = isCreating || isUpdating;
  function clearFields(){
    reset();
    localStorage.removeItem("EmailAccountValues")
  }
  function createEmailFormHandler(formValues: CreateEmailAccountPayload){
    if(isUpdateSession && id){
        updateEmailAccount({id, data: formValues}, {
          onSuccess: ()=> {
            onCloseModal?.()
          }
        })
    }else{
      console.log("formValues in createMailServer", formValues);

        createEmailAccount({...formValues,id: accountId, type: Number(formValues.type), 
            smtpPort: Number(formValues.smtpPort), 
            securityProtocol: Number(formValues.securityProtocol),
            imapPort: Number(formValues.imapPort)
          }, 
          {
            onSuccess: ()=> {
            reset(),
            localStorage.removeItem('EmailAccountValues');
          },
          onError: () => {
            localStorage.setItem('EmailAccountValues', JSON.stringify(formValues)); // Save form values on error
          },
        }
      )
    }
  }
  
  useEffect(() => {
    const storedValues = localStorage.getItem('EmailAccountValues');
    if (storedValues) {
      reset(JSON.parse(storedValues));
    }
    return ()=> localStorage.removeItem("EmailAccountValues")
  }, [reset]);

  return (
    <StyledContainer>
    <Form type="regular" onSubmit={handleSubmit(createEmailFormHandler)}>
        <Row type="horizontal">
          <span>&larr; Create New Mail Server</span>
          <span>Basilinq Logo</span>
        </Row>
        <StyledBoxContainer style={{padding: '1rem 0rem'}}>
          <FormRowVertical label="Type" error={errors.type?.message}>
            <SingleSelect rules={{required:"Type is required"}} name="type" control={control} options={options} />
          </FormRowVertical>
          <FormRowVertical label="Email" error={errors.email?.message}>
            <Input type="email" placeholder="type Email" {...register('email',{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            }
            )} />
          </FormRowVertical>
          <FormRowVertical label="Display Name" error={errors.displayName?.message}>
            <Input type="text" placeholder="type Name" {...register('displayName', { required: "Display Name is required" })}/>
          </FormRowVertical>
          <FormRowVertical label="Password" error={errors.password?.message}>
            <Input placeholder="Type here"type="password" {...register("password",{ required: "Password is required" })}/>
          </FormRowVertical>
        </StyledBoxContainer>
        <hr style={{ border: "none", height: "1px", backgroundColor: "#E5E5E5" }} />
        <div style={{padding: '1rem 0rem'}}>
        <h4>Server SMTP</h4>
        <StyledSMTPServer>
          <FormRowVertical label="SMTP Address" error={errors.smtpAddress?.message}>
            <Input type="text" placeholder="Type here" {...register("smtpAddress", { required: "SMTP Address is required" })}/>
          </FormRowVertical>
          <FormRowVertical label="SMTP Port" error={errors.smtpPort?.message}>
          <SingleSelect rules={{required:"SMTP port is required"}} name="smtpPort" control={control} options={PORTS} />
          </FormRowVertical>
          <FormRowVertical label="Security Protocol" error={errors.securityProtocol?.message}>
            <SingleSelect rules={{required:"Security protocol is required"}} name="securityProtocol" control={control} options={SECURITY_PROTOCOL} />
          </FormRowVertical>
        </StyledSMTPServer>
        </div>
        <hr style={{ border: "none", height: "1px", backgroundColor: "#E5E5E5" }} />
        
        <StyledShowAdvance onClick={()=> setShowAdvanceOptions((prev)=> !prev)}>
        <p>Show Advance Options</p>
        {showAdvanceOptions ? <HiMiniChevronUp size={20}/> : <HiMiniChevronDown size={20}/>}
        </StyledShowAdvance>
      {showAdvanceOptions && (
        <div style={{padding: '1rem 0rem'}}>
        <h4>Server IMAP</h4>
        <StyledIMAPServer>
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
            <SingleSelect name="imapPort" control={control} options={PORTS} />
          </FormRowVertical>
        </StyledIMAPServer>
        </div>
      )}
        <GroupButton>
          <Button type="button" variation="outlinePrimaryEdit" size="medium" onClick={onCloseModal}>
            Cancel
          </Button>
          <Button variation="primary" size="medium">
            {isUpdateSession ? "Update": "Save"} 
          </Button>
        </GroupButton>
        </Form>
      </StyledContainer>
  )
}

export default CreateMailServerForm