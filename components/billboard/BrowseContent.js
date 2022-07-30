import React, { useState, useCallback } from "react";
import { useRouter } from "next/router";
import BillboardHero from "./BillboardHero";
import Lolomo from "./Lolomo";
import Details from "../details/Details";
import Profile from "../profile/Profile";
import { useSelector } from "react-redux";
const BrowseContent = ({ category, profilesManaging, userEmail }) => {
  const [urlOriginal, setUrlOriginal] = useState("/browse");
  const router = useRouter();
  console.log(router);
  console.log(userEmail);
  const onShowDetailsHandler = useCallback((url, urlOriginal) => {
    setUrlOriginal(urlOriginal);
    router.push(url, undefined, { shallow: true });
  }, []);
  // const currentProfile = useSelector((state) => state.users.selectedProfile);
  // how to let page rerender when chang profile???????
  return (
    <>
      {profilesManaging && <Profile userEmail={userEmail} />}
      {!profilesManaging && (
        <>
          <BillboardHero
            category={category}
            onShowMore={onShowDetailsHandler}
          />
          <Lolomo category={category} onShowMore={onShowDetailsHandler} />
          {router.query.jbv && (
            <Details category={category} urlOriginal={urlOriginal} />
          )}
        </>
      )}
    </>
  );
};

export default BrowseContent;
