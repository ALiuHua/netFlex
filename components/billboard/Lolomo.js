import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "./Slider";
import { TMDB } from "../../data/dynamic/tmdbEndpoints";
// eslint-disable-next-line react/display-name
const Lolomo = React.memo(({ category, onShowMore }) => {
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
    window.addEventListener("scroll", onScrollHandler);
    return () => {
      removeEventListener("scroll", onScrollHandler);
    };
  }, [category]);
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
});
export default Lolomo;

const SliderWrapper = styled.div`
  position: relative;
  z-index: 2;
  padding-top: 3rem;
  overflow-x: hidden;
`;
