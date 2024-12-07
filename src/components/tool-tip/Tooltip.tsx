import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  cloneElement,
  ReactElement,
} from "react";
import styled from "styled-components";

// Tooltip Container Style with border, box shadow, and spike
const TooltipContainer = styled.div<{ position: "Top" | "Bottom" | "Left" | "Right" }>`
  position: absolute;
  background-color: white;
  color: black;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 10;
  visibility: visible;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
  border: 1px solid #ccc; // Slight gray border
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // Soft shadow for better appearance

  ${({ position }) => {
    switch (position) {
      case "Top":
        return `
          bottom: 105%;
          left: 50%;
          transform: translateX(-50%);
          &::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: white transparent transparent transparent;
          }
        `;
      case "Bottom":
        return `
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          &::after {
            content: '';
            position: absolute;
            bottom: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent white transparent;
          }
        `;
      case "Left":
        return `
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            right: 100%;
            margin-top: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent transparent white;
          }
        `;
      case "Right":
        return `
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 100%;
            margin-top: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent transparent white;
          }
        `;
      default:
        return "";
    }
  }}
`;

// Tooltip Context to manage tooltip state
interface TooltipContextProps {
  openName: string;
  show: (name: string) => void;
  hide: () => void;
}

const TooltipContext = createContext<TooltipContextProps | undefined>(undefined);

// Tooltip Provider Component
type TooltipProps = {
  children: ReactNode;
};

export const Tooltip = ({ children }: TooltipProps) => {
  const [openName, setOpenName] = useState("");

  const show = (name: string) => {
    setOpenName(name);
  };

  const hide = () => {
    setOpenName("");
  };

  return (
    <TooltipContext.Provider value={{ openName, show, hide }}>{children}</TooltipContext.Provider>
  );
};

// Button that triggers the tooltip
type ToolTipButtonProps = {
  opens: string;
  position?: "Top" | "Bottom" | "Left" | "Right";
  children: ReactNode;
};

function Button({ children, opens, position = "Top" }: ToolTipButtonProps) {
  const { show, openName, hide } = useContext(TooltipContext) as TooltipContextProps;

  // Extracting the text content from children
  const textContent = React.Children.toArray(children)
    .map(child => {
      return typeof child === "string" ? child : (child as React.ReactElement).props.children;
    })
    .join("");

  return (
    <div
      onMouseEnter={() => show(opens)}
      onMouseLeave={hide}
      style={{ display: "inline-block", position: "relative" }}
    >
      {/* Directly render the children without affecting styles */}
      {children}
      {openName === opens && (
        <TooltipContainer position={position}>
          {/* Show only the extracted text */}
          {textContent}
        </TooltipContainer>
      )}
    </div>
  );
}

Tooltip.Button = Button;

// Tooltip Container Style
// const TooltipContainer = styled.div<{ position: 'Top' | 'Bottom' | 'Left' | 'Right' }>`
//   position: absolute;
//   background-color: transparent;
//   color: black;
//   padding: 5px;
//   border-radius: 4px;
//   font-size: 12px;
//   z-index: 10;
//   visibility: visible; /* Ensure visibility is set to visible */
//   opacity: 1; /* Tooltip becomes fully visible */
//   transition: opacity 0.2s ease-in-out;

//   ${({ position }) => {
//     switch (position) {
//       case 'Top':
//         return `
//           bottom: 105%;
//           left: 50%;
//           transform: translateX(-50%);
//         `;
//       case 'Bottom':
//         return `
//           top: 100%;
//           left: 50%;
//           transform: translateX(-50%);
//         `;
//       case 'Left':
//         return `
//           right: 100%;
//           top: 50%;
//           transform: translateY(-50%);
//         `;
//       case 'Right':
//         return `
//           left: 100%;
//           top: 50%;
//           transform: translateY(-50%);
//         `;
//       default:
//         return '';
//     }
//   }}
// `;

// // Tooltip Context to manage tooltip state
// interface TooltipContextProps {
//   openName: string;
//   show: (name: string) => void;
//   hide: () => void;
// }

// const TooltipContext = createContext<TooltipContextProps | undefined>(undefined);

// // Tooltip Provider Component
// type TooltipProps = {
//   children: ReactNode;
// };

// export const Tooltip = ({ children }: TooltipProps) => {
//   const [openName, setOpenName] = useState('');

//   const show = (name: string) => {
//     setOpenName(name);
//   };

//   const hide = () => {
//     setOpenName('');
//   };

//   return (
//     <TooltipContext.Provider value={{ openName, show, hide }}>
//       {children}
//     </TooltipContext.Provider>
//   );
// };

// // Button that triggers the tooltip
// type ToolTipButtonProps = {
//   opens: string;
//   position?: 'Top' | 'Bottom' | 'Left' | 'Right';
//   children: ReactNode;
// };

// function Button({ children, opens, position = 'Top' }: ToolTipButtonProps) {
//   const { show, openName, hide } = useContext(TooltipContext) as TooltipContextProps;
//  // Extracting the text content from children
//  const textContent = React.Children.toArray(children).map(child => {
//   return typeof child === 'string' ? child : (child as ReactElement).props.children;
// }).join('');

//   return (
//     <div
//       onMouseEnter={() => show(opens)}
//       onMouseLeave={hide}
//       style={{ display: 'inline-block', position: 'relative' }}
//     >
//       {cloneElement(children as any)}
//       {openName === opens && (
//         <TooltipContainer position={position}>
//           {/* Show content of the tooltip */}
//           {textContent}
//         </TooltipContainer>
//       )}
//     </div>
//   );
// }

// Tooltip.Button = Button;

// import { ReactNode, cloneElement, createContext, useContext, useState } from "react";
// import styled from "styled-components";

// const TooltipContainer = styled.div`
//   position: relative;
// `;

// interface TooltipContextProps {
//   type?: "Top" | "Bottom" | "Left" | "Right";
//   openName: string;
//   show: (name: string) => void;
//   hide: () => void;
// }
// interface TooltipContextProps {
//   type?: "Top" | "Bottom" | "Left" | "Right";
//   tooltip: { name: string; content: string };
//   show: (name: string, content: string) => void;
//   hide: () => void;
// }

// const ToolTipContext = createContext<TooltipContextProps | undefined>(undefined);

// type TooltipProps = {
//   children: ReactNode;
// };

// export const Tooltip = ({ children }: TooltipProps) => {
//   const [openName, setOpenName] = useState("");
//   console.log(openName);

//   const show = (name: string) => {
//     setOpenName(name);
//   };

//   const hide = () => {
//     setOpenName("");
//   };

//   return (
//     <ToolTipContext.Provider value={{ openName, show, hide }}>{children}</ToolTipContext.Provider>
//   );
// };

// type ToolTipButtonProps = {
//   opens: string;
//   children: ReactNode;
// };
// function Button({ children, opens }: ToolTipButtonProps) {
//   const { show, openName, hide } = useContext(ToolTipContext) as TooltipContextProps;
//   return (
//     <>
//       {cloneElement(children as any, { onMouseEnter: () => show(opens) })}
//       {openName != "" ? (
//         <TooltipContainer onMouseLeave={() => hide()}>{openName}</TooltipContainer>
//       ) : null}
//     </>
//   );
// }

// // };
// Tooltip.Button = Button;
