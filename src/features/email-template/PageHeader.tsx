import ButtonGroup from "@components/button-group/ButtonGroup";
import Button from "@components/button/Button";
import { Modal } from "@components/modal";
import { Row } from "@components/row";
import { HiOutlineDocumentText, HiOutlinePlus } from "react-icons/hi2";
import { NewTemplateForm } from "./NewTemplateForm";

const PageHeader = () => {
  return (
    <Row type="horizontal" style={{ justifyContent: "flex-end" }}>
      <ButtonGroup gap="md">
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
  );
};

export default PageHeader;
