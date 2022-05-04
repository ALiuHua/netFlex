import React from "react";
import {
  HeaderWrapper,
  HeaderContent,
  LogoWrapper,
  StyledLink,
  ButtonLink,
  MenuList,
  AccountTool,
} from "./HeaderStyle";

const Header = ({ pathname }) => {
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
              <AccountTool>tool box</AccountTool>
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
