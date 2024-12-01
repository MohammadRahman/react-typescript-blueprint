import React, { createContext, ReactNode, useContext, useState } from 'react';

type TemplateListData = {
  list: any[];
  totalCount: number;
  isLoading: boolean;
  currentPage: number;
};

const TemplateContext = createContext<{
  template: TemplateListData | null;
  setTemplateData: React.Dispatch<React.SetStateAction<TemplateListData | null>>;
}>({
  template: null,
  setTemplateData: () => {},
});

export const useTemplateData = () => useContext(TemplateContext);

type EmailDataProps = {
  children: ReactNode;
};

export const TemplateProvider = ({ children }: EmailDataProps) => {
  const [template, setTemplateData] = useState<TemplateListData | null>({
    list: [],
    totalCount: 0,
    isLoading: false,
    currentPage: 0,
  });

  return (
    <TemplateContext.Provider value={{ template, setTemplateData }}>
      {children}
    </TemplateContext.Provider>
  );
};