import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";
import {
  SearchIcon,
  SearchButton,
  SearchInput,
  SearchBox,
  StyledCloseButton,
} from "./HeaderStyle";
const Search = ({ pathname, router }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [urlState, setUrlState] = useState("/browse");
  const searchRef = useRef();
  // const router = useRouter();
  // const { pathname } = router;
  useEffect(() => {
    console.log("search qURY 11");
    const clickOutsideHandler = (e) => {
      if (!pathname.includes("/browse") && !pathname.includes("/search"))
        return;
      if (!searchRef.current?.contains(e.target) && !searchQuery) {
        setShowSearchBar(false);
      }
    };
    document.addEventListener("click", clickOutsideHandler);
    return () => {
      document.removeEventListener("click", clickOutsideHandler);
    };
  }, [pathname, searchQuery]);
  useEffect(() => {
    console.log("search qURY");
    if (searchQuery) {
      router.push(`search?q=${searchQuery}`);
    } else {
      if (showSearchBar) {
        router.push(urlState); // this is to avoid redirect to browse when i paste details url.
        console.log("search router push");
      }
    }
  }, [searchQuery]);
  return (
    <SearchBox showSearchBar={showSearchBar} ref={searchRef}>
      <SearchInput
        value={searchQuery}
        type="text"
        showSearchBar={showSearchBar}
        focused
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      <SearchButton
        onClick={() => {
          if (!router.pathname.includes("/search")) setUrlState(urlState);
          if (!searchQuery) {
            setShowSearchBar((prev) => !prev);
          }
        }}
      >
        <SearchIcon />
      </SearchButton>
      {searchQuery && (
        <StyledCloseButton
          onClick={() => {
            setShowSearchBar(false);
            setSearchQuery("");
            router.push(urlState);
          }}
        />
      )}
    </SearchBox>
  );
};

export default Search;
