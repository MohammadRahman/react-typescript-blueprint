import ActionButtons from "@components/action-button/ActionButtons";
import ResizableTable from "@components/table/ResponsiveTable";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@utils/helper";

type SecondaryTable = {
  data: any;
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
const SecondaryTable = ({ data }: SecondaryTable) => {
  function deleteJob(jobId: string) {}
  const columns: ColumnDef<JobDetailsProps>[] = [
    {
      accessorKey: "id",
      header: "#",
      size: 150,
      cell: () => null,
    },
    {
      accessorKey: "jobId",
      header: "Job Id",
      size: 150,
      cell: () => null,
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
      cell: () => {},
      size: 150,
    },
    {
      accessorKey: "emailSubject",
      header: "Subject",
      size: 150,
    },
    {
      accessorKey: "emailBody",
      header: "Body",
      size: 150,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <ActionButtons
          //   onEdit={(values) => onEdit(values)}
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
  const tableData = (data || []).map((item: JobDetailsProps) => ({
    id: item.id || "",
    jobId: item.jobId || "",
    sendTo: item.sendTo || "",
    emailSendingDate: formatDate(item.emailSendingDate) || "",
    emailSendingStatus: item.emailSendingStatus || 0,
    emailSubject: item.emailSubject || "",
    emailBody: item.emailBody || "",
  }));
  return (
    <div>
      <ResizableTable columns={columns} data={tableData} />
    </div>
  );
};

export default SecondaryTable;
