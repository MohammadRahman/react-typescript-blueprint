import ButtonGroup from "@components/button-group/ButtonGroup";
import Button from "@components/button/Button";
import { Row } from "@components/row";
import { Search } from "@components/search/Search";
import { Table } from "@components/table";
import { HiOutlineDocumentText, HiOutlinePlus } from "react-icons/hi2";
import styled from "styled-components";
import { EmailTemplateRow } from "./EmailTemplateRow";
import { Modal } from "@components/modal";
import { NewTemplateForm } from "./NewTemplateForm";
import { useTemplateData } from "@context/TemplateContext";
import { useEmailTemplate } from "./useEmailTemplate";
import { useEffect, useRef } from "react";

const StyledEmailTemplate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: var(--color-grey-20);
`;

const formattedValues = {
  currentPage: 0,
  pageSize: 20,
  logicalOperator: 1,
  filters: [
    {
      propertyName: "subject",
      sign: 0, // Assuming `sign` means "equals"
      value: "Test Template",
    },
  ],
  orders: [
    {
      propertyName: "name",
      isDescending: true,
    },
  ],
};

export const EmailTemplate = () => {
  // const emailTemplates = emailTemplateMock();
  const {template} = useTemplateData();
  const {templateLists} = useEmailTemplate()

  console.log("template Lists", template?.list);


  useEffect(()=>{
    templateLists(formattedValues)
  },[])
  return (
    <StyledEmailTemplate>
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
            <Modal.Window name="createNewTemplate" type="aside">
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
        <Table.Body data={template?.list || []} render={(template: any) => 
          <EmailTemplateRow key={template.id} data={template} />
        } 
          />
      </Table>
    </StyledEmailTemplate>
  );
};
