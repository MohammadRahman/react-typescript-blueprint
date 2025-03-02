import { useEffect, useRef, useState } from "react";
import { StyledContainer, StyledQueries, StyledTextContainer } from "./query.styles";
import QueryDataPreview from "./QueryDataPreview";
import QueryTable from "./QueryTable";
import { useQueryData } from "./useQueryData";
import { usequeryData } from "@context/QueryContext";
import CreateQueryForm from "./CreateQueryForm";
import FormHeader from "@components/header/FormHeader";
import { DEFAULT_FILTER_VALUES } from "@constants/source";

export type updateQueryDataProps = {
  formData?: {
    id?: string;
    name?: string;
    body?: string;
    sourceId?: string;
    version?: number;
  };
  onCloseModal?: () => void;
};
export const Queries = () => {
  const { queryLists, errorState } = useQueryData();
  const { queryData } = usequeryData();
  const [editingEmailAccount, setEditingEmailAccount] = useState<
    updateQueryDataProps["formData"] | null
  >(null);

  const formSectionRef = useRef<HTMLDivElement>(null);

  const handleCloseForm = () => {
    setEditingEmailAccount(null);
  };

  const handleEditClick = (accountData: any) => {
    setEditingEmailAccount(accountData);
  };

  useEffect(() => {
    if (editingEmailAccount && formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [editingEmailAccount]);

  useEffect(() => {
    queryLists(DEFAULT_FILTER_VALUES);
  }, []);

  return (
    <StyledQueries>
      <StyledContainer ref={formSectionRef}>
        <FormHeader heading=" New Query" />
        <StyledContainer ref={formSectionRef}>
          {editingEmailAccount && (
            <CreateQueryForm formData={editingEmailAccount} onCloseModal={handleCloseForm} />
          )}
          {!editingEmailAccount && <CreateQueryForm />}
        </StyledContainer>
        <StyledTextContainer>
          <QueryDataPreview />
        </StyledTextContainer>
      </StyledContainer>
      <StyledContainer>
        <QueryTable
          status={queryData?.isLoading || errorState.isLoading}
          onEdit={handleEditClick}
        />
      </StyledContainer>
    </StyledQueries>
  );
};
