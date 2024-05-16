import { ReactNode, cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const TooltipContainer = styled.div`
  position: relative;
`;
const StyledTooltipContent = styled.div`
  visibility: hidden;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px; /* Adjust as needed */
  opacity: 0;
  transition: opacity 0.3s;

  ${TooltipContainer}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;
interface TooltipContextProps {
  type?: "Top" | "Bottom" | "Left" | "Right";
  openName: string;
  show: (name: string) => void;
  hide: () => void;
}

const ToolTipContext = createContext<TooltipContextProps | undefined>(undefined);

type TooltipProps = {
  children: ReactNode;
};

export const Tooltip = ({ children }: TooltipProps) => {
  const [openName, setOpenName] = useState("");
  console.log(openName);

  const show = (name: string) => {
    setOpenName(name);
  };

  const hide = () => {
    setOpenName("");
  };

  return (
    <ToolTipContext.Provider value={{ openName, show, hide }}>{children}</ToolTipContext.Provider>
  );
};

type ToolTipButtonProps = {
  opens: string;
  children: ReactNode;
};
function Button({ children, opens }: ToolTipButtonProps) {
  const { show, openName, hide } = useContext(ToolTipContext) as TooltipContextProps;
  return (
    <>
      {cloneElement(children as any, { onMouseEnter: () => show(opens) })}
      {openName != "" ? (
        <TooltipContainer onMouseLeave={() => hide()}>{openName}</TooltipContainer>
      ) : null}
    </>
  );
}

// };
Tooltip.Button = Button;
