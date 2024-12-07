import Button from "@components/button/Button";
import Heading from "@components/heading/Heading";
import Spinner from "@components/spinner/Spinner";
import styled from "styled-components";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
type ConfirmDeleteProps = {
  resourceName?: string;
  onConfirm?: () => void;
  disabled?: boolean;
  onCloseModal?: () => void;
  isLoading: boolean;
};

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
  isLoading,
}: ConfirmDeleteProps) {
  if (isLoading) return <Spinner />;
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This action cannot be
        undone.
      </p>

      <div>
        <Button variation="secondary" disabled={disabled} onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
