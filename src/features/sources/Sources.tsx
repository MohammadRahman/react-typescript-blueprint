import { useEffect, useRef, useState } from "react";
import SourceTable from "./SourceTable";
import { useSourceLists } from "./useSourceLists";
import TestConnection from "./TestConnection";
import { DEFAULT_SOURCE_FILTER } from "@constants/source";
import { StyledContainer } from "./source.styles";
import CreateSourceForm, { CreateSourceFormProps } from "./CreateSourceForm";
import { useConnectionStr } from "@context/ConnectionStringContext";
import { HiArrowLongLeft } from "react-icons/hi2";

import { Row } from "@components/row";
import { IconContainer } from "@components/container/IconContainer";

export const Sources = () => {
  const [editingSourceAccount, seteditingSourceAccount] = useState<
    CreateSourceFormProps["formData"] | null
  >(null);

  const { connectionStr } = useConnectionStr();

  const tableSectionRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);

  const { sourceLists, isLoading } = useSourceLists();

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
    sourceLists(DEFAULT_SOURCE_FILTER);
  }, []);

  return (
    <Row type="vertical" gap="xl">
      <StyledContainer ref={formSectionRef}>
        <Row gap="md" justifyContent="flex-start">
          <IconContainer type="round">
            <HiArrowLongLeft />
          </IconContainer>
          <span>New Database Connection</span>
        </Row>

        {editingSourceAccount && (
          <CreateSourceForm formData={editingSourceAccount} onCloseModal={handleCloseForm} />
        )}
        {!editingSourceAccount && <CreateSourceForm />}
        <TestConnection connectionString={connectionStr} />
      </StyledContainer>

      <StyledContainer ref={tableSectionRef}>
        <SourceTable isLoading={isLoading} onEdit={handleEditClick} />
      </StyledContainer>
    </Row>
  );
};
