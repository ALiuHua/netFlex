import styled, { css } from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export const CarouselWrapper = styled.div`
  margin: 3vw 0;
  padding: 0 4%; // for prev and next button
  h2 {
    font-size: 1.4vw;
    font-weight: 700;
    color: #e5e5e5;
    margin-bottom: 1.5rem;
  }
  &:hover {
    position: relative;
    z-index: 10;
    .slick-prev,
    .slick-next {
      opacity: 1;
    }
  }
  .slick-prev {
    left: 0px;
    transform: translate(-100%, -50%);
    opacity: 0;
    z-index: 1;
    width: 4vw;
    &::before {
      content: "〈";
      width: 100%;
      position: relative;
      right: 25%;
      font-size: 5rem;
      @media only screen and (max-width: 87.5em) {
        font-size: 4.5rem;
      }
      @media (max-width: 50em) {
        font-size: 3.5rem;
      }
    }
  }
  .slick-next {
    left: 100%;
    opacity: 0;
    width: 4vw;
    &::before {
      content: "〉";
      width: 100%;
      position: relative;
      left: 25%;
      font-size: 5rem;
      @media only screen and (max-width: 87.5em) {
        font-size: 4.5rem;
      }
      @media (max-width: 50em) {
        font-size: 3.5rem;
      }
    }
  }
  .slick-next:hover,
  .slick-prev:hover {
    background-color: rgba(0, 0, 0, 0.2);
    ::before {
      font-weight: 700;
      color: #fff;
    }
  }
`;
export const Carousel = styled(Slider)`
  width: 100%;
  margin: 0 auto;
  aspect-ratio: 75/8;
  position: relative;
  z-index: 1;
  @media (max-width: 87.5em) {
    aspect-ratio: 45/4;
  }
  @media (min-width: 68.75em) {
    aspect-ratio: 225/16;
  }
  @media (min-width: 50em) {
    aspect-ratio: 75/4;
  }

  .slick-dots {
    position: absolute;
    top: -25px;
    right: 0;
    bottom: auto;
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
      content: "";
      width: 13px;
      height: 2px;
      opacity: 0.35;
      background-color: white;
    }
  }
  .slick-list {
    overflow: visible;
    ${({ carouselClicked }) =>
      !carouselClicked &&
      css`
        clip-path: inset(-100vw -100vw -100vw 0);
      `}
  }
  .slick-track {
    display: flex;
    & > div {
      flex: 1;
      padding: 0 3.5px;
    }
    .slick-slide {
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
