import { Modal } from "@components/modal";
import { Table } from "@components/table";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import styled from "styled-components";
import CreateMailServerForm from "./CreateMailServerForm";
import ConfirmDelete from "@components/delete-confirmation/ConfirmDelete";
import ButtonIcon from "@components/button-icons/ButtonIcon";
import { useDelete } from "./useDelete";

interface MailServerRowProps{
  rowData: {
    someData: string;
    someData1: string;
    someData2: string;
    someData3: string;
    someData4: string;
    someData5: string;
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
 
 if(isLoading) return <h1>Loading...</h1>

  return (
    <Table.Row>
      <div>{rowData.someData}</div>
      <div>{rowData.someData1}</div>
      <div>{rowData.someData2}</div>
      <div>{rowData.someData3}</div>
      <div>{rowData.someData4}</div>
      <div>{rowData.someData5}</div>
      <div>{rowData.someData5}</div>
      <div>{rowData.someData5}</div>
      <div>{rowData.someData5}</div>
      <StyledGroupButton>
        <Modal>
            <ButtonBox>
              <Modal.Open opens="emailServer">
                <HiOutlinePencil size={15} />
              </Modal.Open>
              <Modal.Window name="emailServer" type="regular">
              <CreateMailServerForm />
              </Modal.Window>
            </ButtonBox>
            <ButtonBox>
              <Modal.Open opens="deleteWindow">
                <HiOutlineTrash size={15} />
              </Modal.Open>
              <Modal.Window name="deleteWindow" type="delete">
                  <ConfirmDelete onConfirm={()=> deleteEmailAccount(rowData.someData)} resourceName={rowData.someData}/>
              </Modal.Window>
            </ButtonBox>
          </Modal>
      </StyledGroupButton>
    </Table.Row>
  );
};
