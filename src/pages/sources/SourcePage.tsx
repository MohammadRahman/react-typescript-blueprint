import { SourceProvider } from "@context/SourceContext";
import { Sources } from "@features/sources/Sources";

export const SourcePage = () => {
  return(
    <SourceProvider>
        <Sources />
    </SourceProvider>
    );
};
