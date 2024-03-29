import React, { useState, useEffect } from "react";
import Card from "../components/billboard/Card";
import { getSearchResult } from "../helpers/browseHelper";
import styled from "styled-components";
import { useRouter } from "next/router";
import Details from "../components/details/Details";
import { getSession } from "next-auth/react";
const Search = ({ userEmail, userProfiles }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [urlOriginal, setUrlOriginal] = useState("/browse");
  const [notification, setNotification] = useState(null);
  const router = useRouter();
  const searchQuery = router.query.q;
  useEffect(() => {
    let currentRender = true;
    setTimeout(() => {
      const fetchSeasonsInfo = async () => {
        const results = await getSearchResult(searchQuery);
        if (results.length > 0) {
          return setSearchResult(results);
        }
        setNotification({
          title: `Your search for "${searchQuery}" did not have any matches.`,
          subTitle: "Suggestions:",
          suggestions: [
            "Try different keywords",
            "Looking for a movie or TV Show?",
            "Try using a movie, TV show title",
          ],
        });
      };

      if (currentRender) fetchSeasonsInfo();
    }, 500);
    return () => (currentRender = false);
  }, [searchQuery]);
  const onShowMore = (url, urlOriginal) => {
    router.push(url, undefined, { shallow: true });
    setUrlOriginal(urlOriginal);
  };
  return (
    <GalleryWrapper>
      {searchResult.length > 0 && (
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
      )}
      {router.query.jbv && <Details urlOriginal={urlOriginal} />}
      {notification && (
        <Notification>
          <p>{notification.title}</p>
          <span>{notification.subTitle}</span>
          <ul>
            {notification.suggestions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Notification>
      )}
    </GalleryWrapper>
  );
};

export default Search;
export const getServerSideProps = async (context) => {
  const session = await getSession(context);
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
      userEmail,
      userProfiles: userProfiles || null,
    },
  };
};

const GalleryWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 0 4%;
  margin: 8rem auto;
  @media (max-width: 50em) {
    min-height: 55vh;
  }
`;
const SearchContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 6.2rem;
  grid-column-gap: 10px;
  grid-auto-rows: min-content;
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
const Notification = styled.div`
  position: absolute;
  left: 50%;
  top: 15%;
  transform: translateX(-50%);
  color: #eee;
  font-size: 1.4rem;
  text-align: left;
  line-height: 1.6;
  p {
    margin-bottom: 5px;
  }
  span {
    display: inline-block;
    margin-bottom: 5px;
  }
  ul {
    li {
      margin-left: 15px;
      list-style: inside;
    }
  }
`;
