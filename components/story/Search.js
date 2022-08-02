import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";
import {
  SearchIcon,
  SearchButton,
  SearchInput,
  SearchBox,
  // CloseButton,
} from "./HeaderStyle";
import { CloseButton } from "../ui/Buttons";
const Search = ({ pathname, router }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [urlState, setUrlState] = useState("/browse");
  const searchRef = useRef();
  // const router = useRouter();
  // const { pathname } = router;
  console.log("search runninh");
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
    console.log("search qURY");
    if (searchQuery) {
      console.log("11111", `search?q=${searchQuery}`);
      router.push(`/search?q=${searchQuery}`, undefined, { shallow: true });
      //absolote path and relative path at rouet.push
      //but again we got quick 11 true into 1 issue
    }
    if (!searchQuery && showSearchBar) {
      console.log("11111", urlState);
      router.push(urlState); // this is to avoid redirect to browse when i paste details url.
      console.log("search router push");
    }
  }, [searchQuery, showSearchBar, urlState]);

  //new to resolve the problem when we router from search page without close search bar
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
        focused
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      <SearchButton
        onClick={() => {
          console.log(router.pathname, !router.pathname.includes("/search"));
          if (!router.pathname.includes("/search"))
            setUrlState(router.pathname);
          if (!searchQuery) setShowSearchBar((prev) => !prev);
        }}
      >
        <SearchIcon />
      </SearchButton>
      {searchQuery && (
        <CloseButton
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
