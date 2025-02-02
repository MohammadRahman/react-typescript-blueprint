import { EmailDataProvider } from "@context/EmailAccountContext";
import { JobProvider } from "@context/JobContext";
import { TemplateProvider } from "@context/TemplateContext";
import { Jobs } from "@features/jobs/Jobs";

export const JobsPage = () => {
  return (
    <JobProvider>
      <TemplateProvider>
        <EmailDataProvider>
          <Jobs />
        </EmailDataProvider>
      </TemplateProvider>
    </JobProvider>
  );
};
