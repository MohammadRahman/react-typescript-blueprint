import ButtonGroup from "@components/button-group/ButtonGroup";
import Button from "@components/button/Button";
import { Row } from "@components/row";
import { HiOutlineDocumentText, HiOutlinePlus } from "react-icons/hi2";
import styled from "styled-components";
import { Modal } from "@components/modal";
import { NewTemplateForm } from "./NewTemplateForm";
import { useEmailTemplate } from "./useEmailTemplate";
import { useEffect } from "react";
import TemplateTable from "./TemplateTable";
import { DEFAULT_FILTER_VALUES } from "@constants/source";

const StyledEmailTemplate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: var(--color-grey-20);
`;

export const EmailTemplate = () => {
  const { templateLists, errorState, isLoading } = useEmailTemplate();

  useEffect(() => {
    templateLists(DEFAULT_FILTER_VALUES);
  }, []);

  return (
    <StyledEmailTemplate>
      <Row type="horizontal" style={{ justifyContent: "flex-end" }}>
        <ButtonGroup>
          <Button variation="outline" size="medium">
            <HiOutlineDocumentText />
            Generate Report
          </Button>
          <Modal>
            <Modal.Open opens="create-new-template">
              <Button variation="createNew" size="medium">
                <HiOutlinePlus />
                Create New Template
              </Button>
            </Modal.Open>
            <Modal.Window name="create-new-template" type="aside">
              <NewTemplateForm />
            </Modal.Window>
          </Modal>
        </ButtonGroup>
      </Row>
      <TemplateTable isLoading={isLoading || errorState.isLoading} />
    </StyledEmailTemplate>
  );
};
