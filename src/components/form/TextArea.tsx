import styled from "styled-components";
import { useRef } from "react";

type TextareaProps = {
  isFullScreen?: boolean;
  highlightingWord?: string;
  onChange: any;
  value: string;
};

const sqlKeywordColors: Record<string, string> = {
  SELECT: "#ff5733",
  FROM: "#33ff57",
  WHERE: "#3357ff",
  INSERT: "#ff33a8",
  INTO: "#ff8833",
  VALUES: "#ffcc33",
  UPDATE: "#33ffaa",
  SET: "#a833ff",
  DELETE: "#ff3333",
  CREATE: "#33bbff",
  TABLE: "#9933ff",
  DROP: "#ff6633",
  ALTER: "#ff3388",
  ADD: "#33ffaa",
  JOIN: "#ff33ff",
  LEFT: "#3399ff",
  RIGHT: "#ff9933",
  INNER: "#66ff33",
  OUTER: "#ff33aa",
  GROUP: "#ffdd33",
  BY: "#ff8833",
  ORDER: "#cc33ff",
  HAVING: "#33ddff",
  DISTINCT: "#ff3377",
  AS: "#ffcc33",
  LIMIT: "#33ffcc",
  OFFSET: "#33ccff",
  UNION: "#ff7733",
  CASE: "#ff3377",
  WHEN: "#33ff77",
  THEN: "#ff55aa",
  ELSE: "#aa33ff",
  END: "#33aa77",
  AND: "#ff6633",
  OR: "#ff3366",
  NOT: "#ff55ff",
  NULL: "#999999",
  TRUE: "#33ffaa",
  FALSE: "#ff3333",
  PRIMARY: "#ffaa33",
  KEY: "#ff8833",
  FOREIGN: "#ff77cc",
  CHECK: "#ffcc33",
  DEFAULT: "#33aaff",
  INDEX: "#cc33ff",
  CONSTRAINT: "#ff6633",
  REFERENCES: "#ffaa33",
  UNIQUE: "#ff3377",
  AUTO_INCREMENT: "#33ff77",
  COMMENT: "#aaaaaa",
  VARCHAR: "#ff55aa",
  INT: "#ff7733",
  TEXT: "#ffcc33",
  DATE: "#33ffcc",
  TIMESTAMP: "#3399ff",
};

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Highlighted = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* min-height: 40rem;
  max-height: 80rem; */
  overflow-y: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  padding: 0.5rem;
  font-size: 14px;
  font-family: monospace;
  color: black;
  z-index: 1;
`;

const StyledTextarea = styled.textarea<TextareaProps>`
  width: 100%;
  /* min-height: 40rem;
  max-height: 80rem; */
  resize: none;
  /* need set padding 0.5 if you want to display colorful keywords */
  /* padding: 0.5rem; */
  padding-left: 2rem;
  border: none;
  font-size: 14px;
  font-family: monospace;
  color: black;
  background: transparent;
  caret-color: var(--color-primary);
  position: relative;
  z-index: 2;
  &:focus {
    outline: none;
  }
`;

const highlightSQL = (query: string) => {
  return query.replace(
    /\b(SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|DROP|ALTER|ADD|JOIN|LEFT|RIGHT|INNER|OUTER|GROUP|BY|ORDER|HAVING|DISTINCT|AS|LIMIT|OFFSET|UNION|CASE|WHEN|THEN|ELSE|END|AND|OR|NOT|NULL|TRUE|FALSE|PRIMARY|KEY|FOREIGN|CHECK|DEFAULT|INDEX|CONSTRAINT|REFERENCES|UNIQUE|AUTO_INCREMENT|COMMENT|VARCHAR|INT|TEXT|DATE|TIMESTAMP)\b/gi,
    match => {
      const color = sqlKeywordColors[match.toUpperCase()];
      return `<span style="color: ${color}; font-weight: bold;">${match}</span>`;
    }
  );
};

const TextareaComponent = ({ isFullScreen, onChange, value }: TextareaProps) => {
  const highlightedRef = useRef<HTMLDivElement>(null);
  return (
    <Container>
      {/* <Highlighted ref={highlightedRef} dangerouslySetInnerHTML={{ __html: highlightSQL(value) }} /> */}
      <StyledTextarea name={value} isFullScreen={isFullScreen} value={value} onChange={onChange} />
    </Container>
  );
};

export default TextareaComponent;
