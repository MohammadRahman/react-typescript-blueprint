import { queryApi } from "@apis/query";
import { usequeryData } from "@context/QueryContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteQuery() {
  const queryClient = useQueryClient();
  const { queryData, setQueryData } = usequeryData();

  const { mutate: deleteQuery, isPending: isLoading } = useMutation({
    mutationFn: async (id: string) => {
      const response = await queryApi.deleteQuery(id);
      return response.data;
    },
    onSuccess: (_, id: string) => {
      if (queryData) {
        const updatedList = queryData?.list.filter(acc => acc.id != id);
        setQueryData({ ...queryData, list: updatedList });
      }
      toast("delete successful!");
      queryClient.invalidateQueries({ queryKey: ["QueryData"] });
    },
  });
  return { deleteQuery, isLoading };
}
