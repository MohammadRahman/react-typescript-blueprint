import { Table } from "@components/table";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import { RiAttachmentLine } from "react-icons/ri";

interface ReportRowUpdateProps {
  data: {
    name: string;
    template: string;
    description: string;
    source: string;
  };
}

export const ReportRowUpdate = ({ data }: ReportRowUpdateProps) => {
  return (
    <Table.Row>
      <div>{data.name}</div>
      <div>{data.template}</div>
      <div>{data.description}</div>
      <div>{data.source ? data.source : <RiAttachmentLine color="#04AA61" />}</div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div
          style={{
            backgroundColor: "#04AA61",
            width: "32px",
            height: "32px",
            border_radius: "50%",
            color: "white",
            alignItems: "center",
            justifycontent: "center",
            display: "flex",
          }}
        >
          <HiOutlinePencil size={15} />
        </div>
        <div
          style={{
            width: "32px",
            height: "32px",
            border_radius: "50%",
            alignItems: "center",
            justifycontent: "center",
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
