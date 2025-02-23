import { DEFAULT_FILTER_VALUES } from "@constants/source";
import { useState, useCallback } from "react";

interface IGetList {
  values: any;
}

export const useGetLists = ({ values }: IGetList) => {
  const [hasFetched, setHasFetched] = useState(false);

  const fetchOptionLists = useCallback(() => {
    values(DEFAULT_FILTER_VALUES);
    setHasFetched(true);
  }, [hasFetched]);

  return fetchOptionLists;
};
