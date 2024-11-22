import React, { createContext, ReactNode, useContext, useState } from 'react';

type EmailListData = {
  list: any[];
  totalCount: number;
  isLoading: boolean;
  currentPage: number;
};

const EmailDataContext = createContext<{
  emailData: EmailListData | null;
  setEmailData: React.Dispatch<React.SetStateAction<EmailListData | null>>;
}>({
  emailData: null,
  setEmailData: () => {},
});

export const useEmailData = () => useContext(EmailDataContext);

type EmailDataProps = {
  children: ReactNode;
};

export const EmailDataProvider = ({ children }: EmailDataProps) => {
  const [emailData, setEmailData] = useState<EmailListData | null>({
    list: [],
    totalCount: 0,
    isLoading: false,
    currentPage: 0,
  });

  return (
    <EmailDataContext.Provider value={{ emailData, setEmailData }}>
      {children}
    </EmailDataContext.Provider>
  );
};