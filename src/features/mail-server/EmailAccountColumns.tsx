import ActionButtons from "@components/action-button/ActionButtons";
import { ColumnDef } from "@tanstack/react-table";
import { useDelete } from "./useDelete";
import { useEmailData } from "@context/EmailAccountContext";

type EmailAccountProps = {
  onEdit: (values: any) => void;
};
const useEmailAccountColumns = ({ onEdit }: EmailAccountProps) => {
  const { deleteAccount } = useDelete();
  const { emailData } = useEmailData();
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "formatedId",
      header: "ID",
      size: 150,
    },
    {
      accessorKey: "type",
      header: "Type",
      accessorFn: row => (row.type === 1 ? "Standard" : row.type === 2 ? "PEC" : "REM"), // Map `1` to `Primary`, other values to `Secondary`
      size: 100,
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 200,
    },
    {
      accessorKey: "displayName",
      header: "Name",
      size: 150,
    },
    {
      accessorKey: "smtpAddress",
      header: "SMTP A.",
      size: 150,
    },
    {
      accessorKey: "smtpPort",
      header: "SMTP p.",
      size: 150,
    },
    {
      accessorKey: "securityProtocol",
      header: "Protocl",
      accessorFn: row => (row.securityProtocol === 1 ? "TLS" : "SSL"),
      size: 150,
    },
    {
      accessorKey: "imapAddress",
      header: "IMAP A.",
      size: 150,
    },
    {
      accessorKey: "imapEmail",
      header: "IMAP Email",
      size: 200,
    },
    {
      accessorKey: "imapPort",
      header: "IMAP P",
      size: 150,
    },
    {
      accessorKey: "password",
      header: "",
      size: 0,
      cell: () => null,
    },
    {
      accessorKey: "imapPassword",
      header: "",
      size: 0,
      cell: () => null,
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <ActionButtons
          onEdit={values => onEdit(values)}
          isLoading={false}
          data={row.original}
          deleteAccount={() => deleteAccount(row.original.id)}
        />
      ),
      size: 200,
    },
  ];
  const tableData = (emailData?.list || []).map(item => ({
    id: item.id,
    formatedId: item.id.split("-")[0],
    type: item.type,
    email: item.email,
    displayName: item.displayName,
    smtpAddress: item.smtpAddress,
    smtpPort: item.smtpPort,
    securityProtocol: item.securityProtocol,
    imapAddress: item.imapAddress,
    imapEmail: item.imapEmail,
    imapPort: item.imapPort,
    password: item.password,
    imapPassword: item.imapPassword,
  }));

  return { columns, tableData };
};

export default useEmailAccountColumns;
