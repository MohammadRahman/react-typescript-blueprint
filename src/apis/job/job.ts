import { BASE_URL, JOB_START, JOB_DETAILS, JOB_FILTER_LIST } from "@apis/api-routes";
import httpCommon from "@apis/http-common";
import { ApiResponse, PaginationPayload } from "@interface/common";
import { Job, JobDetails, StartJob } from "@interface/job";

const jobApi = httpCommon(BASE_URL);

/**
 * Start a new Job.
 * @param payload - The payload for starting a job.
 * @returns A promise that resolves to the started job.
 */
function startJob(payload: StartJob): Promise<ApiResponse<Job>> {
  return jobApi.post(JOB_START, payload);
}
/**
 * Fetches a list of jobs.
 * @param payload - Pagination properties (e.g., page, limit).
 * @param signal - Optional AbortSignal for request cancellation.
 * @returns A promise that resolves to an array of jobs.
 */
function getJobLists(
  payload: PaginationPayload,
  signal?: AbortSignal
): Promise<ApiResponse<Job[]>> {
  return jobApi.post(JOB_FILTER_LIST, payload, { signal });
}

/**
 * Finds an existing Job.
 * @param jobId - The Job id to find a specific job and get details.
 * @returns A promise that resolves to the found/not-found jobDetails [] || [].
 */
function findJobDetails(jobId: Pick<Job, "jobId">): Promise<ApiResponse<JobDetails[]>> {
  return jobApi.post(`${JOB_DETAILS}/${jobId}/details`);
}
// fix it once the endpoint is available
function deleteJob(jobId: string) {
  return jobApi.post(JOB_START, jobId);
}
// fix it once the endpoint is available
function updateJob(payload: Partial<Job>): Promise<ApiResponse<Job>> {
  return jobApi.put(JOB_START, payload);
}
export const jobService = {
  startJob,
  deleteJob,
  getJobLists,
  findJobDetails,
  updateJob,
};
