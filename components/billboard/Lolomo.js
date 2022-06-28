import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "./Slider";
import { TMDB } from "../../data/dynamic/tmdbEndpoints";
const Lolomo = ({ category = "TVShows", onShowMore }) => {
  const [rowNumber, setRowNumber] = useState(4);
  useEffect(() => {
    const onScrollHandler = () => {
      window.innerHeight + window.scrollY + 400 >= document.body.offsetHeight &&
        setRowNumber((prevRowNumber) =>
          prevRowNumber < TMDB[category].sections.length
            ? prevRowNumber + 2
            : prevRowNumber
        );
    };
    window.addEventListener("scroll", onScrollHandler); //添加一次，转动可用
    return () => {
      removeEventListener("scroll", onScrollHandler);
    };
  }, []);
  console.log("lolomo running");
  console.log(rowNumber);
  return (
    <SliderWrapper>
      {TMDB[category].sections.map(
        (item, index) =>
          rowNumber > index && (
            <Slider
              category={category}
              key={index}
              item={item}
              onShowMore={onShowMore}
            />
          )
      )}
    </SliderWrapper>
  );
};
export default Lolomo;

const SliderWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

//   console.log(window.scrollY);
//   console.log(window.pageYOffset);
//above are same value, ie scroll bar scrolling distance;
//   console.log(window.innerHeight);
//the value of the content visibel window height
//   console.log(document.body.offsetHeight);
// kind of document height, if i add another div with height= 50px in the footer, this will increase 50px.
//   window.scrollY + window.innerHeight === document.body.offsetHeight;
// mean the document just hit the bottom of window.
