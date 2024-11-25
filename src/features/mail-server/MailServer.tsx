import styled from "styled-components";
import CreateMailServerForm, { CreateMailServerFormProps } from "./CreateMailServerForm";
import { useEmailData } from "@context/EmailAccountContext";
import { useEffect, useRef, useState } from "react";
import EmailAccountTable from "./EmailAccountTable";
import { useEmailAccount } from "./useEmailAccount";

const StyledMailServer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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

const formattedValues = {
  currentPage: 0,
  pageSize: 20,
  logicalOperator: 1,
  filters: [
    {
      propertyName: "type",
      sign: 0, // Assuming `sign` means "equals"
      value: "1",
    },
  ],
  orders: [
    {
      propertyName: "email",
      isDescending: true,
    },
  ],
};

export const MailServer = () => {

  const { emailData } = useEmailData();

  const {emailLists} = useEmailAccount();

  const [editingEmailAccount, setEditingEmailAccount] = useState<CreateMailServerFormProps['formData'] | null>(null);
  const tableSectionRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  
  const handleEditClick = (accountData: CreateMailServerFormProps['formData']) => {
    setEditingEmailAccount(accountData); // Set the data to edit
  };
  
  const handleCloseForm = () => {
    setEditingEmailAccount(null);
  };

  useEffect(() => {
    if (emailData && tableSectionRef.current) {
      tableSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if(editingEmailAccount && formSectionRef.current){
      formSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [emailData, editingEmailAccount]);
  
  useEffect(()=> {
    emailLists(formattedValues)
  },[])

if(emailData?.isLoading) return <h1>Loading...</h1>

return (
    <StyledMailServer>
      <StyledContainer ref={formSectionRef}>
          {editingEmailAccount 
          && <CreateMailServerForm 
          formData={editingEmailAccount} 
          onCloseModal={handleCloseForm} 
          />}
          {!editingEmailAccount && <CreateMailServerForm />}
      </StyledContainer>
      <StyledContainer ref={tableSectionRef}>
          <EmailAccountTable onEdit={handleEditClick}/>
      </StyledContainer>
    </StyledMailServer>
  );
};
