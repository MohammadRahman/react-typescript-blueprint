import styled from "styled-components";

type ContainerType = "round" | "square";

type IconContainerProps = {
  type?: ContainerType;
};

export const IconContainer = styled.div<IconContainerProps>`
  width: 32px;
  height: 32px;
  color: #797979;
  display: flex;
  border: 1px solid var(--color-grey-20);
  justify-content: center;
  align-items: center;
  border-radius: ${({ type }) => (type === "round" ? "50%" : "4px")};
`;
