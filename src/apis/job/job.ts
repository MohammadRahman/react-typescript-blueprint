import { JOB, JOB_DETAILS, JOB_FILTER_LIST } from "@apis/api-routes";
import { SearchParamsProps } from "@apis/email-template";
import { jobService as jobApi } from "@apis/jobService";

function startJob(jobData: any) {
  return jobApi.post(`${JOB}/start`, jobData);
}
function getJobLists(paginationProperties: SearchParamsProps, signal?: AbortSignal) {
  return jobApi.post(JOB_FILTER_LIST, paginationProperties, { signal });
}
function findJobDetails(jobId: string) {
  return jobApi.post(`${JOB_DETAILS}/{jobId}/details`);
}
export const jobService = {
  startJob,
  getJobLists,
  findJobDetails,
};
