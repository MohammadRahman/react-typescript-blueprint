import { ReactNode } from "react";
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
  padding: 0.4rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
type FormRowVerticalProps = {
  label?: string;
  error?: any;
  children: ReactNode | any;
  style?: React.CSSProperties;
};
function FormRowVertical({ label, error, children, style }: FormRowVerticalProps) {
  return (
    <StyledFormRow style={style}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
