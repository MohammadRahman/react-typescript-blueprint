import { useCallback, useState } from "react";

interface ErrorState {
  isLoading: boolean;
  message: string;
}

export function useErrorHandler(initialState: ErrorState = { isLoading: false, message: "" }) {
  const [errorState, setErrorState] = useState<ErrorState>(initialState);

  const showErrorWithDelay = useCallback(
    (message: string = "Network Error! Please try again.", delay: number = 3000) => {
      setErrorState({ isLoading: true, message: "" });
      setTimeout(() => {
        setErrorState({ isLoading: false, message });
      }, delay);
    },
    []
  );

  return { errorState, showErrorWithDelay };
}
