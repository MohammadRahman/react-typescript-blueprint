import Spinner from "@components/spinner/Spinner";
import { useCreateReport } from "./useCreateReport";

type CreateReportFormProps = {
  onCloseModal: () => void;
};
export const CreateReportForm = ({ onCloseModal }: CreateReportFormProps) => {
  const { report, isPending } = useCreateReport();

  function handleClick() {
    report();
    onCloseModal?.();
  }
  if (isPending) return <Spinner />;
  return (
    <div>
      <button onClick={handleClick}>use default properpties</button>
    </div>
  );
};
