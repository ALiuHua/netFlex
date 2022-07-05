import React, { useEffect } from "react";
import { getTrailer } from "../helpers/browseHelper";
const Test = () => {
  useEffect(() => {
    const fetchSeasonsInfo = async () => {
      const result = await getTrailer("movies", 507086);
      console.log(result);
    };

    fetchSeasonsInfo();
  }, []);
  return <div>T</div>;
};

export default Test;
507086;
//this is tv_id   130652 "77680" 1418
//num  1
