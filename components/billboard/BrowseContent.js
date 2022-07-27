import React, { useState, useCallback } from "react";
import { useRouter } from "next/router";
import BillboardHero from "./BillboardHero";
import Lolomo from "./Lolomo";
import Details from "../details/Details";
import Profile from "../profile/Profile";
const BrowseContent = ({ category, profilesManaging, userEmail }) => {
  const [urlOriginal, setUrlOriginal] = useState("/browse");
  const router = useRouter();
  console.log(router);
  const onShowDetailsHandler = useCallback((url, urlOriginal) => {
    setUrlOriginal(urlOriginal);
    router.push(url, undefined, { shallow: true });
  }, []);
  return (
    <>
      {profilesManaging && <Profile />}
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
