import styled, { css } from "styled-components";
import Link from "next/link";
export const HeaderWrapper = styled.header`
  max-width: 192rem;
  padding-top: 2rem;
  height: 10rem;
  position: relative;
  z-index: 10;
  /* background-color: transparent; */
`;
export const HeaderContent = styled.div`
  margin: 0 5.6rem;
  /* position: fixed; */
  ${({ pathname }) =>
    pathname.startsWith("/browse") &&
    css`
      /* position: fixed; */
    `}
  display: flex;
  align-items: center;
  justify-content: space-between;
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* ${({ pathname }) => console.log(pathname)} */
    //in this case we can get access to the pathname. but we can't get
    //access to this variant in LogoWrapper if we dont't pass in.
    ${({ pathname }) =>
      pathname.startsWith("/browse") &&
      css`
        flex-grow: 1;
      `}
  }
`;
export const LogoWrapper = styled.div`
  /* padding-top: 0.8rem; */
  height: 4.5rem;
  width: 16.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-right: auto; */
  ${({ pathname }) =>
    pathname.startsWith("/browse") &&
    css`
      height: 25px;
      width: 92.5px;
    `}
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

export const StyledLink = styled(LinkN)`
  color: #e5e5e5;
  &:hover {
    color: #b3b3b3;
  }
`;
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

export const MenuList = styled.div`
  margin-right: auto;
  font-size: 14px;
  ul {
    display: flex;
    align-items: center;
    li {
      margin-left: 20px;
    }
  }
`;
export const AccountTool = styled.div``;
