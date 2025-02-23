import { queryApi } from "@apis/query";
import { useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

export function useFindQueryFields() {
  const [queryFiledData, setQueryFields] = useState<string[]>([]);

  const { mutate: queryFields, isPending: isFetching } = useMutation({
    mutationKey: ["Query-Fields"],
    mutationFn: async (id: string) => {
      const response = await queryApi.getQueryFields(id);
      setQueryFields(response.data);
      return response.data;
    },
    onError: error => {
      toast.error(error.message);
    },
  });
  return { queryFields, queryFiledData, isFetching };
}
