import { useEffect, useRef, useState } from "react";
import SourceTable from "./SourceTable";
import { useSourceLists } from "./useSourceLists";
import TestConnection from "./TestConnection";
import {  DEFAULT_SOURCE_FILTER } from "@constants/source";
import { StyledContainer, StyledSource } from "./source.styles";
import CreateSourceForm, { CreateSourceFormProps } from "./CreateSourceForm";

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
  
  const tableSectionRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  
  const { sourceLists } = useSourceLists(); 

  const handleEditClick = (accountData: CreateSourceFormProps["formData"]) => {
    seteditingSourceAccount(accountData); // Set the data to edit
  };

  const handleCloseForm = () => {
    seteditingSourceAccount(null);
  };

  useEffect(() => {

    if(editingSourceAccount && formSectionRef.current){
      formSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [editingSourceAccount]);

  useEffect(() => {
    sourceLists(DEFAULT_SOURCE_FILTER);
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
      <TestConnection />
      </StyledContainer>
        
      <StyledContainer ref={tableSectionRef}>
          <SourceTable onEdit={handleEditClick}/>
      </StyledContainer>
    </StyledSource>
  );
};
