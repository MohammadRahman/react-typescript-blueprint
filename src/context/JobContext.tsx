import React, { createContext, ReactNode, useContext, useState } from "react";

type JobListData = {
  list: any[];
  totalCount: number;
  isLoading: boolean;
  currentPage: number;
};

const JobDataContext = createContext<{
  jobData: JobListData | null;
  setJobData: React.Dispatch<React.SetStateAction<JobListData | null>>;
}>({
  jobData: null,
  setJobData: () => {},
});

export const useJobData = () => useContext(JobDataContext);

type jobDataProps = {
  children: ReactNode;
};

export const JobProvider = ({ children }: jobDataProps) => {
  const [jobData, setJobData] = useState<JobListData | null>({
    list: [],
    totalCount: 0,
    isLoading: false,
    currentPage: 0,
  });
  return (
    <JobDataContext.Provider value={{ jobData, setJobData }}>{children}</JobDataContext.Provider>
  );
};
