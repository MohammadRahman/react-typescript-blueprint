import { useRef, useCallback } from "react";

function useScrollController() {
  const scrollPositionRef = useRef<number>(0);

  const saveScrollPosition = useCallback((element: HTMLElement) => {
    scrollPositionRef.current = element.scrollTop;
  }, []);

  const restoreScrollPosition = useCallback((element: HTMLElement) => {
    element.scrollTo({ top: scrollPositionRef.current, behavior: "smooth" });
  }, []);

  return { saveScrollPosition, restoreScrollPosition };
}

export default useScrollController;
