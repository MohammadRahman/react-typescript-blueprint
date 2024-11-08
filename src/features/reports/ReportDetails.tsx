
type ReportDetailsProps = {
  reportId: number;
};
export const ReportDetails = ({ reportId }: ReportDetailsProps) => {
  return (
    <div>
      <h2>Report_id: #{reportId}</h2>
    </div>
  );
};
