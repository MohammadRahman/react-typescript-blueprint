import Button from "@components/button/Button";
import Tag from "@components/tag/Tag";
import styled from "styled-components";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 8rem 2fr 1fr 1fr;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

export const TodayItem = ({ data }) => {
  const statusToTagName = {
    sent: "green",
    failed: "red",
    draft: "yellow",
    spam: "blue",
  };
  return (
    <StyledTodayItem>
      <Tag type={statusToTagName[data.jobType]}>{data.jobType}</Tag>
      <span>{data.name}</span>
      <span>{data.total}</span>
      <Button size="small" variation="primary">
        {data.jobType}
      </Button>
    </StyledTodayItem>
  );
};
