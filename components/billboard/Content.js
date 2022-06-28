import React from "react";

import BillboardHero from "./BillboardHero";
import Lolomo from "../billboard/Lolomo";
const Content = ({ category = "TVShows" }) => {
  console.log("content --");
  return (
    <>
      {console.log("content")}
      <BillboardHero category={category} />
      <Lolomo category={category} />
    </>
  );
};

export default Content;
