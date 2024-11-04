import { Table } from "@components/table";
import { useState } from "react";
import {
  HiOutlinePencil,
  HiOutlineRocketLaunch,
  HiOutlineTrash,
  HiOutlineTrophy,
} from "react-icons/hi2";
import { Stacked } from "..";
import Tag from "@components/tag/Tag";
import ButtonGroup from "@components/button-group/ButtonGroup";
import Button from "@components/button/Button";
import ButtonIcon from "@components/button-icons/ButtonIcon";
import styled from "styled-components";
import { ExcutedJobDetails } from "./ExcutedJobDetails";
import { executedJobDetailsData } from "@mocks/data";
import { HorizontalProgressbar } from "@components/progress-bar/HorizontalProgressbar";

const StyleButtonGroup = styled(ButtonGroup)`
  gap: 0.5rem;
  align-items: center;
`;
const StyledButtonIcon = styled(ButtonIcon)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color-grey-100);
`;

interface EcecutedJobRowProps{
  data: {
    id: number;
    mailType: number;
    date: string;
    jobName: string;
    recipent: number;
    success: number;
    fail: number;
    status: 1 | 2 | 3;
  }
}
type JobExecutionDetail = {
  id: number;
  fullName: string;
  email: string;
  dataIndex: number;
  status: number;
};
export const EcecutedJobRow = ({ data }: EcecutedJobRowProps) => {
  const [showSecondaryTable, setShowSecondaryTable] = useState(false);
  const [_, setExecutionId] = useState(0);
  const [dataByExecutionId, setDataByExecutionId] = useState<Omit<JobExecutionDetail, 'id'> []>([]);
  const rowData = executedJobDetailsData();

  const successRate = (data?.success / data.recipent) * 100;

  const statusToTagName = {
    1: "blue-In Progress",
    2: "green-Complete",
    3: "red-Recently Expired",
  };

  const clickHandler = (id: number) => {
    setExecutionId(id);
    setShowSecondaryTable(prev => !prev);
    setDataByExecutionId(rowData[id]);
  };
  return (
    <>
      <Table.Row>
        <div>{data.id}</div>
        <div>{data.date}</div>
        <div>{data.jobName}</div>
        <div>
          {data.mailType === 1 ? (
            <HiOutlineTrophy />
          ) : data.mailType === 2 ? (
            <HiOutlineRocketLaunch />
          ) : (
            "-"
          )}
        </div>
        <div>{data?.recipent}</div>
        <Stacked>
          <span>
            {data.success}/{data.fail}
          </span>
          <HorizontalProgressbar percent={successRate} />
          {/* <span></span> */}
        </Stacked>
        <Tag tagType="normal" type={statusToTagName[data.status].split("-")[0]}>
          {statusToTagName[data.status].split("-")[1]}
        </Tag>
        <StyleButtonGroup>
          <Button variation="primary" type="smallDetail" onClick={() => clickHandler(data.id)}>
            Details
          </Button>
          <StyledButtonIcon>
            <HiOutlinePencil />
          </StyledButtonIcon>
          <HiOutlineTrash />
        </StyleButtonGroup>
      </Table.Row>
      <div>
        {showSecondaryTable && (
          <Table columns="0.4fr 1fr 0.8fr 0.4fr 0.4fr 0.4fr 0.8fr 0.5fr 0.8fr">
            <Table.Header>
              <div>#</div>
              <div>Email</div>
              <div>Name</div>
              <div>740</div>
              <div>740</div>
              <div>740</div>
              <div>740</div>
              <div>Status</div>
              <div>Action</div>
            </Table.Header>
            <Table.Body
              data={dataByExecutionId}
              render={(job: any, idx: number) => (
                <ExcutedJobDetails key={job.id} index={idx} data={job} />
              )}
            />
          </Table>
        )}
      </div>
    </>
  );
};
