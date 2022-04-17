import styled from "styled-components";
import Link from "next/link";
export const HeaderWrapper = styled.header`
  max-width: 192rem;
  padding-top: 2rem;
  height: 10rem;
  /* background-color: transparent; */
`;
export const HeaderContent = styled.div`
  margin: 0 5.6rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const LogoWrapper = styled.div`
  padding-top: 0.8rem;
  height: 4.5rem;
  width: 16.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
  }
`;

const LinkN = ({ href, className, children }) => {
  return (
    <Link href={href} passHref className={className}>
      <a className={className}> {children}</a>
    </Link>
  );
};

export const StyledLink = styled(LinkN)``;
export const FooterLink = styled(LinkN)`
  color: inherit;
  a {
    font-family: inherit;
  }
`;
export const ButtonLink = styled(LinkN)`
  background-color: ${({ theme }) => theme.accentColor};
  padding: 0.7rem 1.7rem;
  border-radius: 0.3rem;
  /* cursor: pointer; */
`;
