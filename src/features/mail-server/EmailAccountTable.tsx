import { useEmailAccount } from "./useEmailAccount";
import { CreateMailServerFormProps } from "./CreateMailServerForm";
import ResizableTable from "@components/table/ResponsiveTable";
import useEmailAccountColumns from "./EmailAccountColumns";

type EmailAccountTableProps = {
  onEdit: (data: CreateMailServerFormProps["formData"]) => void;
  status: boolean | undefined;
};
const EmailAccountTable = ({ onEdit, status }: EmailAccountTableProps) => {
  const { isLoading, errorState } = useEmailAccount();
  const { columns, tableData } = useEmailAccountColumns({ onEdit });
  return (
    <ResizableTable
      searchProperty={["email", "displayName", "imapEmail"]}
      isLoading={status || isLoading || errorState.isLoading}
      columns={columns}
      data={tableData}
    />
  );
};

export default EmailAccountTable;
