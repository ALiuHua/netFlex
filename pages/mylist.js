import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Card from "../components/billboard/Card";
import styled from "styled-components";
import Details from "../components/details/Details";
import { useSelector } from "react-redux";
import useInitProfiles from "../components/hooks/useInitProfiles";
const Mylist = ({ userEmail, userProfiles }) => {
  const router = useRouter();
  const [myList, setMyList] = useState([]);
  const [notification, setNotification] = useState(null);
  const [urlOriginal, setUrlOriginal] = useState("/browse");
  const onShowMore = (url, urlOriginal) => {
    router.push(url, undefined, { shallow: true });
    setUrlOriginal(urlOriginal);
  };
  const currentUser = useSelector((state) => state.users.email);
  const currentProfile = useSelector((state) => state.users.selectedProfile);
  const { showProfilesManagingPage } = useInitProfiles(userEmail, userProfiles);
  const updateListHandler = (id) => {
    setMyList((prevList) => prevList.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const getList = async () => {
      const response = await fetch(
        `./api/auth/addToList?user=${currentUser}&profileName=${currentProfile?.profileName}`
      );
      const data = await response.json();
      if (data.list.length > 0) {
        return setMyList(data.list);
      }
      setNotification("You haven't added any titles to your list yet.");
    };
    if (currentProfile?.profileName) getList();
  }, [currentUser, currentProfile?.profileName]);
  return (
    <GalleryWrapper>
      {myList.length > 0 && (
        <SearchContainer>
          {myList.map((result) => (
            <CellWrapper key={result.id}>
              <Wrapper>
                <Card
                  key={result.id}
                  item={result}
                  onShowMore={onShowMore}
                  onUpdateList={updateListHandler}
                />
              </Wrapper>
            </CellWrapper>
          ))}
        </SearchContainer>
      )}
      {router.query.jbv && <Details urlOriginal={urlOriginal} />}
      {notification && (
        <Notification>
          <p>{notification}</p>
        </Notification>
      )}
    </GalleryWrapper>
  );
};

export default Mylist;
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
  padding-top: 18rem;
  color: #666;
  font-size: 1.8rem;
  text-align: center;
`;
