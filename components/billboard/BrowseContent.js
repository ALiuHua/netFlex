import React, { useState, useCallback } from "react";
import { useRouter } from "next/router";
import BillboardHero from "./BillboardHero";
import Lolomo from "./Lolomo";
import Details from "../details/Details";
const BrowseContent = ({ category }) => {
  const [urlOriginal, setUrlOriginal] = useState("/browse");
  const router = useRouter();
  console.log(router);
  const onShowDetailsHandler = useCallback((url, urlOriginal) => {
    setUrlOriginal(urlOriginal);
    router.push(url, undefined, { shallow: true });
  }, []);
  return (
    <>
      <BillboardHero category={category} onShowMore={onShowDetailsHandler} />
      <Lolomo category={category} onShowMore={onShowDetailsHandler} />
      {router.query.jbv && (
        <Details category={category} urlOriginal={urlOriginal} />
      )}
    </>
  );
};

export default BrowseContent;
