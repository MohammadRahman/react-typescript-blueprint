import { useEmailTemplate } from "./useEmailTemplate";
import { useEffect } from "react";
import TemplateTable from "./TemplateTable";
import { DEFAULT_FILTER_VALUES } from "@constants/source";
import { Container } from "@components/container/Container";
import { Column } from "@components/column";
import PageHeader from "./PageHeader";

export const EmailTemplate = () => {
  const { templateLists, errorState, isLoading } = useEmailTemplate();

  useEffect(() => {
    templateLists(DEFAULT_FILTER_VALUES);
  }, []);

  return (
    <Container>
      <Column gap="md">
        <PageHeader />
        <TemplateTable isLoading={isLoading || errorState.isLoading} />
      </Column>
    </Container>
  );
};
