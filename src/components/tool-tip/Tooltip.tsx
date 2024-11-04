import { ReactNode, cloneElement, createContext, useContext, useState } from "react";
import styled from "styled-components";

const TooltipContainer = styled.div`
  position: relative;
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
