import React, { useState, useEffect, useRef } from "react";
import {
  HeaderWrapper,
  HeaderContent,
  LogoWrapper,
  StyledLink,
  ButtonLink,
  MenuList,
  AccountTool,
  SearchIcon,
  SearchButton,
  BellButton,
  BellIcon,
  ProfileWrapper,
  SearchInput,
  SearchBox,
} from "./HeaderStyle";

const Header = ({ pathname }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const searchRef = useRef();
  useEffect(() => {
    const clickHandler = (e) => {
      if (pathname !== "/browse") return;
      if (!searchRef.current?.contains(e.target)) setShowSearchBar(false);
    };
    document.addEventListener("click", clickHandler);
    return () => {
      removeEventListener("click", clickHandler);
    };
  }, []);
  return (
    <HeaderWrapper>
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
          {pathname === "/browse" && (
            <>
              <MenuList>
                <ul>
                  <li>
                    <StyledLink href="#">Home</StyledLink>
                  </li>
                  <li>
                    <StyledLink href="#">Series</StyledLink>
                  </li>
                  <li>
                    <StyledLink href="#">Films</StyledLink>
                  </li>
                  <li>
                    <StyledLink href="#">New & Popular</StyledLink>
                  </li>
                  <li>
                    <StyledLink href="#">My List</StyledLink>
                  </li>
                </ul>
              </MenuList>
              <AccountTool>
                <SearchBox showSearchBar={showSearchBar} ref={searchRef}>
                  <SearchInput showSearchBar={showSearchBar} focused />
                  <SearchButton
                    onClick={() => {
                      setShowSearchBar((prev) => !prev);
                    }}
                  >
                    <SearchIcon />
                  </SearchButton>
                </SearchBox>

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
