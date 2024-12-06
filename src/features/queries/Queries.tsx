import { useEffect, useRef, useState } from "react";
import { StyledContainer, StyledQueries, StyledTextContainer } from "./query.styles";
import QueryDataPreview from "./QueryDataPreview";
import QueryTable from "./QueryTable";
import { useQueryData } from "./useQueryData";
import { usequeryData } from "@context/QueryContext";
import CreateQueryForm from "./CreateQueryForm";
import { useSourceLists } from "@features/sources/useSourceLists";
import { useSourceData } from "@context/SourceContext";

 const formattedValues = {
    page: -1,
    pazesize: -1
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

  const { sourceLists } = useSourceLists(); 
  const {queryLists } = useQueryData();
  const {queryData} = usequeryData();
  const [editingEmailAccount, setEditingEmailAccount] = useState<updateQueryDataProps['formData'] | null>(null);

  const {sourceData} = useSourceData()

  // const {sourceData} = useSourceData();

  console.log("sourceData", sourceData);

  const formSectionRef = useRef<HTMLDivElement>(null);

  const handleCloseForm = () => {
    setEditingEmailAccount(null);
  };
  
  const handleEditClick = (accountData: any) => {
    setEditingEmailAccount(accountData); 
  };

useEffect(()=>{
  if(editingEmailAccount && formSectionRef.current){
    formSectionRef.current.scrollIntoView({ behavior: "smooth" });
  }
},[editingEmailAccount])

  useEffect(()=>{
    queryLists(formattedValues);
  },[])
  useEffect(()=>{
    sourceLists(formattedValues);
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
            <QueryDataPreview />
        </StyledTextContainer>
      </StyledContainer>
      <StyledContainer>
        <QueryTable status={queryData?.isLoading} onEdit={handleEditClick}/>
      </StyledContainer>
    </StyledQueries>
  );
};
