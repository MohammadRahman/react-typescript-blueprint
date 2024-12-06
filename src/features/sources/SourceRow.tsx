import ButtonIcon from "@components/button-icons/ButtonIcon";
import ConfirmDelete from "@components/delete-confirmation/ConfirmDelete";
import { Modal } from "@components/modal";
import { Table } from "@components/table";
import { DATA_SOURCE_TYPES } from "@constants/source";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import styled from "styled-components";
import { useDelete } from "./useDelteSource";
import Spinner from "@components/spinner/Spinner";

const StyledActionButtonsContainer = styled.div`
    display: flex;
    gap: 1rem;
`
interface SourceRowProps {
  rowData: {
    id: string;
    name: string;
    type: string | number;
    status: 1 | 2;
  },
  onEdit: (values: any)=> void;
  isLoading: boolean;
}

export const SourceRow = ({ rowData, onEdit, isLoading }: SourceRowProps) => {

  const {deleteAccount, isLoading: isDeleting} = useDelete();
  
  const statusToTagName = {
    1: "green-Success",
    2: "red-Failed",
  };
  function findSourceLabel(type: number|string){
   return DATA_SOURCE_TYPES.find(el=> el.value == type)?.label
  }
if(isLoading) return <Spinner/>

  return (
    <Table.Row>
      <div>{rowData.name}</div>
      <div>{findSourceLabel(rowData.type)}</div>
      {/* <Tag type={statusToTagName[rowData.status].split("-")[0]}> */}
        {/* {statusToTagName[rowData.status].split("-")[1]} */}
      {/* </Tag> */}
      <div></div>
      <StyledActionButtonsContainer>
          <ButtonIcon variation="square" type="edit" onClick={()=> onEdit(rowData)}>
              <HiOutlinePencil />
          </ButtonIcon>
          <Modal>
            <Modal.Open opens="deleteSource">
          <ButtonIcon variation="square" type="delete">
              <HiOutlineTrash/>
          </ButtonIcon>
          </Modal.Open>
          <Modal.Window name="deleteSource" type="delete">
              <ConfirmDelete
               resourceName={rowData.name} 
               isLoading={isLoading}
               onConfirm={()=> deleteAccount(rowData.id)}
               />
          </Modal.Window>
          </Modal>
      </StyledActionButtonsContainer>
      
    </Table.Row>
  );
};
