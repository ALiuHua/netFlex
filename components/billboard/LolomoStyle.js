import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export const CarouselWrapper = styled.div`
  /* width: 85vw;
  margin: 25px auto; */
  /* width: 100%; */
  /* width: 100vw; */
  // this make scroll bar width added in. why?
  padding: 0 60px;
  &:hover {
    .slick-prev {
      opacity: 1;
      z-index: 10;
      background-color: green;
    }
    .slick-next {
      opacity: 1;
      z-index: 10;
      background-color: green;
    }
  }
  button {
    width: 60px;
    height: 100%;
    /* background-color: green; */
  }
  .slick-next:hover,
  .slick-prev:hover {
    background-color: green;
  }
  .slick-prev {
    left: 0px;
    transform: translate(-100%, -50%);
    opacity: 0;

    &::before {
      /* content: "1"; */
      /* color: transparent; */
      font-size: 40px;
    }
  }
  .slick-next {
    left: 100%;
    /* transform: translate(50%, -50%); */
    opacity: 0;
    &::before {
      font-size: 40px;
    }
  }
`;
export const Carousel = styled(Slider)`
  /* padding: 25px 45px; */
  width: 100%;
  margin: 0 auto;
  /* background-color: red; */

  ul {
    position: absolute;
    top: -25px;
    right: 0;
    bottom: auto;

    /* background-color: green; */
    width: 200px;
    /* height: 10px; */
    padding: 2px 5px;
    display: flex;
    gap: 2px;
    li {
      width: auto;
      height: auto;
      margin: 0;
      button {
        width: 15px;
        height: 3px;
      }
    }
    button::before {
      /* position: absolute;
      top: -50%; */
      content: "";
      width: 13px;
      height: 2px;
      opacity: 0.35;
      background-color: white;
    }
  }
  .slick-list {
    overflow: visible;
  }
  .slick-track {
    display: flex;
    /* width: 500% !important; */
    & > div {
      flex: 1;
      margin: 0 3px;
      /* background-color: green; */
      height: 150px;
      background-color: red;
      div {
        width: 100%;
        height: 100%;
      }
    }
    .slick-slide {
      position: relative;
      transition: all 1s;
    }
  }
`;
export const CarouselEl = styled.div``;
