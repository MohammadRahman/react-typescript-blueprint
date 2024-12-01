import { useEffect, useRef, useState } from "react";
import { StyledContainer, StyledQueries, StyledTextContainer } from "./query.styles";
import QueryDataPreview from "./QueryDataPreview";
import QueryTable from "./QueryTable";
import { useQueryData } from "./useQueryData";
import { usequeryData } from "@context/QueryContext";
import CreateQueryForm from "./CreateQueryForm";

 const formattedValues = {
    currentPage: 0,
    pageSize: 20,
    logicalOperator: 1,
    filters: [
      {
        propertyName: "name",
        sign: 0, // Assuming `sign` means "equals"
        value: "Query 1",
      },
    ],
    orders: [
      {
        propertyName: "name",
        isDescending: true,
      },
    ],
  };
  export type updateQueryDataProps = {
    formData?: {
        id?: string;
        name?: string;
        body?:string;
        sourceId?:string;
        version?: number;

    };
    onCloseModal?:()=> void;
}
export const Queries = () => {

  const {queryLists } = useQueryData();
  const {queryData} = usequeryData();
  const [editingEmailAccount, setEditingEmailAccount] = useState<updateQueryDataProps['formData'] | null>(null);

  const formSectionRef = useRef<HTMLDivElement>(null);

  const handleCloseForm = () => {
    setEditingEmailAccount(null);
  };
  
  const handleEditClick = (accountData: any) => {
    console.log("accountdAta",accountData);
    setEditingEmailAccount(accountData); // Set the data to edit
  };

useEffect(()=>{
  if(editingEmailAccount && formSectionRef.current){
    formSectionRef.current.scrollIntoView({ behavior: "smooth" });
  }
},[editingEmailAccount])

  useEffect(()=>{
    queryLists(formattedValues);
  },[])

  return (
    <StyledQueries>
      <StyledContainer ref={formSectionRef}>
        <span>&larr; New Query</span>
        <StyledContainer ref={formSectionRef}>
          {editingEmailAccount 
          && <CreateQueryForm 
          formData={editingEmailAccount} 
          onCloseModal={handleCloseForm} 
          />}
          {!editingEmailAccount && <CreateQueryForm />}
      </StyledContainer>
        <StyledTextContainer>
            <QueryDataPreview data={editingEmailAccount?.body || ""}/>
        </StyledTextContainer>
      </StyledContainer>
      <StyledContainer>
        <QueryTable status={queryData?.isLoading} onEdit={handleEditClick}/>
      </StyledContainer>
    </StyledQueries>
  );
};
