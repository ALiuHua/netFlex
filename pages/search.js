import React, { useState, useEffect } from "react";
import Card from "../components/billboard/Card";
import { getSearchResult } from "../helpers/browseHelper";
import styled from "styled-components";
import { useRouter } from "next/router";
import Details from "../components/details/Details";

const Search = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [category, setCategory] = useState(null);
  const router = useRouter();
  const searchQuery = router.query.q;
  console.log(searchQuery);
  useEffect(() => {
    console.log("search useEffect running");
    let currentRender = true;
    setTimeout(() => {
      const fetchSeasonsInfo = async () => {
        console.log("start fetching");
        const results = await getSearchResult(searchQuery);
        console.log(results);
        setSearchResult(results);
      };

      if (currentRender) fetchSeasonsInfo();
      console.log(currentRender);
    }, 500);
    return () => (currentRender = false);
  }, [searchQuery]);
  const onShowMore = (url, bannerPath = null, itemCategory = null) => {
    router.push(url, undefined, { shallow: true });
    setCategory(itemCategory);
  };
  return (
    <>
      <SearchContainer>
        {searchResult.map((result) => (
          <CellWrapper key={result.id}>
            <Wrapper>
              <Card
                category={result.category}
                key={result.id}
                item={result}
                onShowMore={onShowMore}
              />
            </Wrapper>
          </CellWrapper>
        ))}
      </SearchContainer>
      {router.query.jbv && (
        <Details
          category={category}
          //   genreContext={genreContextValue}
          //   detailsPoster={detailsPoster}
        />
      )}
    </>
  );
};

export default Search;
const SearchContainer = styled.div`
  margin: 8rem auto;
  padding: 0 4%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 6.2rem;
  grid-column-gap: 10px;
  height: 100vh; // not opt
  @media screen and (max-width: 87.5em) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media screen and (max-width: 68.75em) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media screen and (max-width: 50em) {
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 5.2rem;
  }
  @media screen and (max-width: 30em) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const CellWrapper = styled.div`
  align-self: center;
  width: 100%;
  aspect-ratio: 16/9;
  position: relative;
`;
const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  &:hover {
    z-index: 10;
  }
`;
