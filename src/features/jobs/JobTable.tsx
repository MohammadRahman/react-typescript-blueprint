import ActionButtons from "@components/action-button/ActionButtons";
import { Container } from "@components/container/Container";
import { HorizontalProgressbar } from "@components/progress-bar/HorizontalProgressbar";
import { Stack } from "@components/stack/Stack";
import ResizableTable from "@components/table/ResponsiveTable";
import { useJobData } from "@context/JobContext";
import { jobExecutaionCardData, jobsData } from "@mocks/data";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@utils/helper";
import { useState } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  width: 100%;
  background-color: var(--color-white);
  padding: 1rem;
`;

const JobTable = () => {
  const [selectedRowId, setSelectedRowId] = useState<string>("");

  const jobStats = jobExecutaionCardData();
  const jobsDetails = jobsData();
  const [searchInput, setSearchInput] = useState("");
  const filterdJobs = jobsDetails.filter((job: any) => searchInput == job.id);

  const filteredJobs = searchInput != "" ? filterdJobs : jobsDetails;

  const { jobData } = useJobData();

  function deleteJob(id: string) {}

  const handleDetailsClick = (rowId: string) => {
    setSelectedRowId(prevId => (prevId === rowId ? "" : rowId));
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "",
      size: 0,
      cell: () => null,
    },
    {
      accessorKey: "formatedId",
      header: "Id",
      size: 150,
      cell: () => null,
    },
    {
      accessorKey: "name",
      header: "Name",
      size: 150,
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
              <span style={{ color: "var(--color-primary)" }}>{data.successCount}</span>
              <span style={{ color: "var(--color-primary)" }}>/</span>
              <span style={{ color: "var(--color-orange-20)" }}>{data.failCount}</span>
            </div>
            <HorizontalProgressbar percent={successRate} />
          </Stack>
        );
      },
    },
    {
      id: "actions", // Custom column for actions
      header: "Actions",
      cell: ({ row }) => (
        <ActionButtons
          //   onEdit={(values) => onEdit(values)}
          onDetailsClick={() => handleDetailsClick(row.original.jobId)}
          isModal={true}
          isDetails={true}
          modalName="emailjobData"
          isLoading={false}
          data={row.original}
          deleteAccount={() => deleteJob(row.original.id)}
        />
      ),
      size: 150,
    },
  ];

  const tableData = (jobData?.list || []).map(item => ({
    jobId: item.jobId || "Unknown ID",
    formatedId: item.jobId?.split("-")[0] || "-",
    name: item.name || "Unknown Name",
    status: item.status || 0,
    detailsCount: item.detailsCount || "No recipient",
    startDate: formatDate(item.startDate || "") || "",
    successCount: item.successCount || 0,
    failCount: item.failCount || 0,
  }));

  const withMoreData = [
    ...tableData,
    {
      jobId: "123456",
      name: "Test",
      detailsCount: 300,
      startDate: formatDate("2025-01-29T19:04:39.949986"),
      successCount: 280,
      failCount: 20,
    },
  ];

  return (
    <Container padding="md" bgc="white" borderRadius="lg" border="sm">
      <ResizableTable
        searchProperty={["name"]}
        columns={columns}
        selectedRowId={selectedRowId}
        data={withMoreData}
      />
    </Container>
  );
};

export default JobTable;
