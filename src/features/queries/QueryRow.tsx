import Button from "@components/button/Button";
import { Table } from "@components/table";
import { StyledActionButtonsContainer } from "./query.styles";
import ButtonIcon from "@components/button-icons/ButtonIcon";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import { Modal } from "@components/modal";
import ConfirmDelete from "@components/delete-confirmation/ConfirmDelete";
import { useDeleteQuery } from "./useDeleteQuery";
import Spinner from "@components/spinner/Spinner";

interface QueryRowProps {
  rowData: {
    id: string;
    name: string;
    body: string;
    sourceId: string;
  };
  onEdit: (values: any) => void;
  isLoading: boolean | undefined;
}

export const QueryRow = ({ rowData, onEdit, isLoading }: QueryRowProps) => {
  const { deleteQuery, isLoading: isDeleting } = useDeleteQuery();

  if (isLoading) return <Spinner />;

  return (
    <Table.Row>
      <div>{rowData.name}</div>
      <div>{rowData.body && rowData.body ? "Yes" : "-"}</div>
      <div>{rowData.sourceId && rowData.sourceId ? "Yes" : "-"}</div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Button variation="outlinePrimary" type="small">
          Show Data
        </Button>
        <StyledActionButtonsContainer>
          <ButtonIcon variation="square" type="edit" onClick={() => onEdit(rowData)}>
            <HiOutlinePencil />
          </ButtonIcon>
          <Modal>
            <Modal.Open opens="deleteSource">
              <ButtonIcon variation="square" type="delete">
                <HiOutlineTrash />
              </ButtonIcon>
            </Modal.Open>
            <Modal.Window name="deleteSource" type="delete">
              <ConfirmDelete
                resourceName={rowData.name}
                isLoading={isDeleting}
                onConfirm={() => deleteQuery(rowData.id)}
              />
            </Modal.Window>
          </Modal>
        </StyledActionButtonsContainer>
      </div>
    </Table.Row>
  );
};
