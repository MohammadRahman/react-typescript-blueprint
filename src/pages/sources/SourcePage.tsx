import { ConnectionStrProvider } from "@context/ConnectionStringContext";
import { SourceProvider } from "@context/SourceContext";
import { Sources } from "@features/sources/Sources";

export const SourcePage = () => {
  return(
    <SourceProvider>
    <ConnectionStrProvider>
        <Sources />
    </ConnectionStrProvider>
    </SourceProvider>
    );
};
