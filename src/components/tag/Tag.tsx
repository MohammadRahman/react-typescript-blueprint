import styled, { css } from "styled-components";

type TagProps = {
  type: string;
  tagType?: string;
};

const Tag = styled.span<TagProps>`
  all: unset;
  width: fit-content;
  font-size: 12px;
  font-weight: 700;
  padding: 0rem 1rem;
  border-radius: 100px;
  color: var(--color-${props => props.type}-50);
  background-color: var(--color-${props => props.type}-100);

  ${props =>
    props.tagType &&
    props.tagType != "round" &&
    css`
      width: fit-content;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
    `}
`;

export default Tag;
