import ButtonGroup from "@components/button-group/ButtonGroup";
import Button from "@components/button/Button";
import { Row } from "@components/row";
import { Search } from "@components/search/Search";
import { Table } from "@components/table";
import { emailTemplateMock } from "@mocks/data";
import { HiOutlineDocumentText, HiOutlinePlus } from "react-icons/hi2";
import styled from "styled-components";
// import { EmailTemplateRow } from "./EmailTemplateRow";
import { Modal } from "@components/modal";
import { ReportRowUpdate } from "./ReportRowUpdate";
import { NewReportForm } from "./NewReportForm";
// import { NewTemplateForm } from "./NewTemplateForm";

const StyledReports = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: var(--color-grey-20);
`;

export const ReportUpdatedStyles = () => {
  const reports = emailTemplateMock();
  return (
    <StyledReports>
      <Row type="horizontal">
        <div>
          <Search onChange={() => console.log("")} />
        </div>
        <ButtonGroup>
          <Button variation="outline" size="medium">
            <HiOutlineDocumentText />
            Generate Report
          </Button>
          <Modal>
            <Modal.Open opens="createNewReport">
              <Button variation="createNew" size="medium">
                <HiOutlinePlus />
                Create New Report
              </Button>
            </Modal.Open>
            <Modal.Window name="createNewReport">
              {/* <CreateReportUpdateForm /> */}
              <NewReportForm />
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
        <Table.Body data={reports} render={(job: any) => <ReportRowUpdate data={job} />} />
      </Table>
    </StyledReports>
  );
};
