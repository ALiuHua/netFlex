import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Card from "../components/billboard/Card";
import styled from "styled-components";
import Details from "../components/details/Details";
const mylist = () => {
  const router = useRouter();
  const [myList, setMyList] = useState([]);
  const [urlOriginal, setUrlOriginal] = useState("/browse");
  const onShowMore = (url, urlOriginal) => {
    router.push(url, undefined, { shallow: true });
    setUrlOriginal(urlOriginal);
    // setCategory(itemCategory);
  };
  useEffect(() => {
    const getListItems = async () => {
      const res = await fetch("/api/auth/addToList", { method: "GET" });
      const { list } = await res.json();
      console.log(list);
      setMyList(list);
    };
    getListItems();
  }, []);
  return (
    <>
      <SearchContainer>
        {myList.map((result) => (
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

export default mylist;
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  console.log(session);
  return { props: { session } };
}

const SearchContainer = styled.div`
  margin: 8rem auto;
  padding: 0 4%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 6.2rem;
  grid-column-gap: 10px;
  height: 100vh; // not opt
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
