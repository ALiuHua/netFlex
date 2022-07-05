import React, { useState, useEffect } from "react";
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
    <HeaderWrapper pathname={pathname} stickyHeader={stickyHeader}>
      <HeaderContent pathname={pathname}>
        <LogoWrapper pathname={pathname}>
          {pathname === "/" ? (
            <img src="/images/misc/logo.png" />
          ) : (
            <StyledLink href="/">
              <img src="/images/misc/logo.png" />
            </StyledLink>
          )}
        </LogoWrapper>
        <nav>
          {(pathname.includes("/browse") ||
            pathname.includes("/search") ||
            pathname.includes("/mylist")) && (
            <>
              <MenuList>
                <ul>
                  <li>
                    <StyledLink href="/browse">Movies</StyledLink>
                  </li>
                  <li>
                    <StyledLink href="/browse">TV Shows</StyledLink>
                  </li>
                  <li>
                    <StyledLink href="/play/780609">Films</StyledLink>
                  </li>
                  <li>
                    <StyledLink href="#">New & Popular</StyledLink>
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
                  <p>我</p>
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
