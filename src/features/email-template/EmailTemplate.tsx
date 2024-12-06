import ButtonGroup from "@components/button-group/ButtonGroup";
import Button from "@components/button/Button";
import { Row } from "@components/row";
import { Search } from "@components/search/Search";
import { HiOutlineDocumentText, HiOutlinePlus } from "react-icons/hi2";
import styled from "styled-components";
import { Modal } from "@components/modal";
import { NewTemplateForm } from "./NewTemplateForm";
import { useEmailTemplate } from "./useEmailTemplate";
import { useEffect} from "react";
import TemplateTable from "./TemplateTable";
import { useQueryData } from "@features/queries/useQueryData";

const StyledEmailTemplate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: var(--color-grey-20);
`;

const formattedValues = {
 page: -1,
 pagesize: -1
};

export const EmailTemplate = () => {
  
  const {templateLists} = useEmailTemplate();

  const {queryLists} = useQueryData();
  useEffect(()=>{
    templateLists(formattedValues)
  },[])

  useEffect(()=>{
    queryLists(formattedValues)
  },[])

  return (
    <StyledEmailTemplate>
      <Row type="horizontal" style={{justifyContent: 'flex-end'}}>
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
      <TemplateTable/>
    </StyledEmailTemplate>
  );
};
