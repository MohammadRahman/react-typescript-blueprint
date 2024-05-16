import React from "react";
import { HiPlus } from "react-icons/hi2";
import { Modal } from "@components/modal";
import styled from "styled-components";
import { ReportTable } from "./ReportTable";
import { CreateReportForm } from "./CreateReportForm";

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const StyledButton = styled.button`
  all: unset;
  padding: 1rem;
  border: 1px solid var(--color-grey-200);
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:hover,
  &:focus,
  &:active {
    cursor: pointer;
    border-color: var(--color-brand);
  }
`;
export const Reports = () => {
  return (
    <Row>
      <div>
        <Modal>
          <Modal.Open opens="new-report">
            <StyledButton>
              <HiPlus />
              <span>New Report</span>
            </StyledButton>
          </Modal.Open>
          <Modal.Window name="new-report">
            <CreateReportForm />
          </Modal.Window>
        </Modal>
      </div>
      <ReportTable />
    </Row>
  );
};
