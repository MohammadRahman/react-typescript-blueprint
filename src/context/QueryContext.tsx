import { CollectionResponse } from "@interface/common";
import { Query } from "@interface/query";
import React, { createContext, ReactNode, useContext, useState } from "react";

type QueryListData = {
  list: any[];
  totalCount: number;
  isLoading: boolean;
  currentPage: number;
  queryResult?: { names: []; dataList: [] };
};

const QueryDataContext = createContext<{
  queryData: CollectionResponse<Query> | null;
  setQueryData: React.Dispatch<React.SetStateAction<CollectionResponse<Query> | null>>;
}>({
  queryData: null,
  setQueryData: () => {},
});

export const usequeryData = () => useContext(QueryDataContext);

type queryDataProps = {
  children: ReactNode;
};

export const QueryProvider = ({ children }: queryDataProps) => {
  const [queryData, setQueryData] = useState<CollectionResponse<Query> | null>({
    list: [],
    totalCount: 0,
    isLoading: false,
    currentPage: 0,
    queryResult: {
      names: [],
      dataList: [],
    },
  });
  return (
    <QueryDataContext.Provider value={{ queryData, setQueryData }}>
      {children}
    </QueryDataContext.Provider>
  );
};
