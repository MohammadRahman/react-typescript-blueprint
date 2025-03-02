import ButtonGroup from "@components/button-group/ButtonGroup";
import Button from "@components/button/Button";
import { Row } from "@components/row";
import { Card } from "@features/statistics/Card";
import { HiOutlineDocumentText, HiOutlinePlus } from "react-icons/hi2";
import { useEffect } from "react";
import { Modal } from "@components/modal";
import { CreateJobFrom } from "./CreateJobFrom";
import { useJobsList } from "./useJobLists";
import JobTable from "./JobTable";
import { useJobData } from "@context/JobContext";
import { SHARED_CONSTANTS } from "@constants/common";
import { DEFAULT_FILTER_VALUES } from "@constants/source";
import { Grid } from "@components/grid/Grid";
import { Column } from "@components/column";

export const Jobs = () => {
  const { jobData } = useJobData();

  const { jobLists, isLoading, errorState } = useJobsList();

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
    jobLists(DEFAULT_FILTER_VALUES);
  }, []);

  return (
    <Column gap="lg">
      <Row type="horizontal" style={{ justifyContent: "flex-end" }}>
        <ButtonGroup gap="sm">
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
            <Modal.Window name="create-new-job" type="aside_mini">
              <CreateJobFrom />
            </Modal.Window>
          </Modal>
        </ButtonGroup>
      </Row>
      <Grid columns={5} gap="sm" responsive={{ md: 2, lg: 3, xl: 5, "2xl": 5 }}>
        {SHARED_CONSTANTS.COLORS.map((color, idx) => {
          const cardData = {
            color: color,
            gradients: `${color}gradient`,
            title: SHARED_CONSTANTS.CARD_TITLE[idx],
            stats: executedJobStats[idx],
          };
          return <Card key={idx} type="md" data={cardData} />;
        })}
      </Grid>
      <JobTable isLoading={isLoading || errorState.isLoading} />
    </Column>
  );
};
