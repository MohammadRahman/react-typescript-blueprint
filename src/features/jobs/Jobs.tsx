import ButtonGroup from "@components/button-group/ButtonGroup";
import Button from "@components/button/Button";
import { Row } from "@components/row";
import { Search } from "@components/search/Search";
import { Card } from "@features/statistics/Card";
import { jobExecutaionCardData, jobsData } from "@mocks/data";
import { HiOutlineDocumentText, HiOutlinePlus } from "react-icons/hi2";
import { Table } from "@components/table";
import styled from "styled-components";
import { EcecutedJobRow } from "./EcecutedJobRow";
import { useState } from "react";

export const Styledjobs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: var(--color-grey-20);
`;
export const Jobs = () => {
  const jobStats = jobExecutaionCardData();
  const jobsDetails = jobsData();
  const [searchInput, setSearchInput] = useState("");

  const filterdJobs = jobsDetails.filter((job: any) => searchInput == job.id);

  const filteredJobs = searchInput != "" ? filterdJobs : jobsDetails;

  return (
    <Styledjobs>
      <Row type="horizontal">
        <div>
          <Search onChange={e => setSearchInput(e.target.value)} />
        </div>
        <ButtonGroup>
          <Button variation="outline" size="medium">
            <HiOutlineDocumentText />
            Generate Report
          </Button>
          <Button variation="createNew" size="medium">
            <HiOutlinePlus />
            Create New Report
          </Button>
        </ButtonGroup>
      </Row>
      <Row type="horizontal">
        {jobStats.map((job: any) => (
          <Card key={job.id} type="md" data={job} />
        ))}
      </Row>
      <Table columns="0.8fr 1fr 1fr 1fr 1fr 1.5fr 1.5fr 1fr">
        <Table.Header>
          <div>Execution ID</div>
          <div>Execution Date</div>
          <div>Job Name</div>
          <div>eMail Type</div>
          <div>Recipents</div>
          <div>Success Failed</div>
          <div>Status</div>
          <div>Actions</div>
        </Table.Header>
        <Table.Body
          data={filteredJobs}
          render={(job: any) => <EcecutedJobRow key={job.id} data={job} />}
        />
      </Table>
    </Styledjobs>
  );
};
