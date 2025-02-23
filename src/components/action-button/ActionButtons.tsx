import ButtonWithIcon from "@components/button-with-icon/ButtonWithIcon";
import Button from "@components/button/Button";
import ConfirmDelete from "@components/delete-confirmation/ConfirmDelete";
import { Modal } from "@components/modal";
import { NewTemplateForm } from "@features/email-template/NewTemplateForm";
import { CreateJobFrom } from "@features/jobs/CreateJobFrom";
import { useQueryResult } from "@features/queries/useQueryResult";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
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
  selectedRowId?: string;
  showData?: boolean;
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
  selectedRowId,
  showData,
  isView = false,
}: ActionButtonsProps) => {
  const { getQueryResult } = useQueryResult();

  const handleEdit = () => {
    if (onEdit) {
      onEdit(data);
    }
  };

  const isActive = selectedRowId === data?.jobId;

  const queryResultPayload = {
    sourceId: data.sourceId,
    queryScript: data.body,
  };
  return (
    <GroupButton>
      <Modal>
        {isView && isDetails ? (
          <Button
            type="button"
            variation="outlinePrimary"
            onClick={onDetailsClick}
            style={{ backgroundColor: isActive ? "#04aa61" : "", color: isActive ? "white" : "" }}
          >
            Details
          </Button>
        ) : showData ? (
          <Button
            variation="outlinePreview"
            type="button"
            style={{ padding: "5px", height: "30px", width: "60px" }}
            onClick={() => getQueryResult(queryResultPayload)}
          >
            Show Data
          </Button>
        ) : null}

        {isModal ? (
          <>
            <Modal.Open opens={modalName || ""}>
              <ButtonWithIcon variation="round" type="edit">
                <HiOutlinePencil />
              </ButtonWithIcon>
            </Modal.Open>
            <Modal.Window name={modalName || ""}>
              {modalName === "emailTemplate" ? (
                <NewTemplateForm templateToEdit={data} />
              ) : modalName === "job" ? (
                <CreateJobFrom jobToEdit={data} />
              ) : null}
            </Modal.Window>
          </>
        ) : (
          <ButtonWithIcon variation="square" type="edit">
            <HiOutlinePencil onClick={handleEdit} />
          </ButtonWithIcon>
        )}
        <Modal.Open opens="deleteModal">
          <ButtonWithIcon variation="square" type="delete">
            <HiOutlineTrash />
          </ButtonWithIcon>
        </Modal.Open>
        <Modal.Window name="deleteModal" type="delete">
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
