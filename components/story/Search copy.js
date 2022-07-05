import React from "react";
import {
  SearchIcon,
  SearchButton,
  SearchInput,
  SearchBox,
  StyledCloseButton,
} from "./HeaderStyle";
const Search = () => {
  return (
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
  );
};

export default Search;
