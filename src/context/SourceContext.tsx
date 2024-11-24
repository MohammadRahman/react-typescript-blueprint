import React, { createContext, ReactNode, useContext, useState } from 'react';

type SourceListData = {
  list: any[];
  totalCount: number;
  isLoading: boolean;
  currentPage: number;
};

const SourceDataContext = createContext<{
  sourceData: SourceListData | null;
  setSourceData: React.Dispatch<React.SetStateAction<SourceListData | null>>;
}>({
  sourceData: null,
  setSourceData: () => {},
});

export const useSourceData = () => useContext(SourceDataContext);

type SourceDataProps = {
  children: ReactNode;
};

export const SourceProvider = ({ children }: SourceDataProps) => {
  const [sourceData, setSourceData] = useState<SourceListData | null>({
    list: [],
    totalCount: 0,
    isLoading: false,
    currentPage: 0,
  });
  return (
    <SourceDataContext.Provider value={{ sourceData, setSourceData }}>
      {children}
    </SourceDataContext.Provider>
  );
};