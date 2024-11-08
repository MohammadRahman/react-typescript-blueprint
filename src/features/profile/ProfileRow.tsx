import Checkbox from "@components/form/CheckBox";
import { Table } from "@components/table";
import { useState } from "react";

interface ProfileRowProps{
  rowData: {
    jobsPermission: number;
    permissionType: number;
  }
}

export const ProfileRow = ({ rowData }: ProfileRowProps) => {
  const isAllowedToView = Boolean(rowData.jobsPermission & 1);
  const isAllowedToEdit = Boolean(rowData.jobsPermission & 1);
  const isAllowedToDelete = Boolean(rowData.jobsPermission & 1);

  const [jobView, setJobView] = useState(isAllowedToView);
  const [jobEdit, setJobEdit] = useState(isAllowedToEdit);
  const [jobDelete, setJobDelete] = useState(isAllowedToDelete);

  // const handleJobViewChange = event => {
  //   const { checked } = event.target;
  //   setJobView(checked);
  // };

  return (
    <>
      <Table.Row>
        <div>{rowData.permissionType}</div>
        <div>
          <Checkbox
            id="jobView"
            checked={jobView}
            disabled={rowData.jobsPermission === 56}
            onChange={() => setJobView(prev => !prev)}
          >
            <></>
          </Checkbox>
        </div>
        <div>
          <Checkbox
            id="jobView"
            checked={jobEdit}
            disabled={rowData.jobsPermission === 56}
            onChange={() => setJobEdit(prev => !prev)}
          >
            <></>
          </Checkbox>
        </div>
        <div>
          <Checkbox
            id="jobView"
            checked={jobDelete}
            disabled={rowData.jobsPermission === 56}
            onChange={() => setJobDelete(prev => !prev)}
          >
            <></>
          </Checkbox>
        </div>
      </Table.Row>
    </>
  );
};
