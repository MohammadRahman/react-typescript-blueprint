import { QueryProvider } from "@context/QueryContext";
import { SourceProvider } from "@context/SourceContext";
import { Queries } from "@features/queries/Queries";


export const QueryPage = () => {
  return (
  <QueryProvider>
    <SourceProvider>
          <Queries />
    </SourceProvider>
  </QueryProvider>
);
};
