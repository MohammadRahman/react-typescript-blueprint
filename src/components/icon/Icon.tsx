import React from "react";
import styled from "styled-components";

// Styled wrapper for custom styles
const IconWrapper = styled.i<{ size: string | number; color?: string }>`
  font-size: ${({ size }) => (typeof size === "number" ? `${size}px` : size)};
  /* color: ${({ color }) => color || "inherit"}; */
`;

const StyledIconWrapper = styled(IconWrapper)<{ size: string | number; color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: ${({ size }) => (typeof size === "number" ? `${size}px` : size)};
  /* color: ${({ color }) => color || "inherit"}; */
  transition: all 0.3s;

  /* Apply styles similar to StyledNavLink */
  &:link,
  &:visited {
    color: var(--color-white);
    font-size: 1.2rem;
    font-weight: 500;
    padding: 1rem 2rem;
  }

  &:hover,
  &:active {
    color: var(--color-grey-800);
    background-color: var(--color-green-200);
    border-radius: var(--border-radius-sm);
  }
  & img {
    width: ${({ size }) => (typeof size === "number" ? `${size}px` : size)};
    height: ${({ size }) => (typeof size === "number" ? `${size}px` : size)};
    color: var(--color-white);
    transition: all 0.3s;
    /* transition: filter 0.3s; */

    /* Simulate color change for images on hover */
    &:hover,
    &:active {
      color: var(--color-black-100);
      /* filter: brightness(0) saturate(100%) invert(48%) sepia(97%) saturate(751%) hue-rotate(340deg)
        brightness(98%) contrast(90%); */
    }
  }

  /* Icon inside */
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-white);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg {
    color: var(--color-black-100);
  }
`;
// Define types for props
interface IconProps {
  name: string; // Icon name
  size?: string | number; // Size of the icon
  color?: string; // Color of the icon (optional)
  library?: "react-icons" | "material-icons" | "custom"; // Specify the icon library
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

  // Custom library or assets (assuming they are SVGs in the /assets/icons folder)
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

  console.error(`Icon library "${library}" is not supported.`);
  return null;
};

export default Icon;
