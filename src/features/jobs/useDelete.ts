import { jobService } from "@apis/job";
import { useJobData } from "@context/JobContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDelete() {
  const { jobData, setJobData } = useJobData();
  const queryClient = useQueryClient();
  const { mutate: deleteJob, isPending: isDeleting } = useMutation({
    mutationKey: ["Jobs"],
    mutationFn: async (jobId: string) => {
      const response = await jobService.deleteJob(jobId);
      return response.data;
    },
    onSuccess: (_, jobId) => {
      if (jobData) {
        const updatedList = jobData?.list.filter(acc => acc.jobId != jobId);
        setJobData({ ...jobData, list: updatedList });
      }
      toast.success("entry delete successful");
      queryClient.invalidateQueries({ queryKey: ["Jobs"] });
    },
  });
  return { deleteJob, isDeleting };
}
