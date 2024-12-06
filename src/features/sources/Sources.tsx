import { useEffect, useRef, useState } from "react";
import SourceTable from "./SourceTable";
import { useSourceLists } from "./useSourceLists";
import TestConnection from "./TestConnection";
import {  DEFAULT_SOURCE_FILTER } from "@constants/source";
import { StyledContainer, StyledSource } from "./source.styles";
import CreateSourceForm, { CreateSourceFormProps } from "./CreateSourceForm";
import { useConnectionStr, useSourceType } from "@context/ConnectionStringContext";
import ReactTable from "@components/table/ReactTable";
import { COLUMNS } from "@constants/table";
import MOCK_DATA from '@constants/MOCK_DATA.json';
import ResizableTable from "@components/table/ResponsiveTable";
import { ColumnDef } from "@tanstack/react-table";
import ActionButtons from "@components/action-button/ActionButtons";

type SourceFieldProps = {
  name: string | "";
  type: number | undefined;
  databaseName: string | "";
  host: string | "";
  port: number | undefined;
  username: string | "";
  password: string | "";
  file?: File;
};

export const Sources = () => {
  
  const [editingSourceAccount, seteditingSourceAccount] = useState<CreateSourceFormProps["formData"] | null>(null);

  const {connectionStr} = useConnectionStr()

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

    if(editingSourceAccount && formSectionRef.current){
      formSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [editingSourceAccount]);

   // Fetching the list on mount
   useEffect(() => {
      sourceLists(DEFAULT_SOURCE_FILTER)
  }, []);
  return (
    <StyledSource>
      <StyledContainer ref={formSectionRef}>
        <span>&larr; New Database Connection</span>
        {editingSourceAccount && (
          <CreateSourceForm 
          formData={editingSourceAccount} 
          onCloseModal={handleCloseForm}
        />)}
        {!editingSourceAccount && (
          <CreateSourceForm />)}
      <TestConnection connectionString={connectionStr}/>
      </StyledContainer>
        
      <StyledContainer ref={tableSectionRef}>
          <SourceTable isLoading={isLoading} onEdit={handleEditClick}/>
      </StyledContainer>
      <StyledContainer>
      </StyledContainer>
    </StyledSource>
  );
};
