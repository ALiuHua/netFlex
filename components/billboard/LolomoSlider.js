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
    if (carouselClicked) return;
    setCarouselClicked(true);
  };
  const SampleNextArrow = ({ className, onClick }) => {
    return (
      <ArrowButton
        className={className}
        onClick={() => {
          onClick(),
            setTimeout(() => {
              onArrowClickedHandler();
            }, 80);
        }}
      />
    );
  };
  const SamplePrevArrow = ({ className, onClick }) => {
    return (
      carouselClicked && <ArrowButton className={className} onClick={onClick} />
    );
  };
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    infinite: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slideToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
          slideToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slideToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 2,
          slideToScroll: 2,
          infinite: true,
          dots: true,
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
