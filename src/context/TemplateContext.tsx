import { CollectionResponse } from "@interface/common";
import { TemplatePayload } from "@interface/email";
import React, { createContext, ReactNode, useContext, useState } from "react";

/**
 * Context for managing template data.
 */
const TemplateContext = createContext<{
  template: CollectionResponse<TemplatePayload> | null;
  setTemplateData: React.Dispatch<React.SetStateAction<CollectionResponse<TemplatePayload> | null>>;
}>({
  template: null,
  setTemplateData: () => {},
});

/**
 * Hook to access the template context.
 */
export const useTemplateData = () => useContext(TemplateContext);

type EmailDataProps = {
  children: ReactNode;
};

/**
 * Provider component for the template context.
 */
export const TemplateProvider = ({ children }: EmailDataProps) => {
  const [template, setTemplateData] = useState<CollectionResponse<TemplatePayload> | null>({
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
