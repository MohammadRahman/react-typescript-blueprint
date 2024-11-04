import { Table } from "@components/table";
import { Modal } from "@components/modal";
import { HiOutlineEye, HiOutlineTrash } from "react-icons/hi2";
import styled from "styled-components";
import { ReportDetails } from "./ReportDetails";
import { DeleteReport } from "./DeleteReport";

type ReportRowProps = {
  report: {
    id: number;
    fullName: string;
    email: string;
    totalSent: number;
    success: string;
    fail: string;
  };
};

export const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;
const TotalEmailSent = styled.span``;
const Success = styled.span`
  &:hover {
    height: 100%;
    background-color: var(--color-brand-100);
    cursor: pointer;
  }
`;
const Failed = styled.span`
  &:hover {
    &:hover {
      height: 100%;
      background-color: var(--color-red-100);
      cursor: pointer;
    }
  }
`;

const ActionsButtonGroup = styled.div`
  display: flex;
  gap: 5px;
`;
const ButtonBox = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid var(--color-grey-100);
  background-color: #fb466a;
  color: var(--color-brand-50);
  cursor: pointer;
`;
export const ReportRow = ({ report }: ReportRowProps) => {
  return (
    <Table.Row>
      <div>{report.id}</div>
      <Stacked>
        <span>{report.fullName}</span>
        <span>{report.email}</span>
      </Stacked>
      <TotalEmailSent>{report.totalSent}</TotalEmailSent>
      <Success>{report.success}</Success>
      <Failed>{report.fail}</Failed>
      <ActionsButtonGroup>
        <Modal>
          <Modal.Open opens="report-details">
            <ButtonBox>
              <HiOutlineEye />
            </ButtonBox>
          </Modal.Open>
          <Modal.Window name="report-details">
            <ReportDetails reportId={report.id} />
          </Modal.Window>
          <Modal.Open opens="delete-report">
            <ButtonBox>
              <HiOutlineTrash />
            </ButtonBox>
          </Modal.Open>
          <Modal.Window name="delete-report">
            <DeleteReport reportId={report.id} />
          </Modal.Window>
        </Modal>
      </ActionsButtonGroup>
    </Table.Row>
  );
};
