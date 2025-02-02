import { jobService } from "@apis/job";
import { useJobData } from "@context/JobContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export function useCreateEmailJob() {
  const queryClient = useQueryClient();
  const { setJobData } = useJobData();

  const { mutate: job, isPending: isCreating } = useMutation({
    mutationKey: ["Job"],
    mutationFn: async (data: any) => {
      console.log("data received in hook", data);
      try {
        const response = await jobService.startJob(data);
        return response.data;
      } catch (error: AxiosError | any) {
        const errorDetails = {
          title: "Error",
          message: "An unknown error occurred",
          statusCode: error.response?.status || 500,
        };

        if (error.response && error.response.data && error.response.data.errors) {
          const errorMessages = Object.values(error.response.data.errors).flat();
          errorDetails.message = errorMessages.join(", ");
        } else if (error.message) {
          errorDetails.message = error.message;
        }
        toast.error(`${errorDetails.title} 🚨,\n${errorDetails.message}`);
        throw error;
      }
    },
    onSuccess: data => {
      setJobData(prev => {
        if (!prev) {
          return {
            list: [data],
            totalCount: 1,
            isLoading: false,
            currentPage: 1,
          };
        }
        return {
          ...prev,
          list: [...prev.list, data],
          totalCount: prev.totalCount + 1,
        };
      });
      queryClient.invalidateQueries({ queryKey: ["Job"] });
      toast.success("Job created.");
    },
    onError: error => {
      toast.error(error.message);
    },
  });
  return { job, isCreating };
}
