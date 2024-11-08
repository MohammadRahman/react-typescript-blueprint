import { Modal } from "@components/modal";
import { Table } from "@components/table";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import { RiAttachmentLine } from "react-icons/ri";
import { NewTemplateForm } from "./NewTemplateForm";

interface EmailTemplateRowProps{
  data: {
    name: string;
    template: string;
    description: string;
    source: string;
  }
}

export const EmailTemplateRow = ({ data }: EmailTemplateRowProps) => {
  return (
    <Table.Row>
      <div>{data.name}</div>
      <div>{data.template}</div>
      <div>{data.description}</div>
      <div>{data.source ? data.source : <RiAttachmentLine color="#04AA61" />}</div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Modal>
          <Modal.Open opens="email-template">
            <div
              style={{
                backgroundColor: "#04AA61",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                color: "white",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <HiOutlinePencil size={15} />
            </div>
          </Modal.Open>
          <Modal.Window name="email-template">
            <NewTemplateForm templateToEdit={data} />
          </Modal.Window>
        </Modal>
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            border: "2px solid #F9F9FB",
          }}
        >
          <HiOutlineTrash size={15} />
        </div>
      </div>
    </Table.Row>
  );
};
