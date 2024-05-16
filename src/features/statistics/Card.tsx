import { Progressbar } from "@components/progress-bar/Progressbar";

import React from "react";
import {
  HiOutlineDocumentChartBar,
  HiOutlinePaperAirplane,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi2";
import styled, { css } from "styled-components";

type StyledCardProps = {
  color?: string;
  gradients?: string;
  type?: string;
};
const hexToRgb = hex => {
  // Remove the hash sign if present
  hex = hex.replace("#", "");

  // Convert the hex to RGB
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
};

const StyledCard = styled.div<StyledCardProps>`
  display: flex;
  flex-direction: column;
  border-radius: 1.2rem;
  position: relative; /* Minimum width */
  gap: 1rem;
  max-width: calc(100% - gap / 5);
  ${props =>
    props.type === "sm" &&
    css`
      min-width: 227px;
      max-width: auto;
      height: 60px;
      background: ${({ color }) => `var(--color-${color}-20)`};
      color: black;
      padding: 0.5rem 1.6rem;
    `}
  ${props =>
    props.type === "md" &&
    css`
      min-width: 210px;
      max-width: calc(width - gap / 5);
      height: 96px;
      color: var(--color-white);
      padding: 12px 16px 12px 16px;
      background: ${({ color, gradients }) =>
        `linear-gradient(to right, var(--color-${color}-50), var(--color-${gradients}))`};
      /* box-shadow: 0px 2px 7px
        rgba(
          ${hexToRgb(props.gradients).r},
          ${hexToRgb(props.gradients).g},
          ${hexToRgb(props.gradients).b},
          0.75
        ); */
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
  shadowColor: string;
};
const StyledShadow = styled.div<ShadowProps>`
  width: 70%; // Adjust width as needed
  min-height: 4px;
  /* border: 1px solid black; */
  background: transparent;
  position: absolute;
  left: 50%; // Position horizontally at 50%
  transform: translateX(-50%); // Center horizontally
  bottom: 0;
  box-shadow: ${props => `0px 2px 7px rgba(var(--color-card-shadow-${props.shadowColor},0.04))`};
`;
type CardProps = {
  data: any;
  type?: string;
};
export const Card = ({ data, type }: CardProps) => {
  console.log(data);
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
        <span>{data.repeatingInvoices ? data.repeatingInvoices : `${data.rate}%`}</span>
      </StyledCardContent>
      {type === "sm" && (
        <div
          style={{
            width: "5rem",
            height: "5rem",
            position: "absolute",
            right: "10px",
            display: "flex",
            justifyContent: "center",
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
      {/* {type != "sm" && <StyledShadow shadowColor={data.color} />} */}
    </StyledCard>
  );
};
