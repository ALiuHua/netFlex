import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
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
  StyledCloseButton,
} from "./HeaderStyle";
let isInit = true;
const Header = () => {
  const [stickyHeader, setStickHeader] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [urlState, setUrlState] = useState("/browse");
  const searchRef = useRef();
  const router = useRouter();
  const urlRef = useRef("/browse");
  const { pathname } = router;
  console.log("running");
  console.log(searchQuery);

  useEffect(() => {
    console.log("useEffect running click out side");
    const clickOutsideHandler = (e) => {
      console.log("hander running", searchQuery);
      if (!pathname.includes("/browse") && !pathname.includes("/search"))
        return console.log("return");
      if (!searchRef.current?.contains(e.target) && !searchQuery) {
        console.log(router.query.q);
        console.log(
          !searchRef.current?.contains(e.target),
          searchQuery,
          !searchQuery,
          "click outside handler"
        );
        setShowSearchBar(false);
      }
    };
    document.addEventListener("click", clickOutsideHandler);
    console.log("listener added", searchQuery);
    return () => {
      document.removeEventListener("click", clickOutsideHandler);
      console.log("listener removed", searchQuery);
    };
  }, [pathname, searchQuery]);
  useEffect(() => {
    console.log("input change useEffect");
    if (searchQuery) {
      console.log(searchQuery);
      router.push(`search?q=${searchQuery}`);
    } else {
      // if (isInit) {
      //   isInit = false;
      //   return;
      // }// this will also make it not work.

      console.log(urlRef, "pushed to ", urlRef.current);
      router.push(urlRef.current);
    }
    //this will do the trick,but why?
  }, [searchQuery]);
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
    <HeaderWrapper
      pathname={pathname}
      stickyHeader={stickyHeader}
      // ref={HeaderRef}
    >
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
          {(pathname.includes("/browse") || pathname.includes("/search")) && (
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
                    <StyledLink href="#">My List</StyledLink>
                  </li>
                </ul>
              </MenuList>
              <AccountTool>
                <SearchBox showSearchBar={showSearchBar} ref={searchRef}>
                  <SearchInput
                    value={searchQuery}
                    type="text"
                    showSearchBar={showSearchBar}
                    focused
                    onChange={(e) => {
                      console.log("change", e.target.value);
                      // if there is not value,it's empty string by default.
                      // there is a werid bug,if we router here; at init browse page, if we input quickly like qq, whe result will be q. cause setStae will update first and the router?
                      // if (e.target.value) {
                      //   console.log(e.target.value);
                      //   router.push(`search?q=${e.target.value}`);
                      // } else {
                      //   console.log(urlRef);
                      //   router.push(urlRef.current);
                      // }
                      setSearchQuery(e.target.value);
                    }}
                  />
                  <SearchButton
                    onClick={() => {
                      console.log("clicked search button");
                      console.log(!searchQuery);
                      console.log(router.pathname);

                      if (!router.pathname.includes("/search"))
                        urlRef.current = router.pathname;
                      // if (!searchQuery) setShowSearchBar(true);
                      if (!searchQuery) {
                        setShowSearchBar((prev) => {
                          console.log(!prev);
                          return !prev;
                        });
                      }
                    }}
                  >
                    <SearchIcon />
                  </SearchButton>
                  {searchQuery && (
                    <StyledCloseButton
                      onClick={() => {
                        console.log("clicked close");
                        setShowSearchBar(false);
                        setSearchQuery("");
                        router.push(urlRef.current);
                      }}
                    />
                  )}
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
