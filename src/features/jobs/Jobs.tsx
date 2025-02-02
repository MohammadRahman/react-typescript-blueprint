import ButtonGroup from "@components/button-group/ButtonGroup";
import Button from "@components/button/Button";
import { Row } from "@components/row";
import { Card } from "@features/statistics/Card";
import { jobExecutaionCardData, jobsData } from "@mocks/data";
import { HiOutlineDocumentText, HiOutlinePlus } from "react-icons/hi2";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Modal } from "@components/modal";
import { CreateJobFrom } from "./CreateJobFrom";
import { useJobsList } from "./useJobLists";
import JobTable from "./JobTable";
import { useJobData } from "@context/JobContext";

export const Styledjobs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const StyledStatsCard = styled.div`
  width: 100%;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(5, 1fr);
`;
const formattedValues = {
  page: -1,
  pagesize: -1,
};

export const Jobs = () => {
  const jobStats = jobExecutaionCardData();
  const jobsDetails = jobsData();
  const { jobData } = useJobData();

  const [searchInput, setSearchInput] = useState("");
  const { jobLists } = useJobsList();
  const filterdJobs = jobsDetails.filter((job: any) => searchInput == job.id);

  const filteredJobs = searchInput != "" ? filterdJobs : jobsDetails;

  const colors = ["black", "blue", "pink", "green", "orange"];
  const cardTitle = [
    "Executed Job",
    "Total Recipients",
    "Most Contacted",
    "Highest Success",
    "Highest Failed",
  ];
  const totalRecipient = jobData?.list.forEach(job => {
    let num = 0;
    num += job.detailsCount;
    return num;
  });
  const highestSuccess = Math.max(...(jobData?.list.map(({ successCount }) => successCount) || []));
  const FailedSuccess = Math.max(...(jobData?.list.map(({ failCount }) => failCount) || []));

  const executedJobStats = [
    jobData?.list.length,
    totalRecipient || 0,
    0,
    highestSuccess,
    FailedSuccess,
  ];
  useEffect(() => {
    jobLists(formattedValues);
  }, []);

  return (
    <Styledjobs>
      <Row type="horizontal" style={{ justifyContent: "flex-end" }}>
        <ButtonGroup>
          <Button variation="outline" size="medium">
            <HiOutlineDocumentText />
            Generate Report
          </Button>
          <Modal>
            <Modal.Open opens="create-new-job">
              <Button variation="createNew" size="medium">
                <HiOutlinePlus />
                Create New Job
              </Button>
            </Modal.Open>
            <Modal.Window name="create-new-job">
              <CreateJobFrom />
            </Modal.Window>
          </Modal>
        </ButtonGroup>
      </Row>
      <StyledStatsCard>
        {colors.map((color, idx) => {
          const cardData = {
            color: color,
            gradients: `${color}gradient`,
            title: cardTitle[idx],
            stats: executedJobStats[idx],
          };
          return <Card key={idx} type="md" data={cardData} />;
        })}
      </StyledStatsCard>
      <JobTable />
    </Styledjobs>
  );
};
