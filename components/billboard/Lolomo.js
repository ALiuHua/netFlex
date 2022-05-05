import React, { useState, useEffect } from "react";
import Slider from "./Slider";
import { TMDB } from "../../data/dynamic/tmdbEndpoints";
const Lolomo = ({ category = "TVShows" }) => {
  const [rowNumber, setRowNumber] = useState(1);
  useEffect(() => {
    const onScrollHandler = () => {
      window.innerHeight + window.scrollY + 400 >= document.body.offsetHeight &&
        setRowNumber((prevRowNumber) => prevRowNumber + 2);
    };
    window.addEventListener("scroll", onScrollHandler); //添加一次，转动可用
    return () => {
      removeEventListener("scroll", onScrollHandler);
    };
  }, []);
  return (
    <div>
      {TMDB[category].sections.map(
        (item, index) => rowNumber > index && <Slider key={index} item={item} />
      )}
    </div>
  );
};
export default Lolomo;

//   console.log(window.scrollY);
//   console.log(window.pageYOffset);
//above are same value, ie scroll bar scrolling distance;
//   console.log(window.innerHeight);
//the value of the content visibel window height
//   console.log(document.body.offsetHeight);
// kind of document height, if i add another div with height= 50px in the footer, this will increase 50px.
//   window.scrollY + window.innerHeight === document.body.offsetHeight;
// mean the document just hit the bottom of window.
