import { useEffect, useRef, useState } from "react";
import SourceTable from "./SourceTable";
import { useSource } from "./useSourceLists";
import TestConnection from "./TestConnection";
import { DEFAULT_FILTER_VALUES } from "@constants/source";
import { StyledContainer } from "./source.styles";
import CreateSourceForm, { CreateSourceFormProps } from "./CreateSourceForm";
import { useConnectionStr } from "@context/ConnectionStringContext";
import { Row } from "@components/row";
import FormHeader from "@components/header/FormHeader";

export const Sources = () => {
  const [editingSourceAccount, seteditingSourceAccount] = useState<
    CreateSourceFormProps["formData"] | null
  >(null);

  const { connectionStr } = useConnectionStr();

  const tableSectionRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);

  const { sourceLists, isLoading, errorState } = useSource();

  const handleEditClick = (accountData: CreateSourceFormProps["formData"]) => {
    seteditingSourceAccount(accountData);
  };

  const handleCloseForm = () => {
    seteditingSourceAccount(null);
  };

  useEffect(() => {
    if (editingSourceAccount && formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [editingSourceAccount]);

  // Fetching the list on mount
  useEffect(() => {
    sourceLists(DEFAULT_FILTER_VALUES);
  }, []);

  // const { sourceData } = useSourceData();
  return (
    <Row type="vertical" gap="xl">
      <StyledContainer ref={formSectionRef}>
        <FormHeader heading="New Database Connection" />
        {editingSourceAccount && (
          <CreateSourceForm formData={editingSourceAccount} onCloseModal={handleCloseForm} />
        )}
        {!editingSourceAccount && <CreateSourceForm />}
        <TestConnection connectionString={connectionStr} />
      </StyledContainer>

      <StyledContainer ref={tableSectionRef}>
        <SourceTable isLoading={isLoading || errorState.isLoading} onEdit={handleEditClick} />
      </StyledContainer>
    </Row>
  );
};
