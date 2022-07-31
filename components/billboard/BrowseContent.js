import React, { useState, useCallback } from "react";
import { useRouter } from "next/router";
import BillboardHero from "./BillboardHero";
import Lolomo from "./Lolomo";
import Details from "../details/Details";
import Profile from "../profile/Profile";
import { useSelector } from "react-redux";
import LoadingOverlay from "../ui/LoadingOverlay";
const BrowseContent = ({ category, profilesManaging, userEmail }) => {
  const [urlOriginal, setUrlOriginal] = useState("/browse");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  console.log(router);
  console.log(userEmail);
  const onShowDetailsHandler = useCallback((url, urlOriginal) => {
    setUrlOriginal(urlOriginal);
    router.push(url, undefined, { shallow: true });
  }, []);
  const selectedProfile = useSelector((state) => state.users.selectedProfile);
  // const currentProfile = useSelector((state) => state.users.selectedProfile);
  // how to let page rerender when chang profile???????
  console.log(isLoading);
  return (
    <>
      {profilesManaging && <Profile userEmail={userEmail} />}
      {!profilesManaging && (
        <>
          {router.pathname === "/browse" && isLoading && (
            <LoadingOverlay profileSrc={selectedProfile?.src} />
          )}
          <>
            <BillboardHero
              category={category}
              onShowMore={onShowDetailsHandler}
              setIsLoading={setIsLoading}
            />
            <Lolomo category={category} onShowMore={onShowDetailsHandler} />
            {router.query.jbv && (
              <Details category={category} urlOriginal={urlOriginal} />
            )}
          </>
        </>
      )}
    </>
  );
};

export default BrowseContent;
