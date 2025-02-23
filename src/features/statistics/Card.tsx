import { Progressbar } from "@components/progress-bar/Progressbar";

import { HiOutlineDocumentChartBar, HiOutlinePaperAirplane } from "react-icons/hi2";
import styled, { css } from "styled-components";

type StyledCardProps = {
  color?: string;
  gradients?: string;
  type?: string;
  stats?: Record<string, number>;
};

const StyledCard = styled.div<StyledCardProps>`
  display: flex;
  flex-direction: column;
  border-radius: 1.2rem;
  position: relative;
  height: 96px;
  gap: 1rem;
  ${({ color, type }) =>
    type === "sm" &&
    css`
      min-width: 227px;
      max-width: auto;
      height: 60px;
      background: ${color && `var(--color-${color}-20)`};
      color: black;
      padding: 0.5rem 1.6rem;
    `}
  ${({ color, gradients, type }) =>
    type === "md" &&
    css`
      color: var(--color-white);
      padding: 12px 16px;
      background: ${color &&
      gradients &&
      `linear-gradient(to right, var(--color-${color}-50), var(--color-${gradients}))`};
      /* box-shadow: 0px 1px 0px rgba(103, 106, 162, 0.5); */
    `}
`;
const StyledCardHeader = styled.div`
  width: auto;
  display: flex;
  gap: 8px;
  align-items: center;
`;
type StyledIconBoxProps = {
  color?: string;
};
const StyledIconBox = styled.div<StyledIconBoxProps>`
  width: 3rem;
  height: 3rem;
  border-radius: 8px;
  padding: 6px;
  background-color: ${({ color }) => `var(--color-${color})`};
`;
const StyledCardContent = styled.div`
  font-size: 16px;
  font-weight: bold;
`;
type ShadowProps = {
  color: string;
};
const Shadow = styled.div<ShadowProps>`
  position: absolute;
  bottom: 0;
  width: 141px;
  height: 20px;
  /* box-shadow: 2px 10px 15px -6px rgba(103, 106, 162, 1); */
  box-shadow: 2px 10px 15px -6px ${({ color }) => getShadowColor(color)};
`;

// Function to get the shadow color dynamically
const getShadowColor = (color: string) => {
  const shadowColors: { [key: string]: string } = {
    black: "rgba(0, 0, 0, 0.5)",
    blue: "rgba(0, 0, 255, 0.5)",
    green: "rgba(0, 128, 0, 0.5)",
    pink: "rgba(255, 20, 147, 0.5)",
    orange: "rgba(255, 165, 0, 0.5)",
  };

  return shadowColors[color] || "rgba(0, 0, 0, 0.2)"; // Default to black shadow
};
type CardProps = {
  data: any;
  type?: string;
};

export const Card = ({ data, type }: CardProps) => {
  return (
    <StyledCard type={type} color={data.color} gradients={data.gradients}>
      <StyledCardHeader>
        {type === "md" && (
          <StyledIconBox color={data.gradients}>
            <HiOutlinePaperAirplane />
          </StyledIconBox>
        )}
        <span>{data.title}</span>
      </StyledCardHeader>
      <StyledCardContent>
        {/* <span>{data.repeatingInvoices ? data.repeatingInvoices : `${data.rate}%`}</span> */}
        <span>{data.stats}</span>
      </StyledCardContent>
      {type === "sm" && (
        <div
          style={{
            width: "5rem",
            height: "5rem",
            position: "absolute",
            right: "10px",
            display: "flex",
            justifycontent: "center",
            alignItems: "center",
          }}
        >
          {!data.repeatingInvoices ? (
            <Progressbar percentage={data.rate} />
          ) : (
            <HiOutlineDocumentChartBar size={26} />
          )}
        </div>
      )}

      <Shadow color={data.color} />
      {/* {type != "sm" && <StyledShadow shadowColor={data.color} />} */}
    </StyledCard>
  );
};
