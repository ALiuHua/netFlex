import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import {
  HeaderWrapper,
  HeaderContent,
  LogoWrapper,
  StyledLink,
  ButtonLink,
  MenuList,
  AccountTool,
  BellButton,
  BellIcon,
  ProfileWrapper,
} from "./HeaderStyle";
import Search from "./Search";
const Header = () => {
  console.log("header running");
  const [stickyHeader, setStickHeader] = useState(false);
  const router = useRouter();
  const { pathname } = router;
  const isNavShown =
    pathname.includes("/browse") ||
    pathname.includes("/search") ||
    pathname.includes("/mylist");
  useEffect(() => {
    // sticky header and background-color change
    const scrollHandler = () => {
      if (window.scrollY > 2) {
        setStickHeader(true);
      } else {
        setStickHeader(false);
      }
    };
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  return (
    <HeaderWrapper isNavShown={isNavShown} stickyHeader={stickyHeader}>
      <HeaderContent isNavShown={isNavShown}>
        <LogoWrapper isNavShown={isNavShown}>
          {pathname === "/" ? (
            <img src="/images/misc/logo.png" />
          ) : (
            <StyledLink href="/">
              <img src="/images/misc/logo.png" />
            </StyledLink>
          )}
        </LogoWrapper>
        <nav>
          {isNavShown && (
            <>
              <MenuList>
                <ul>
                  <li>
                    <StyledLink href="/browse">Home</StyledLink>
                  </li>
                  <li>
                    <StyledLink href="/browse/tv">TV Shows</StyledLink>
                  </li>
                  <li>
                    <StyledLink href="/browse/movie">Films</StyledLink>
                  </li>
                  <li>
                    <StyledLink href="/mylist">My List</StyledLink>
                  </li>
                </ul>
              </MenuList>
              <AccountTool>
                <Search pathname={pathname} router={router} />
                <BellButton>
                  <BellIcon />
                </BellButton>
                <ProfileWrapper>
                  <p onClick={() => signOut({ callbackUrl: "/login" })}>我</p>
                </ProfileWrapper>
              </AccountTool>
            </>
          )}

          {pathname === "/" && (
            <ButtonLink href="/login">
              <span>Sign in</span>
            </ButtonLink>
          )}
        </nav>
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default Header;
const navList = ({}) => {};
