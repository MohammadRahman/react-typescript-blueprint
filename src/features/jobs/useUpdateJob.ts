import { useJobData } from "@context/JobContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jobService as jobApi } from "@apis/job";
import toast from "react-hot-toast";
export function useUpdateJob() {
  const queryClient = useQueryClient();
  const { setJobData } = useJobData();

  const { mutate: updateJob, isPending: isUpdating } = useMutation({
    mutationKey: ["SourceAccount"],
    mutationFn: async (data: any) => {
      const response = await jobApi.updateJob(data);
      return response.data;
    },
    onSuccess: updatedAccount => {
      toast.success("update successful.");
      queryClient.invalidateQueries({ queryKey: ["SourceAccount"] });

      setJobData(prevData => {
        if (!prevData) return null;

        const updatedList = prevData.list.map(ac =>
          ac.id === updatedAccount.id ? updatedAccount : ac
        );
        return {
          ...prevData,
          list: updatedList,
          totalCount: prevData.totalCount,
        };
      });
    },
    onError: error => {
      toast.error(error.message);
    },
  });
  return { updateJob, isUpdating };
}
