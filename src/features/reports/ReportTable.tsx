import { Table } from "@components/table";
import { Pagination } from "@components/pagination";
import { useState } from "react";
import { ReportRow } from "./ReportRow";
import { useReports } from "./useReports";

export const ReportTable = () => {
  const { reports, isLoading } = useReports();
  const [count, setCount] = useState(5);

  return (
    <Table columns="0.6fr 2fr 1fr 1fr 1fr 1fr">
      <Table.Header>
        <div>#</div>
        <div>Name</div>
        <div>Total sent</div>
        <div>Success</div>
        <div>failed</div>
        <div>actions</div>
      </Table.Header>
      <Table.Body
        data={reports}
        render={(report: any) => <ReportRow report={report} key={report.id} />}
      />
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
};
