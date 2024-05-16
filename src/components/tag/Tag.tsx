import styled, { css } from "styled-components";

type TagProps = {
  type: string;
  tagType?: string;
};

const Tag = styled.span<TagProps>`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  /* Make these dynamic, based on the received prop */
  color: var(--color-${props => props.type}-700);
  background-color: var(--color-${props => props.type}-100);

  ${props =>
    props.tagType &&
    props.tagType != "round" &&
    css`
      width: fit-content;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
    `}
`;

export default Tag;
