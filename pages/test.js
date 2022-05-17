import React from "react";
import { useEffect } from "react/cjs/react.production.min";
import { getCardDetails } from "../helpers/browseHelper";
const test = () => {
  useEffect(() => {
    const fetchData = async () => {
      const { details, castData, trailer } = await getCardDetails("movies", {
        id: 675353,
      });
      console.log(details);
    };
    fetchData();
  }, []);

  return <div>test</div>;
};

export default test;
