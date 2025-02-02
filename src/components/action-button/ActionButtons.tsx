import ButtonWithIcon from "@components/button-with-icon/ButtonWithIcon";
import Button from "@components/button/Button";
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
  isDetails?: boolean;
  onDetailsClick?: () => void;
  isView?: boolean;
};
const GroupButton = styled.div`
  display: flex;
  gap: 0.5rem;
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
  isDetails,
  onDetailsClick,
  isView = false,
}: ActionButtonsProps) => {
  const handleEdit = () => {
    if (onEdit) {
      onEdit(data);
    }
  };

  return (
    <GroupButton>
      <Modal>
        {isView && isDetails ? (
          <Button type="button" variation="outlinePrimary" onClick={onDetailsClick}>
            Details
          </Button>
        ) : isView ? (
          <ButtonWithIcon variation="square">
            <HiOutlineEye />
          </ButtonWithIcon>
        ) : null}

        {isModal ? (
          <>
            <Modal.Open opens={modalName || ""}>
              <ButtonWithIcon variation="square" type="edit">
                <HiOutlinePencil />
              </ButtonWithIcon>
            </Modal.Open>
            <Modal.Window name={modalName || ""}>
              {modalName === "emailTemplate" ? <NewTemplateForm templateToEdit={data} /> : null}
            </Modal.Window>
          </>
        ) : (
          <ButtonWithIcon variation="square" type="edit">
            <HiOutlinePencil onClick={handleEdit} />
          </ButtonWithIcon>
        )}
        <Modal.Open opens={modalName || ""}>
          <ButtonWithIcon variation="square" type="delete">
            <HiOutlineTrash />
          </ButtonWithIcon>
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
