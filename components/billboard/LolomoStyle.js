import styled, { css } from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export const CarouselWrapper = styled.div`
  /* width: 85vw;
  /* margin: 25px auto; */
  /* width: 100%; */
  /* width: 100vw; */
  // this make scroll bar width added in. why?

  margin: 3vw 0;
  padding: 0 60px; // for prev and next button

  h2 {
    font-size: 1.4vw;
    font-weight: 700;
    color: #e5e5e5;
    margin-bottom: 1.5rem;
  }
  &:hover {
    position: relative;
    z-index: 10;
    .slick-prev {
      opacity: 1;
      /* z-index: 1; */
      /* background-color: green; */
    }
    .slick-next {
      opacity: 1;
      /* z-index: 1; */
      /* background-color: green; */
    }
  }
  .slick-prev {
    left: 0px;
    transform: translate(-100%, -50%);
    opacity: 0;
    z-index: 1;

    &::before {
      /* content: "1"; */
      /* color: transparent; */
      font-size: 40px;
      position: relative;
      z-index: 2;
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

  .slick-dots {
    position: absolute;
    top: -25px;
    right: 0;
    bottom: auto;

    /* background-color: green; */
    width: 200px;
    padding: 2px 5px;
    gap: 2px;
    display: flex !important;
    justify-content: flex-end;
    z-index: -1;
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
    /* position: relative;
    z-index: 2; */
    ${({ carouselClicked }) =>
      !carouselClicked &&
      css`
        clip-path: inset(-100vw -100vw -100vw 0); // why this work?????????????
      `}/* margin-right: -60px; */
    /* height: 100%; */
  }
  .slick-track {
    display: flex;
    /* width: 500% !important; */
    & > div {
      flex: 1;
      padding: 0 3.5px;
      /* background-color: green; */
      /* height: 150px; */
      /* background-color: red; */
      /* div {
        width: 100%;
        height: 100%;
      } */
    }
    .slick-slide {
      /* width: 16.666%; */
      position: relative;
      transition: all 1s;
      aspect-ratio: 16/9;
      z-index: 1;
      @media (max-width: 87.5em) {
        width: 20%;
      }
      @media (min-width: 68.75em) {
        width: 25%;
      }
      @media (min-width: 50em) {
        width: 33.333%;
      }
    }
    .slick-slide:hover {
      position: relative;
      z-index: 2;
    }
  }
`;
export const CarouselEl = styled.div``;
