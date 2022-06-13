import React, { useEffect } from "react";
import { getSeasons } from "../helpers/browseHelper";
const Test = () => {
  useEffect(() => {
    const fetchSeasonsInfo = async () => {
      const result = await getSeasons(71738, 1);
      console.log(result);
    };
    fetchSeasonsInfo();
  }, []);
  return <div>T</div>;
};

export default Test;

//this is tv_id   130652 "77680" 1418
//num  1
