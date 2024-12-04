import Heading from '@components/heading/Heading'
import { ReactNode } from 'react';
import styled from 'styled-components'

const StyledDropdownContainer = styled.div`

  width: 20rem;
  max-height: 25rem;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid var(--color-grey-100);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 5rem;
  right: 20px;
  z-index: 10;
  text-align: center;
  border-radius: 4px;
  padding: 1rem;
`;
const StyledUL = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

type DropdownProps = {
    children: ReactNode;
}

const Dropdown = ({children}: DropdownProps) => {
  return (
    <StyledDropdownContainer>
        <StyledUL>
            <Heading as="h2">Toggle Columns</Heading>
                {children}
        </StyledUL>
    </StyledDropdownContainer>
  )
}



export default Dropdown