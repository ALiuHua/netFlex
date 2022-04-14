import React from "react";
import {
  HeaderWrapper,
  HeaderContent,
  LogoWrapper,
  StyledLink,
  ButtonLink,
} from "./HeaderStyle";

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <LogoWrapper>
          {1 === 2 ? (
            <StyledLink href="/">
              <img src="/images/misc/logo.png" />
            </StyledLink>
          ) : (
            <img src="/images/misc/logo.png" />
          )}
        </LogoWrapper>
        <nav>
          <ButtonLink href="/">
            <span>Sign in</span>
          </ButtonLink>
        </nav>
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default Header;
