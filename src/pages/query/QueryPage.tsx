import { QueryProvider } from "@context/QueryContext";
import { Queries } from "@features/queries/Queries";


export const QueryPage = () => {
  return (
  <QueryProvider>
      <Queries />
  </QueryProvider>
);
};
