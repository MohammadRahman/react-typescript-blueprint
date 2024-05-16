import React from "react";
import styled from "styled-components";

const DeleteBox = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 4rem;
`;
const DeleteReportButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  float: right;
`;
type DeleteReportProps = {
  reportId: number;
};
export const DeleteReport = ({ reportId }: DeleteReportProps) => {
  return (
    <div>
      <h2>Report_Id: #{reportId}</h2>
      <DeleteBox>
        <p>Are you sure you want to delete?</p>
        <DeleteReportButtonGroup>
          <button>cancel</button>
          <button>delete</button>
        </DeleteReportButtonGroup>
      </DeleteBox>
    </div>
  );
};
