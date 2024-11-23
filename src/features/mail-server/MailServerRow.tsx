import { Modal } from "@components/modal";
import { Table } from "@components/table";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import styled from "styled-components";
import CreateMailServerForm from "./CreateMailServerForm";
import ConfirmDelete from "@components/delete-confirmation/ConfirmDelete";
import ButtonIcon from "@components/button-icons/ButtonIcon";
import { useDelete } from "./useDelete";
import Spinner from "@components/spinner/Spinner";
import { useEffect, useRef } from "react";

interface MailServerRowProps{
  rowData: {
    id: string;
    type: number;
    email: string;
    displayName: string;
    smtpPort: number;
    securityProtocol: number;
    imapAddress: string;
    imapEmail: string;
    imapPort: number;
  },
  onEdit: (data: MailServerRowProps['rowData'])=> void
}
const StyledGroupButton = styled.div`
  margin-left: 2rem;
  display: flex;
  gap: 0.5rem;
`
const ButtonBox = styled(ButtonIcon)`
                width: 32px;
                height: 32px;
                border-radius: 50%;
                align-items: center;
                justify-content: center;
                display: flex;
                &:hover{
                  &:nth-child(1){
                    border: 1px solid var(--color-brand); 
                  cursor: pointer;
                  }
                  &:nth-child(2){
                    border: 1px solid red; 
                  cursor: pointer;
                  }
                  
                }

`
const StyledShortTableRow = styled.div`
    margin: 0 auto;
    overflow-y: scroll;
`
export const MailServerRow = ({ rowData, onEdit }: MailServerRowProps) => {
  
 const {deleteAccount, isLoading } = useDelete()

 function deleteEmailAccount(id: string){
  deleteAccount(id)
 }
 const shortendId = rowData?.id.split("-")[0];
 if(isLoading) return <Spinner/>

  return (
    <Table.Row>
      <StyledShortTableRow>{shortendId}</StyledShortTableRow>
      <StyledShortTableRow>{rowData.type}</StyledShortTableRow>
      <StyledShortTableRow>{rowData.smtpPort}</StyledShortTableRow>
      <StyledShortTableRow>{rowData.displayName}</StyledShortTableRow>
      <StyledShortTableRow>{rowData.securityProtocol}</StyledShortTableRow>
      <StyledShortTableRow>{rowData.email}</StyledShortTableRow>
      <StyledShortTableRow>{rowData.imapAddress}</StyledShortTableRow>
      <StyledShortTableRow>{rowData.imapPort}</StyledShortTableRow>
      <StyledShortTableRow>{rowData.imapEmail}</StyledShortTableRow>
      <StyledGroupButton>
      <HiOutlinePencil 
        style={{cursor: 'pointer'}} 
        size={15}
        onClick={()=> onEdit(rowData)}
       />
      <Modal>
        <Modal.Open opens="deletePop-ups">
        <HiOutlineTrash style={{cursor: 'pointer'}} size={15}/>
        </Modal.Open>
        <Modal.Window name="deletePop-ups" type="delete">
            <ConfirmDelete resourceName={rowData.email} isLoading={isLoading} onConfirm={()=>deleteEmailAccount(rowData.id)}/>
        </Modal.Window>
      </Modal>
      </StyledGroupButton>
    </Table.Row>
  );
};