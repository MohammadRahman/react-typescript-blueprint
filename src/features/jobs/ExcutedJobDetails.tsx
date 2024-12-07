import Button from "@components/button/Button";
import { Table } from "@components/table";
import Tag from "@components/tag/Tag";

interface ExcutedJobDetailsProps {
  data: {
    email: string;
    dataIndex: number;
    fullName: string;
    status: 1 | 2;
  };
  index: number;
}

export const ExcutedJobDetails = ({ data, index }: ExcutedJobDetailsProps) => {
  console.log("ExcutedJobDetails", data);

  const statusToTagName = {
    1: "red-Fail",
    2: "green-Success",
  };
  return (
    <Table.Row>
      <div>{index + 1}</div>
      <div>{data.email}</div>
      <div>{data.fullName}</div>
      <div>{data.dataIndex}</div>
      <div>{data.dataIndex}</div>
      <div>{data.dataIndex}</div>
      <div>{data.dataIndex}</div>
      <Tag type={statusToTagName[data.status].split("-")[0]}>
        {statusToTagName[data.status].split("-")[1]}
      </Tag>
      <div>
        <Button variation="outlinePrimary" size="medium">
          View Message
        </Button>
      </div>
    </Table.Row>
  );
};
