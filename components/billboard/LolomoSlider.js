import React, { useState } from "react";
import styled from "styled-components";
import { CarouselWrapper, Carousel } from "./LolomoStyle";
const ArrowButton = styled.button`
  width: 55px;
  height: 100%;
`;
const LolomoSlider = ({ item, children }) => {
  const [carouselClicked, setCarouselClicked] = useState(false);
  const onArrowClickedHandler = () => {
    console.log("onArrowClickedHandler1 clicked");
    if (carouselClicked) return;
    console.log("onArrowClickedHandler2 clicked");
    setCarouselClicked(true);
  };
  const SampleNextArrow = ({ className, onClick }) => {
    return (
      <ArrowButton
        className={className}
        onClick={() => {
          onClick(), console.log("button clicked");
          setTimeout(() => {
            onArrowClickedHandler();
          }, 80);

          /*in this case i want to add another function when onclick happened,
        at first i trying to add another onClick on this element but it failed,
        because we can't attached two onClicked at one element, so the solution is
        that we can call multifuction when onClick happen*/
        }}
      />
    );
  };
  // const SampleNextArrowStyled = styled(SampleNextArrow)`
  //   width: 55px;
  //   height: 100%;
  // `;
  const SamplePrevArrow = ({ className, onClick }) => {
    return (
      carouselClicked && <ArrowButton className={className} onClick={onClick} />
    );
  };
  // const SamplePrevArrowStyled = styled(SamplePrevArrow)`
  //   width: 55px;
  //   height: 100%;
  // `;
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
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
      <h2>{item.title}</h2>
      <Carousel carouselClicked={carouselClicked} {...settings}>
        {children}
      </Carousel>
    </CarouselWrapper>
  );
};

export default LolomoSlider;
