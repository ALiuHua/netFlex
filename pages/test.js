import React, { useEffect } from "react";
import { getSearchResult } from "../helpers/browseHelper";
const Test = () => {
  useEffect(() => {
    const fetchSeasonsInfo = async () => {
      const result = await getSearchResult("friends");
      console.log(result);
    };

    fetchSeasonsInfo();
  }, []);
  return <div>T</div>;
};

export default Test;

//this is tv_id   130652 "77680" 1418
//num  1
