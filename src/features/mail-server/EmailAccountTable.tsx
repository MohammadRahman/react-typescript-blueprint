import Input from "@components/form/Input"
import { Table } from "@components/table"
import { HiArrowDown } from "react-icons/hi2"
import { MdOutlineFilterList } from "react-icons/md"
import { useEmailAccount } from "./useEmailAccount"
import { ChangeEvent, useEffect, useState } from "react"
import { useEmailData } from "@context/EmailAccountContext"
import { Pagination } from "@components/pagination"
import { MailServerRow } from "./MailServerRow"
import toast from "react-hot-toast"
import { CreateMailServerFormProps } from "./CreateMailServerForm"
import { useSearchParams } from "react-router-dom"
import styled from "styled-components"


type FilterValues = {
    type: string;
    email: string;
    displayName: string;
    imapEmail: string
  }
  
  const initialValues = {
    type: "",
    email : "",
    displayName: "",
    imapEmail: ""
  }

  const PAGE_SIZE = 5;


type EmailAccountTableProps = {
  onEdit:(data: CreateMailServerFormProps['formData'])=> void
}

const StyledTableHeader = styled.div`
  margin: 0 auto;
`
const EmailAccountTable = ({onEdit}: EmailAccountTableProps) => {

    const {emailLists, isLoading} = useEmailAccount();

    const [filterValue, setFilterValue] = useState<FilterValues>(initialValues)
    
    const { emailData } = useEmailData();
    const [searchParams, setSearchParams] = useSearchParams();
    
    const currentPage = !searchParams.get("page")
      ? 1
      : Number(searchParams.get("page"));
  
    const startIdx = (currentPage - 1) * PAGE_SIZE;
    const endIdx = startIdx + PAGE_SIZE;

    const isSingleSearch = filterValue.email || filterValue.displayName || filterValue.imapEmail
    

    

    useEffect(() => {
      if (isSingleSearch) {
        setSearchParams({ page: '1' }); 
      }
      if (!searchParams.get("page")) {
        setSearchParams({ page: '1' });
      }
    }, [filterValue, searchParams]);
    const paginatedData = emailData?.list.slice(startIdx, endIdx);
    


  
function handleTypeSortsAndFilter() {

    const filterKey = 
      filterValue.type ? "type" :
      filterValue.email ? "email" :
      filterValue.displayName ? "displayName" :
      filterValue.imapEmail ? "imapEmail" :
      null;
  
    const filterValueToUse =
      filterValue.type ||
      filterValue.email ||
      filterValue.displayName ||
      filterValue.imapEmail;
  
    if (!filterKey || !filterValueToUse) {
      toast.error("no filter vlue provided.")
      return;
    }

    const formattedValues = {
      currentPage: 0,
      pageSize: 10,
      logicalOperator: 1,
      filters: [
        {
          propertyName: filterKey,
          sign: 0,
          value: filterValueToUse,
        },
      ],
      orders: [
        {
          propertyName: filterKey,
          isDescending: true,
        },
      ],
    };
    
   try {
    emailLists(formattedValues); 
    setFilterValue(initialValues);
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.log("Request aborted:", error.message);
    } else {
      console.error("Error in handleTypeSortsAndFilter:", error);
      toast.error("Failed to fetch email lists.");
    }
  }
  }

function onTypeChange(e: ChangeEvent<HTMLInputElement>){
  setFilterValue({
    type: e.target.value,
    displayName: "",
    email: "",
    imapEmail:""
  })
}
function onDisplayChange(e: ChangeEvent<HTMLInputElement>){
  setFilterValue({
    type: "",
    displayName: e.target.value,
    email: "",
    imapEmail:""
  })
}
function onEmailChange(e: ChangeEvent<HTMLInputElement>){
  setFilterValue({
    type: "",
    displayName: "",
    email: e.target.value,
    imapEmail:""
  })
}
function onIMAPEmailChange(e: ChangeEvent<HTMLInputElement>){
  setFilterValue({
    type: "",
    displayName: "",
    email: "",
    imapEmail:e.target.value
  })
}


  return (
    <Table columns="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr">
    <Table.Header>
      <StyledTableHeader>ID</StyledTableHeader>
      <StyledTableHeader>
        Type <HiArrowDown style={{cursor: 'pointer'}}/>
      </StyledTableHeader>
      <StyledTableHeader>SMTP port</StyledTableHeader>
      <StyledTableHeader>
        Name <HiArrowDown style={{cursor: 'pointer'}}/>
      </StyledTableHeader>
     
      <StyledTableHeader>S. Protocol</StyledTableHeader>

      <StyledTableHeader>
        Email <HiArrowDown style={{cursor: 'pointer'}}/>
      </StyledTableHeader>
      <StyledTableHeader>IMAP address</StyledTableHeader>
      <StyledTableHeader>IMAP Port</StyledTableHeader>
      <StyledTableHeader>
        IMAP Email <HiArrowDown />
      </StyledTableHeader>
      <StyledTableHeader>Actions</StyledTableHeader>
    </Table.Header>
    <Table.Header>
      <div></div>
      <div style={{display: 'flex',alignItems: 'center', cursor: 'pointer'}}>
        <Input
        name="type" 
        onChange={onTypeChange} 
        style={{width: '80px', overflow: 'hidden', overflowY: 'scroll', padding: '7px'}} placeholder="Type"
        /> 
        <MdOutlineFilterList size={20} onClick={handleTypeSortsAndFilter}/>
      </div>
      <div></div>
      <div style={{display: 'flex', alignItems: 'center',cursor: 'pointer'}}>
        <Input name="displayName" style={{width: '80px', overflow: 'hidden', overflowY: 'scroll', padding: '7px'}}
         placeholder="Name"
        onChange={onDisplayChange}
        /> 
        <MdOutlineFilterList size={20} onClick={handleTypeSortsAndFilter}/>
        </div>
      <div></div>
     
        <div style={{display: 'flex', alignItems: 'center',cursor: 'pointer'}}>
        <Input name="email" style={{width: '80px', overflow: 'hidden', overflowY: 'scroll', padding: '7px'}} placeholder="Email"
        onChange={onEmailChange}
        /> 
        <MdOutlineFilterList size={20} onClick={handleTypeSortsAndFilter}/>
      </div>
      
      <div></div>
      <div></div>
      <div>
      <Input name="imapEmail" style={{width: '80px', overflow: 'hidden', overflowY: 'scroll', padding: '7px'}} placeholder="IMAP email"
      onChange={onIMAPEmailChange}
      />
      <MdOutlineFilterList size={20} onClick={handleTypeSortsAndFilter}/>
      </div>
      <div></div>
    </Table.Header>
    <Table.Body
      data={paginatedData || []}
      isLoading={isLoading}
      render={(el: any) => <MailServerRow key={el.id} rowData={el} onEdit={onEdit} />}
    />
    <Table.Footer>
        <Pagination count={emailData?.list?.length || 0}/>
    </Table.Footer>
  </Table>
  )
}

export default EmailAccountTable