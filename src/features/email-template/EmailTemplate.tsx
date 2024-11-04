import ButtonGroup from "@components/button-group/ButtonGroup";
import Button from "@components/button/Button";
import { Row } from "@components/row";
import { Search } from "@components/search/Search";
import { Table } from "@components/table";
import { emailTemplateMock } from "@mocks/data";
import { HiOutlineDocumentText, HiOutlinePlus } from "react-icons/hi2";
import styled from "styled-components";
import { EmailTemplateRow } from "./EmailTemplateRow";
import { Modal } from "@components/modal";
import { NewTemplateForm } from "./NewTemplateForm";

const Styledjobs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: var(--color-grey-20);
`;

export const EmailTemplate = () => {
  const emailTemplates = emailTemplateMock();
  return (
    <Styledjobs>
      <Row type="horizontal">
        <div>
          <Search onChange={()=> console.log("")}/>
        </div>
        <ButtonGroup>
          <Button variation="outline" size="medium">
            <HiOutlineDocumentText />
            Generate Report
          </Button>
          <Modal>
            <Modal.Open opens="createNewTemplate">
              <Button variation="createNew" size="medium">
                <HiOutlinePlus />
                Create New Report
              </Button>
            </Modal.Open>
            <Modal.Window name="createNewTemplate">
              <NewTemplateForm />
            </Modal.Window>
          </Modal>
        </ButtonGroup>
      </Row>
      <Table columns="1fr 1fr 3.5fr 0.8fr 1fr">
        <Table.Header>
          <div>Name</div>
          <div>Template Name</div>
          <div>Description</div>
          <div>Source</div>
          <div>Action</div>
        </Table.Header>
        <Table.Body data={emailTemplates} render={(job: any) => <EmailTemplateRow data={job} />} />
      </Table>
    </Styledjobs>
  );
};
