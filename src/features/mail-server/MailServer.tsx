import CreateMailServerForm, { CreateMailServerFormProps } from "./CreateMailServerForm";
import { useEmailData } from "@context/EmailAccountContext";
import { useEffect, useRef, useState } from "react";
import EmailAccountTable from "./EmailAccountTable";
import { useEmailAccount } from "./useEmailAccount";
import { DEFAULT_FILTER_VALUES } from "@constants/source";
import { Column } from "@components/column";
import { Container } from "@components/container";

export const MailServer = () => {
  const { emailData } = useEmailData();
  const { emailLists } = useEmailAccount();

  const [editingEmailAccount, setEditingEmailAccount] = useState<
    CreateMailServerFormProps["formData"] | null
  >(null);
  const tableSectionRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);

  const handleEditClick = (accountData: CreateMailServerFormProps["formData"]) => {
    setEditingEmailAccount(accountData);
  };

  const handleCloseForm = () => {
    setEditingEmailAccount(null);
  };

  useEffect(() => {
    if (emailData && tableSectionRef.current) {
      tableSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (editingEmailAccount && formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [emailData, editingEmailAccount]);

  useEffect(() => {
    emailLists(DEFAULT_FILTER_VALUES);
  }, []);

  return (
    <Column gap="lg">
      <Container ref={formSectionRef} border="sm" border_radius="md" overflow="hidden">
        {editingEmailAccount && (
          <CreateMailServerForm formData={editingEmailAccount} onCloseModal={handleCloseForm} />
        )}
        {!editingEmailAccount && <CreateMailServerForm />}
      </Container>
      <Container
        ref={tableSectionRef}
        bgc="white"
        padding="md"
        border="sm"
        border_radius="md"
        overflow="hidden"
      >
        <EmailAccountTable status={emailData?.isLoading} onEdit={handleEditClick} />
      </Container>
    </Column>
  );
};
