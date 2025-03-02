import { Size, SizingMap } from "@interface/common";
import styled, { css } from "styled-components";

interface ButtonGroupProps {
  gap?: Size;
  content?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around";
  width?: string;
}

const ButtonGroup = styled.div<ButtonGroupProps>`
  display: flex;
  ${({ gap }) =>
    gap &&
    css`
      gap: ${SizingMap[gap]};
    `}
  justify-content: ${props => props.content || "flex-end"}; // Default is flex-end
  width: ${props => props.width || "100%"};
`;

export default ButtonGroup;
