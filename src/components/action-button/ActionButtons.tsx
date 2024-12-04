import ButtonIcon from '@components/button-icons/ButtonIcon'
import ConfirmDelete from '@components/delete-confirmation/ConfirmDelete'
import { Modal } from '@components/modal'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2'

type ActionButtonsProps = {
    onEdit: (values: any)=> void;
    isLoading: boolean;
    data: any;
    deleteAccount:(id: string)=> void; 
}

const ActionButtons = ({onEdit,isLoading, data, deleteAccount}: ActionButtonsProps) => {
  return (
    <>
          <ButtonIcon variation="square" type="edit">
              <HiOutlinePencil onClick={()=> onEdit(data)}/>
          </ButtonIcon>
          <Modal>
            <Modal.Open opens="deleteSource">
          <ButtonIcon variation="square" type="delete">
              <HiOutlineTrash/>
          </ButtonIcon>
          </Modal.Open>
          <Modal.Window name="deleteSource" type="delete">
              <ConfirmDelete
               resourceName={data.name} 
               isLoading={isLoading}
               onConfirm={()=> deleteAccount(data.id)}
               />
          </Modal.Window>
          </Modal>
    </>
  )
}

export default ActionButtons