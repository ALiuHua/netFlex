import React, { useState } from "react";

import { CarouselWrapper, Carousel } from "./LolomoStyle";

const LolomoSlider = ({ children }) => {
  const [carouselClicked, setCarouselClicked] = useState(false);
  const onArrowClickedHandler = () => {
    if (carouselClicked) return;
    setCarouselClicked(true);
  };
  const SampleNextArrow = ({ className, onClick }) => {
    return (
      <button
        className={className}
        onClick={() => {
          onClick(), onArrowClickedHandler();
          /*in this case i want to add another function when onclick happened,
        at first i trying to add another onClick on this element but it failed,
        because we can't attached two onClicked at one element, so the solution is
        that we can call multifuction when onClick happen*/
        }}
      />
    );
  };
  const SamplePrevArrow = ({ className, onClick }) => {
    return (
      carouselClicked && <button className={className} onClick={onClick} />
    );
  };
  const settings = {
    dots: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: true,
    // carouselClicked,
    //not used here to prevent the re-render of carousel. cause we just want prevArrow re-render.
    initialSlide: 0,
    // centerPadding: "30px",
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slideToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slideToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slideToScroll: 1,
        },
      },
    ],
  };

  return (
    <CarouselWrapper>
      <h2>slider test</h2>
      <Carousel {...settings}>{children}</Carousel>
    </CarouselWrapper>
  );
};

export default LolomoSlider;
