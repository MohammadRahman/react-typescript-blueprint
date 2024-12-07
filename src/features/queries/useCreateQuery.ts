import { queryApi } from "@apis/query";
import { usequeryData } from "@context/QueryContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateQuery() {
  const queryClient = useQueryClient();
  const { setQueryData } = usequeryData();

  const { mutate: createQuery, isPending: isCreating } = useMutation({
    mutationKey: ["Query"],
    mutationFn: async (data: any) => {
      const response = await queryApi.createQuery(data);
      return response.data;
    },
    onSuccess: data => {
      setQueryData(prev => {
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
      queryClient.invalidateQueries({ queryKey: ["Source"] });
      toast.success("source created.");
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { createQuery, isCreating };
}
