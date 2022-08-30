import styled, { css } from "styled-components";
import { CloseButton } from "../../ui/Buttons";
import Link from "next/link";
export const HeaderWrapper = styled.header`
  max-width: 192rem;
  padding-top: 2rem;
  height: 10rem;
  position: relative;
  transition: background-color 0.5s linear;

  ${({ isNavShown }) =>
    isNavShown &&
    css`
      height: 7rem;
      padding-top: 0;
      background-image: linear-gradient(
        to bottom,
        rgba(20, 20, 20, 0.8),
        rgba(20, 20, 20, 0.05)
      );
      background-color: transparent;
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
    `}
  ${({ stickyHeader }) =>
    stickyHeader &&
    css`
      background-color: rgba(20, 20, 20);
    `}
  z-index: 10;
`;
export const HeaderContent = styled.div`
  margin: 0 4%;
  ${({ isNavShown }) =>
    isNavShown &&
    css`
      height: 100%;
    `}
  display: flex;
  align-items: center;
  justify-content: space-between;
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${({ isNavShown }) =>
      isNavShown &&
      css`
        flex-grow: 1;
      `}
  }
`;
export const LogoWrapper = styled.div`
  height: 4.5rem;
  width: 16.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ isNavShown }) =>
    isNavShown &&
    css`
      height: 25px;
      width: 92.5px;
      @media (max-width: 30em) {
        height: 14px;
        width: 51.8px;
      }
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
`;

export const MenuList = styled.div`
  margin-right: auto;
  font-size: 1.4rem;
  @media (max-width: 68.75em) {
    font-size: 1.2rem;
  }

  ul {
    display: flex;
    align-items: center;
    li {
      margin-left: 20px;
      @media (max-width: 50em) {
        margin-left: 10px;
      }
    }
  }
`;
export const AccountTool = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
`;
//  search
export const SearchIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 11C13 13.7614 10.7614 16 8 16C5.23858 16 3 13.7614 3 11C3 8.23858 5.23858 6 8 6C10.7614 6 13 8.23858 13 11ZM14.0425 16.2431C12.5758 17.932 10.4126 19 8 19C3.58172 19 0 15.4183 0 11C0 6.58172 3.58172 3 8 3C12.4183 3 16 6.58172 16 11C16 11.9287 15.8417 12.8205 15.5507 13.6497L24.2533 18.7028L22.7468 21.2972L14.0425 16.2431Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
export const BellIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 4.57092C16.3922 5.05624 18.9998 7.9736 18.9998 11.5V15.2538C20.0486 15.3307 21.0848 15.4245 22.107 15.5347L21.8926 17.5232C18.7219 17.1813 15.409 17 11.9998 17C8.59056 17 5.27764 17.1813 2.10699 17.5232L1.89258 15.5347C2.91473 15.4245 3.95095 15.3307 4.99978 15.2538V11.5C4.99978 7.97345 7.6076 5.05599 11 4.57086V2H13V4.57092ZM8.62568 19.3712C8.6621 20.5173 10.1509 22 11.9993 22C13.8477 22 15.3365 20.5173 15.373 19.3712C15.38 19.1489 15.1756 19 14.9531 19H9.04555C8.82308 19 8.61862 19.1489 8.62568 19.3712Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
export const SearchButton = styled.button`
  cursor: pointer;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
`;
export const BellButton = styled.button`
  cursor: pointer;
`;

export const SearchInput = styled.input`
  width: 0px;
  height: 32px;
  border: none;
  outline: none;
  background-color: transparent;
  transition: all 0.4s ease-out;
  color: #eee;
  font-size: 1.6rem;
  ${({ showSearchBar }) =>
    showSearchBar &&
    css`
      width: 210px;
      transition-delay: 0.4s;
    `}
`;

export const SearchBox = styled.div`
  position: absolute;
  left: -14px;
  top: 0;
  transform: translateX(-100%);
  padding-left: 40px;
  border: 1px solid rgba(238, 238, 238, 0);
  transition: all 0.4s ease-out;

  ${({ showSearchBar }) =>
    showSearchBar &&
    css`
      border: 1px solid rgba(238, 238, 238, 1);
      background-color: rgba(0, 0, 0, 0.4);
      background-clip: border-box;
    `}
`;
export const ProfilesBox = styled.div`
  opacity: 0;
  height: 0;
  overflow: hidden;

  position: absolute;
  background-color: rgba(20, 20, 20, 0.8);
  top: 45px;
  left: -110px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 180px;
  padding: 0;
  transition: all 0.2s ease-in-out;

  button {
    padding: 0 15px 0 15px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    cursor: pointer;
    img {
      border-radius: 3px;
      overflow: hidden;
    }
    div {
      width: 30px;
      height: 30px;
      position: relative;
      background-color: transparent;
      svg {
        width: 95%;
        height: 95%;
      }
    }
    span {
      margin-left: 10px;
      font-size: 0.1rem;
    }
  }
  button:hover {
    span {
      text-decoration: underline;
    }
  }
  button:last-child {
    border-top: 1px solid #888;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export const SearchCloseButton = styled(CloseButton)`
  background-color: transparent;
  top: 0;
  right: 0;
`;
export const SelectedProfile = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  ::after {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #ddd;
    transition: transform 0.2s ease-out;
  }
  ::before {
    position: absolute;
    bottom: -10px;
    left: 25%;
    content: "";
    width: 0;
    height: 0;
    border: 0 solid transparent;
    opacity: 0;
  }

  img {
    border-radius: 3px;
  }
`;
export const ProfileWrapper = styled.div`
  cursor: pointer;
  position: relative;

  &:hover ${SelectedProfile} {
    &::after {
      transform: rotate(180deg);
    }
    &::before {
      opacity: 1;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 7px solid #ddd;
      transition: opacity 0.2s ease-in-out 200ms;
    }
  }

  &:hover ${ProfilesBox} {
    height: ${({ profilesNum }) => {
      return `${(profilesNum + 1) * 40 + 10}px`;
    }};
    max-height: 250px;
    opacity: 1;
    transition: opacity 0.2s cubic-bezier(1, 0, 1, 0.3) 200ms;
    border: 1px solid #888;
  }
`;
