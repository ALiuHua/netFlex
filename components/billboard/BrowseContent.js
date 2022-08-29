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
  const selectedProfile = useSelector((state) => state.users.selectedProfile);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(
    selectedProfile ? false : true
  );

  const router = useRouter();
  const onShowDetailsHandler = useCallback((url, urlOriginal) => {
    setUrlOriginal(urlOriginal);
    router.push(url, undefined, { shallow: true });
  }, []);
  return (
    <>
      {profilesManaging && <Profile userEmail={userEmail} />}
      {!profilesManaging && (
        <>
          {router.pathname === "/browse" && showLoadingSpinner && (
            <LoadingOverlay profileSrc={selectedProfile?.src} />
          )}
          <>
            <BillboardHero
              category={category}
              onShowMore={onShowDetailsHandler}
              setShowLoadingSpinner={setShowLoadingSpinner}
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
