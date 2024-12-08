import { useLayoutEffect, useRef } from "react";

export const useDisableAutocomplete = (inputName: string = "search") => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useLayoutEffect(() => {
    const inputEl = inputRef.current;
    if (inputEl) {
      inputEl.setAttribute("autocomplete", "off");
      inputEl.setAttribute("name", inputName);
    }
  }, [inputName]);

  return inputRef;
};
