import { jobService } from "@apis/job";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export function useJobDetails() {
  const [jobDetailsData, setJobDetailsData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("jobDetailsData", jobDetailsData);
  const { mutate: jobDetails } = useMutation({
    mutationKey: ["Job_Details"],
    mutationFn: async (jobId: string) => {
      try {
        if (!jobId) return;
        setLoading(true);
        const response = await jobService.findJobDetails(jobId);
        setJobDetailsData(response.data);
        setLoading(false);
        // return response.data;
      } catch (error: any) {
        toast.error(error.message);
      }
    },
  });
  return { jobDetails, loading, jobDetailsData };
}
