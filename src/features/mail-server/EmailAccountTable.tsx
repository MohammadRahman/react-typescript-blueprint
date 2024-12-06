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
import ResizableTable from "@components/table/ResponsiveTable"
import ActionButtons from "@components/action-button/ActionButtons"
import { ColumnDef } from "@tanstack/react-table"
import { useDelete } from "./useDelete"


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
  onEdit:(data: CreateMailServerFormProps['formData'])=> void;
  status: boolean | undefined;
}

const StyledTableHeader = styled.div`
  margin: 0 auto;
`
const EmailAccountTable = ({onEdit, status}: EmailAccountTableProps) => {

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
    

    const {deleteAccount} = useDelete();

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

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "formatedId", // Matches the "id" field in the payload
    header: "ID",
    size: 150,
  },
  {
    accessorKey: "type", // Matches the "type" field in the payload
    header: "Type",
    accessorFn: (row) =>
      row.type === 1 ? "Standard" : row.type === 2 ? "PEC" : "REM", // Map `1` to `Primary`, other values to `Secondary`
    size: 100,
  },
  {
    accessorKey: "email", // Matches the "email" field in the payload
    header: "Email",
    size: 200,
  },
  {
    accessorKey: "displayName", // Matches the "displayName" field
    header: "Name",
    size: 150,
  },
  {
    accessorKey: "smtpAddress", // Matches the "smtpAddress" field
    header: "SMTP A.",
    size: 150,
  },
  {
    accessorKey: "smtpPort", // Matches the "smtpPort" field
    header: "SMTP p.",
    size: 150,
  },
  {
    accessorKey: "securityProtocol", // Matches the "securityProtocol" field
    header: "Protocl",
    accessorFn: (row) =>
      row.securityProtocol === 1 ? "TLS" : "SSL", // Map `1` to `TLS`, other values to `Unknown`
    size: 150,
  },
  {
    accessorKey: "imapAddress", // Matches the "imapAddress" field
    header: "IMAP A.",
    size: 150,
  },
  {
    accessorKey: "imapEmail", // Matches the "imapEmail" field
    header: "IMAP Email",
    size: 200,
  },
  {
    accessorKey: "imapPort", // Matches the "imapPort" field
    header: "IMAP P",
    size: 150,
  },
    // Hidden fields in table but available for edit functionality
    {
      accessorKey: "password",
      header: "",
      size: 0,
      cell: ()=> null
    },
    {
      accessorKey: "imapPassword",
      header: "",
      size: 0,
      cell: ()=> null
    },
  {
    id: "actions", // Custom column for actions
    header: "Action",
    cell: ({ row }) => (
      <ActionButtons
        onEdit={(values) => onEdit(values)} 
        isLoading={false}
        data={row.original}
        deleteAccount={() => deleteAccount(row.original.id)}
      />
    ),
    size: 200,
  },
];


const tableData = (emailData?.list || []).map((item) => ({
  id: item.id,
  formatedId: item.id.split("-")[0],
  type: item.type,
  email:  item.email,
  displayName:  item.displayName,
  smtpAddress: item.smtpAddress,
  smtpPort:  item.smtpPort,
  securityProtocol: item.securityProtocol,
  imapAddress: item.imapAddress,
  imapEmail: item.imapEmail,
  imapPort: item.imapPort,
  password: item.password,
  imapPassword:item.imapPassword
}));

  return(
    <ResizableTable searchProperty={["email", "displayName", "imapEmail"]} isLoading={status} columns={columns} data={tableData}/>
  )

  // return (
  //   <Table columns="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr">
  //   <Table.Header>
  //     <StyledTableHeader>ID</StyledTableHeader>
  //     <StyledTableHeader>
  //       Type <HiArrowDown style={{cursor: 'pointer'}}/>
  //     </StyledTableHeader>
  //     <StyledTableHeader>SMTP port</StyledTableHeader>
  //     <StyledTableHeader>
  //       Name <HiArrowDown style={{cursor: 'pointer'}}/>
  //     </StyledTableHeader>
     
  //     <StyledTableHeader>S. Protocol</StyledTableHeader>

  //     <StyledTableHeader>
  //       Email <HiArrowDown style={{cursor: 'pointer'}}/>
  //     </StyledTableHeader>
  //     <StyledTableHeader>IMAP address</StyledTableHeader>
  //     <StyledTableHeader>IMAP Port</StyledTableHeader>
  //     <StyledTableHeader>
  //       IMAP Email <HiArrowDown />
  //     </StyledTableHeader>
  //     <StyledTableHeader>Actions</StyledTableHeader>
  //   </Table.Header>
  //   <Table.Header>
  //     <div></div>
  //     <div style={{display: 'flex',alignItems: 'center', cursor: 'pointer'}}>
  //       <Input
  //       name="type" 
  //       onChange={onTypeChange} 
  //       style={{width: '80px', overflow: 'hidden', overflowY: 'scroll', padding: '7px'}} placeholder="Type"
  //       /> 
  //       <MdOutlineFilterList size={20} onClick={handleTypeSortsAndFilter}/>
  //     </div>
  //     <div></div>
  //     <div style={{display: 'flex', alignItems: 'center',cursor: 'pointer'}}>
  //       <Input name="displayName" style={{width: '80px', overflow: 'hidden', overflowY: 'scroll', padding: '7px'}}
  //        placeholder="Name"
  //       onChange={onDisplayChange}
  //       /> 
  //       <MdOutlineFilterList size={20} onClick={handleTypeSortsAndFilter}/>
  //       </div>
  //     <div></div>
     
  //       <div style={{display: 'flex', alignItems: 'center',cursor: 'pointer'}}>
  //       <Input name="email" style={{width: '80px', overflow: 'hidden', overflowY: 'scroll', padding: '7px'}} placeholder="Email"
  //       onChange={onEmailChange}
  //       /> 
  //       <MdOutlineFilterList size={20} onClick={handleTypeSortsAndFilter}/>
  //     </div>
      
  //     <div></div>
  //     <div></div>
  //     <div>
  //     <Input name="imapEmail" style={{width: '80px', overflow: 'hidden', overflowY: 'scroll', padding: '7px'}} placeholder="IMAP email"
  //     onChange={onIMAPEmailChange}
  //     />
  //     <MdOutlineFilterList size={20} onClick={handleTypeSortsAndFilter}/>
  //     </div>
  //     <div></div>
  //   </Table.Header>
  //   <Table.Body
  //     data={paginatedData || []}
  //     isLoading={isLoading}
  //     render={(el: any) => <MailServerRow key={el.id} isLoading={status} rowData={el} onEdit={onEdit} />}
  //   />
  //   <Table.Footer>
  //       <Pagination count={emailData?.list?.length || 0}/>
  //   </Table.Footer>
  // </Table>
  // )
}

export default EmailAccountTable