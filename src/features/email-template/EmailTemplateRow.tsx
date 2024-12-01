import { Modal } from "@components/modal";
import { Table } from "@components/table";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import { RiAttachmentLine } from "react-icons/ri";
import { NewTemplateForm } from "./NewTemplateForm";
import { formatString } from "@utils/helper";
import ButtonIcon from "@components/button-icons/ButtonIcon";
import ConfirmDelete from "@components/delete-confirmation/ConfirmDelete";
import {useDeleteTemplate} from "./useDeleteTemplate";

interface EmailTemplateRowProps{
  data: {
    id: string;
    name: string;
    subject: string;
    body: string;
    source: string;
  }
}

export const EmailTemplateRow = ({ data }: EmailTemplateRowProps) => {
  const {deleteTemplate ,isLoading} = useDeleteTemplate();
  return (
    <Table.Row>
      <div>{data.name}</div>
      <div>{data.subject}</div>
      <div>{formatString(data.body)}</div>
      <div>{data.source ? data.source : <RiAttachmentLine color="#04AA61" />}</div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Modal>
          <Modal.Open opens="email-template">
                <ButtonIcon variation="square" type="edit">
                  <HiOutlinePencil />
                </ButtonIcon>
              </Modal.Open> 
          <Modal.Window name="email-template">
            <NewTemplateForm templateToEdit={data} />
          </Modal.Window>
        <Modal.Open opens="deleteTemplate">
        <ButtonIcon variation="square" type="delete">
          <HiOutlineTrash size={15} />
        </ButtonIcon>
        </Modal.Open>
        <Modal.Window name="deleteTemplate" type="delete">
            <ConfirmDelete 
               resourceName={data.name} 
               isLoading={isLoading}
               onConfirm={()=> deleteTemplate(data.id)}  
            />
        </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
};
