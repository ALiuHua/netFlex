import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Card from "../components/billboard/Card";
import styled from "styled-components";
import Details from "../components/details/Details";
import { useSelector } from "react-redux";
import useInitProfiles from "../components/hooks/useInitProfiles";
const mylist = ({ userEmail, userProfiles }) => {
  const router = useRouter();
  const [myList, setMyList] = useState([]);
  const [notification, setNotification] = useState(null);
  const [urlOriginal, setUrlOriginal] = useState("/browse");
  const onShowMore = (url, urlOriginal) => {
    router.push(url, undefined, { shallow: true });
    setUrlOriginal(urlOriginal);
    // setCategory(itemCategory);
  };
  const currentUser = useSelector((state) => state.users.email);
  const currentProfile = useSelector((state) => state.users.selectedProfile);
  const { showProfilesManagingPage } = useInitProfiles(userEmail, userProfiles);
  // useEffect(() => {
  //   const getListItems = async () => {
  //     const res = await fetch("/api/auth/addToList", { method: "GET" });
  //     const { list } = await res.json();
  //     console.log(list);
  //     setMyList(list);
  //   };
  //   getListItems();
  // }, []);
  const updateListHandler = (id) => {
    console.log(id, "mylist update runing");
    setMyList((prevList) => prevList.filter((item) => item.id !== id));
  };
  const getList = async () => {
    console.log("getlist", currentUser, currentProfile?.profileName);
    const response = await fetch(
      `./api/auth/addToList?user=${currentUser}&profileName=${currentProfile?.profileName}`
    );
    const data = await response.json();
    console.log(data);

    setMyList(data.list);
  };
  console.log(myList);
  useEffect(() => {
    console.log("this effect running", !currentProfile?.profileName);
    if (currentProfile?.profileName) getList();
  }, [currentUser, currentProfile?.profileName]);
  return (
    <>
      <SearchContainer>
        {myList.map((result) => (
          <CellWrapper key={result.id}>
            <Wrapper>
              <Card
                // category={result.category}
                key={result.id}
                item={result}
                onShowMore={onShowMore}
                onUpdateList={updateListHandler}
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
export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  // const user = session.user;
  // console.log("data", data);
  console.log(session);

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
      // session,
      userEmail,
      userProfiles: userProfiles || null,
    },
  };
};

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
