import React from "react";
import styled from "styled-components";

const IconWrapper = styled.i<{ size: string | number; color?: string }>`
  font-size: ${({ size }) => (typeof size === "number" ? `${size}px` : size)};
`;

const StyledIconWrapper = styled(IconWrapper)<{ size: string | number; color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: ${({ size }) => (typeof size === "number" ? `${size}px` : size)};
  transition: all 0.3s;

  /* &:link,
  &:visited {
    color: var(--color-white);
    font-size: 1.2rem;
    font-weight: 500;
    padding: 1rem 2rem;
  } */

  /* &:hover,
  &:active {
    color: var(--color-grey-800);
    background-color: var(--color-green-200);
    border-radius: var(--border-radius-sm);
  } */
  /* & img {
    width: ${({ size }) => (typeof size === "number" ? `${size}px` : size)};
    height: ${({ size }) => (typeof size === "number" ? `${size}px` : size)};
    color: var(--color-white);
    transition: all 0.3s;

    &:hover,
    &:active {
      color: var(--color-black-100);
    }
  } */

  /* Icon inside */
  /* & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-white);
    transition: all 0.3s;
  } */

  /* &:hover svg,
  &:active svg { */
  /* color: var(--color-black-100); */
  /* color: ${({ color }) => color || "var(--color-black-100)"};
  } */
`;
// Define types for props
interface IconProps {
  name: string;
  size?: string | number;
  color?: string;
  library?: "react-icons" | "material-icons" | "custom";
}

// The main Icon component
const Icon: React.FC<IconProps> = ({ name, size = 20, color, library = "react-icons" }) => {
  if (library === "react-icons") {
    return <IconWrapper className={`fa fa-${name}`} size={size} color={color} />;
  }

  if (library === "material-icons") {
    return (
      <IconWrapper className="material-icons" size={size} color={color}>
        {name}
      </IconWrapper>
    );
  }

  if (library === "custom") {
    return (
      <StyledIconWrapper size={size} color={color}>
        <img
          src={`/src/assets/icons/${name}.png`}
          alt={name}
          style={{ width: size, height: size }}
        />
      </StyledIconWrapper>
    );
  }

  return null;
};

export default Icon;
