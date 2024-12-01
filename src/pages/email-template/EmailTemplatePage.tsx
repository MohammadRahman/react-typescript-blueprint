import { TemplateProvider } from "@context/TemplateContext";
import { EmailTemplate } from "@features/email-template/EmailTemplate";

export const EmailTemplatePage = () => {
  return (
    <TemplateProvider>
        <EmailTemplate />
  </TemplateProvider>
);
};
