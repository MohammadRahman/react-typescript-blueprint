import { EmailDataProvider } from "@context/EmailAccountContext";
import { MailServer } from "@features/mail-server/MailServer";

export const MailServerPage = () => {

  return (
    <EmailDataProvider>
      <MailServer />
  </EmailDataProvider>
);
};
