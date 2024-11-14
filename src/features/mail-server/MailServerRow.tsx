import { Modal } from "@components/modal";
import { Table } from "@components/table";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import styled from "styled-components";
import CreateMailServerForm from "./CreateMailServerForm";
import ConfirmDelete from "@components/delete-confirmation/ConfirmDelete";
import ButtonIcon from "@components/button-icons/ButtonIcon";
import { useDelete } from "./useDelete";
import Spinner from "@components/spinner/Spinner";

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
  }
}
const StyledGroupButton = styled.div`
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
export const MailServerRow = ({ rowData }: MailServerRowProps) => {

 const {deleteAccount, isLoading } = useDelete()

 function deleteEmailAccount(id: string){
  deleteAccount(id)
 }
 const shortendId = rowData?.id.split("-")[0];
 
 if(isLoading) return <Spinner/>

  return (
    <Table.Row>
      <div>{shortendId}</div>
      <div>{rowData.type}</div>
      <div>{rowData.email}</div>
      <div>{rowData.displayName}</div>
      <div>{rowData.smtpPort}</div>
      <div>{rowData.securityProtocol}</div>
      <div>{rowData.imapAddress}</div>
      <div>{rowData.imapEmail}</div>
      <div>{rowData.imapPort}</div>
      <StyledGroupButton>
        <Modal>
            <ButtonBox>
              <Modal.Open opens="emailServer">
                <HiOutlinePencil size={15} />
              </Modal.Open>
              <Modal.Window name="emailServer" type="regular">
              <CreateMailServerForm formData={rowData}/>
              </Modal.Window>
            </ButtonBox>
            <ButtonBox>
              <Modal.Open opens="deleteWindow">
                <HiOutlineTrash size={15} />
              </Modal.Open>
              <Modal.Window name="deleteWindow" type="delete">
                  <ConfirmDelete onConfirm={()=> deleteEmailAccount(rowData.id)} resourceName={rowData.email}/>
              </Modal.Window>
            </ButtonBox>
          </Modal>
      </StyledGroupButton>
    </Table.Row>
  );
};
