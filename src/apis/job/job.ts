import { JOB, JOB_DETAILS, JOB_FILTER_LIST } from "@apis/api-routes";
import { SearchParamsProps } from "@apis/email-template";
import { jobService as jobApi } from "@apis/jobService";

type jobPayload = {};

function startJob(jobData: any) {
  return jobApi.post(`${JOB}/start`, jobData);
}
function getJobLists(paginationProperties: SearchParamsProps, signal?: AbortSignal) {
  return jobApi.post(JOB_FILTER_LIST, paginationProperties, { signal });
}
function findJobDetails(jobId: string) {
  return jobApi.post(`${JOB_DETAILS}/${jobId}/details`);
}
function deleteJob(jobId: string) {
  return jobApi.post(`${JOB}/start`, jobId);
}
function updateJob(payload: jobPayload) {
  return jobApi.post(JOB, payload);
}
export const jobService = {
  startJob,
  deleteJob,
  getJobLists,
  findJobDetails,
  updateJob,
};
