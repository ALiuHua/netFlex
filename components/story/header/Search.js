import React, { useState, useRef, useEffect } from "react";
import {
  SearchIcon,
  SearchButton,
  SearchInput,
  SearchBox,
} from "./HeaderStyle";
import { SearchCloseButton } from "./HeaderStyle";
const Search = ({ pathname, router }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [urlState, setUrlState] = useState("/browse");
  const searchRef = useRef();
  const inputRef = useRef();
  useEffect(() => {
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
    if (searchQuery) {
      router.push(`/search?q=${searchQuery}`, undefined, { shallow: true });
    }
    if (!searchQuery && showSearchBar) {
      router.push(urlState); // Avoid redirect to browse when open directly with details url.
    }
    if (showSearchBar) inputRef.current.focus(); // focus on input when search bar open
  }, [searchQuery, showSearchBar, urlState]);

  //close search bar when router away from search page
  useEffect(() => {
    if (pathname !== "/search") {
      setShowSearchBar(false);
      setSearchQuery("");
    }
  }, [pathname]);
  return (
    <SearchBox showSearchBar={showSearchBar} ref={searchRef}>
      <SearchInput
        value={searchQuery}
        type="text"
        placeholder="Titles, people, genres"
        showSearchBar={showSearchBar}
        ref={inputRef}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      <SearchButton
        onClick={(e) => {
          if (!router.pathname.includes("/search"))
            setUrlState(router.pathname);
          if (!searchQuery) setShowSearchBar((prev) => !prev);
        }}
      >
        <SearchIcon />
      </SearchButton>
      {searchQuery && (
        <SearchCloseButton
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
