import styled from "styled-components";

const StyledLogo = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;
interface LogoProps {
  collapse: boolean;
}
export const Logo = ({ collapse }: LogoProps) => {
  return (
    <StyledLogo>
      {collapse ? (
        <>
          <img width="111px" height="40px" src="/images/logo/brand-log.svg" alt="brand_logo" />
        </>
      ) : (
        <img width="60px" height="60px" src="/images/logo/basilinq_logo.jpeg" alt="brand_logo" />
      )}
    </StyledLogo>
  );
};
