import ActionButtons from "@components/action-button/ActionButtons";
import ResizableTable from "@components/table/ResponsiveTable";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@utils/helper";
import { useJobDetails } from "./useJobDetails";
import { useEffect } from "react";
import Spinner from "@components/spinner/Spinner";
import Tag from "@components/tag/Tag";

type SecondaryTable = {
  jobId: string;
};
type JobDetailsProps = {
  id: string;
  jobId: string;
  sendTo: string;
  emailSendingDate: string;
  emailSendingStatus: number;
  emailSubject: string;
  emailBody: string;
};
const SecondaryTable = ({ jobId }: SecondaryTable) => {
  const { jobDetails, jobDetailsData, loading } = useJobDetails();
  function deleteJob(jobId: string) {}
  const columns: ColumnDef<JobDetailsProps>[] = [
    {
      accessorKey: "id",
      header: "#",
      size: 150,
    },
    {
      accessorKey: "jobId",
      header: "Job Id",
      size: 150,
    },
    {
      accessorKey: "sendTo",
      header: "Email",
      size: 150,
    },
    {
      accessorKey: "emailSendingDate",
      header: "Sending Date",
      size: 150,
    },
    {
      accessorKey: "emailSendingStatus",
      header: "Status",
      cell: ({ row }) => {
        const statusToTag: Record<number, string> = {
          1: "red-Fail",
          2: "green-Success",
        };
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Tag
              tag_type="normal"
              type={statusToTag[row.original.emailSendingStatus].split("-")[0]}
            >
              {statusToTag[row.original.emailSendingStatus].split("-")[1]}
            </Tag>
          </div>
        );
      },
      size: 150,
    },
    {
      accessorKey: "emailSubject",
      header: "",
      size: 0,
      cell: () => null,
    },
    {
      accessorKey: "emailBody",
      header: "",
      size: 0,
      cell: () => null,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <ActionButtons
          isModal={true}
          isDetails={true}
          modalName="emailjobData"
          isLoading={false}
          data={row.original}
          deleteAccount={() => deleteJob("")}
        />
      ),
      size: 150,
    },
  ];
  const tableData = (jobDetailsData || []).map((item: JobDetailsProps) => ({
    id: item.id.split("-")[0] || "",
    jobId: item.jobId.split("-")[0] || "",
    sendTo: item.sendTo || "",
    emailSendingDate: formatDate(item.emailSendingDate) || "",
    emailSendingStatus: item.emailSendingStatus || 0,
    emailSubject: item.emailSubject || "",
    emailBody: item.emailBody || "",
  }));

  useEffect(() => {
    if (!jobId) return;
    jobDetails(jobId);
  }, [jobId]);

  if (loading) return <Spinner />;
  return (
    <div>
      <ResizableTable showOperations={false} columns={columns} data={tableData} />
    </div>
  );
};

export default SecondaryTable;
