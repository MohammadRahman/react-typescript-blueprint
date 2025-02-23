import ActionButtons from "@components/action-button/ActionButtons";
import { HorizontalProgressbar } from "@components/progress-bar/HorizontalProgressbar";
import { Stack } from "@components/stack/Stack";
import { useJobData } from "@context/JobContext";
import { ColumnDef } from "@tanstack/react-table";
import { useDelete } from "./useDelete";
import { useState } from "react";
import { formatDate } from "@utils/helper";

export const useJobColumns = () => {
  const [selectedRowId, setSelectedRowId] = useState<string>("");
  const { jobData } = useJobData();
  const { deleteJob, isDeleting } = useDelete();

  const handleDetailsClick = (rowId: string) => {
    setSelectedRowId(prevId => (prevId === rowId ? "" : rowId));
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "jobId",
      header: "",
      size: 0,
      cell: () => null,
    },
    {
      accessorKey: "formatedId",
      header: "Id",
      size: 150,
    },
    {
      accessorKey: "name",
      header: "Name",
      size: 180,
      cell: ({ row }) => {
        return (
          <div>
            <p style={{ fontWeight: "700", fontSize: "14px" }}>{row.original.name}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "startDate",
      header: "Execution Date",
      size: 150,
    },
    {
      accessorKey: "detailsCount",
      header: "Recipients",
      size: 150,
    },

    {
      accessorKey: "type",
      header: "eMail Type",
      size: 150,
    },
    {
      accessorKey: "successCount",
      header: "Success/Failed ",
      size: 150,
      cell: ({ row }) => {
        const data = row.original;
        const successRate = (data.successCount / (data.successCount + data.failCount)) * 100;
        if (
          (data.successCount === 0 || data.successCount === undefined) &&
          (data.failCount === 0 || data.failCount === undefined)
        ) {
          return "-";
        }
        return (
          <Stack>
            <div>
              <span style={{ color: "var(--color-primary)" }}>{data.successCount}/</span>
              <span
                style={{ color: "var(--color-orange-20)", fontSize: "1.4rem", margin: "0 2px" }}
              >
                {data.failCount}
              </span>
            </div>
            <HorizontalProgressbar percent={successRate} />
          </Stack>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <ActionButtons
          onDetailsClick={() => handleDetailsClick(row.original.jobId)}
          isModal={true}
          isView={true}
          isDetails={true}
          selectedRowId={selectedRowId}
          modalName="job"
          isLoading={isDeleting}
          data={row.original}
          deleteAccount={() => deleteJob(row.original.jobId)}
        />
      ),
      size: 150,
    },
  ];
  const tableData = (jobData?.list || []).map(item => ({
    jobId: item.jobId,
    formatedId: item.jobId?.split("-")[0] || "-",
    name: item.name || "Unknown Name",
    status: item.status || 0,
    detailsCount: item.detailsCount || "No recipient",
    startDate: formatDate(item.startDate) || "",
    successCount: item.successCount || 0,
    failCount: item.failCount || 0,
  }));

  return { tableData, columns, selectedRowId };
};
