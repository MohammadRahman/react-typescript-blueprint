import { useRef, useState, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

type DropdownProps = {
  isOpen: boolean;
  children: ReactNode;
  triggerRef: React.RefObject<HTMLElement>;
};
type PositionType = {
  top: number;
  left: number;
};

export const Dropdown = ({ isOpen, children, triggerRef }: DropdownProps) => {
  const [position, setPosition] = useState<PositionType | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen && triggerRef?.current && dropdownRef?.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      const fitsBelow = viewportHeight - triggerRect.bottom > dropdownHeight;
      const fitsAbove = triggerRect.top > dropdownHeight;

      setPosition({
        top: fitsBelow
          ? triggerRect.bottom + window.scrollY
          : fitsAbove
            ? triggerRect.top - dropdownHeight + window.scrollY
            : triggerRect.bottom + window.scrollY, // Default to below if neither fully fits
        left: triggerRect.left + window.scrollX,
      });
    }
  }, [isOpen, triggerRef]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={dropdownRef}
      style={{
        position: "absolute",
        top: `${position?.top}px`,
        left: `${position?.left}px`,
        backgroundColor: "#fff",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "1rem",
        zIndex: 1000,
        width: "300px",
      }}
    >
      {children}
    </div>,
    document.body
  );
};
