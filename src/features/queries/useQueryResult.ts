import { queryApi } from "@apis/query";
import { usequeryData } from "@context/QueryContext";
import { useMutation } from "@tanstack/react-query";

type QueryResultPayload = {
  sourceId: string;
  queryScript: string;
};

export function useQueryResult() {
  const { setQueryData } = usequeryData();

  const { mutate: getQueryResult, isPending: isLoading } = useMutation({
    mutationKey: ["Query-Result"],
    mutationFn: async (data: QueryResultPayload) => {
      const response = await queryApi.queryResult(data);
      setQueryData(prev => {
        if (!prev) {
          // If `prev` is null, initialize the state with the new `queryResult`
          return {
            list: [],
            totalCount: 0,
            isLoading: false,
            currentPage: 0,
            queryResult: response.data,
          };
        }
        // Otherwise, merge the existing state with the new `queryResult`
        return {
          ...prev,
          queryResult: response.data,
        };
      });
      return response.data;
    },
  });

  return { getQueryResult, isLoading };
}
