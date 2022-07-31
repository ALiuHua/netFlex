import React, { useState, useEffect } from "react";
import Card from "../components/billboard/Card";
import { getSearchResult } from "../helpers/browseHelper";
import styled from "styled-components";
import { useRouter } from "next/router";
import Details from "../components/details/Details";
import { getSession } from "next-auth/react";
import useInitProfiles from "../components/hooks/useInitProfiles";
const Search = ({ userEmail, userProfiles }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [category, setCategory] = useState(null);
  const [urlOriginal, setUrlOriginal] = useState("/browse");
  const router = useRouter();
  const searchQuery = router.query.q;
  console.log(searchQuery);
  const { showProfilesManagingPage } = useInitProfiles(userEmail, userProfiles);
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
  const onShowMore = (url, urlOriginal) => {
    router.push(url, undefined, { shallow: true });
    setUrlOriginal(urlOriginal);
    // setCategory(itemCategory);
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
          // category={category}
          urlOriginal={urlOriginal}
          //   genreContext={genreContextValue}
          //   detailsPoster={detailsPoster}
        />
      )}
    </>
  );
};

export default Search;
export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  // const user = session.user;
  // console.log("data", data);

  // // console.log(userEmail, userProfiles, !userProfiles);
  // // check if it's a new user?
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const { email: userEmail, profiles: userProfiles } = session.user;
  return {
    props: {
      // data,
      userEmail,
      userProfiles: userProfiles || null,
    },
  };
};
// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   return { props: { session } };
// }
const SearchContainer = styled.div`
  margin: 8rem auto;
  padding: 0 4%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 6.2rem;
  grid-column-gap: 10px;
  min-height: 100vh; // not opt
  grid-auto-rows: min-content; // avoid row occupy whole grid container.
  align-items: start;
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
