import { jobService } from "@apis/job";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export function useJobDetails() {
  const [jobDetailsData, setJobDetailsData] = useState([]);
  const { mutate: jobDetails } = useMutation({
    mutationKey: ["Job_Details"],
    mutationFn: async (jobId: string) => {
      try {
        const response = await jobService.findJobDetails(jobId);
        if (response.data) {
          setJobDetailsData(response.data);
        }
        return response;
      } catch (error: any) {
        toast.error(error.message);
      }
    },
  });
  return { jobDetails, jobDetailsData };
}
