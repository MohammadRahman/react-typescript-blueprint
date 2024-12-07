import ButtonIcon from "@components/button-icons/ButtonIcon";
import ConfirmDelete from "@components/delete-confirmation/ConfirmDelete";
import { Modal } from "@components/modal";
import { NewTemplateForm } from "@features/email-template/NewTemplateForm";
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import styled from "styled-components";

type ActionButtonsProps = {
  onEdit?: (values: any) => void;
  isLoading: boolean;
  data: any;
  deleteAccount: (id: string) => void;
  isModal?: boolean;
  modalName?: string;
};
const GroupButton = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;
const ActionButtons = ({
  onEdit,
  isLoading,
  modalName,
  data,
  isModal = false,
  deleteAccount,
}: ActionButtonsProps) => {
  const handleEdit = () => {
    console.log("source data", data);
    if (onEdit) {
      onEdit(data); // Call onEdit if defined
    }
  };

  return (
    <GroupButton>
      <Modal>
        {isModal ? (
          <>
            <Modal.Open opens={modalName || ""}>
              <ButtonIcon variation="square" type="edit">
                <HiOutlinePencil />
              </ButtonIcon>
            </Modal.Open>
            <Modal.Window name={modalName || ""}>
              {modalName === "emailTemplate" ? <NewTemplateForm templateToEdit={data} /> : null}
            </Modal.Window>
          </>
        ) : (
          <ButtonIcon variation="square" type="edit">
            <HiOutlinePencil onClick={handleEdit} />
          </ButtonIcon>
        )}

        <ButtonIcon variation="square">
          <HiOutlineEye />
        </ButtonIcon>
        <Modal.Open opens="deleteSource">
          <ButtonIcon variation="square" type="delete">
            <HiOutlineTrash />
          </ButtonIcon>
        </Modal.Open>
        <Modal.Window name="deleteSource" type="delete">
          <ConfirmDelete
            resourceName={data.name}
            isLoading={isLoading}
            onConfirm={() => deleteAccount(data.id)}
          />
        </Modal.Window>
      </Modal>
    </GroupButton>
  );
};

export default ActionButtons;
