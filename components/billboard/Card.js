import React, { useState } from "react";
import styled, { css } from "styled-components";
const Card = ({ item }) => {
  //   const [mouseHover, setMouseHover] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  return (
    <CardWrapper>
      <ImgWrapper showDetail={showDetail}>
        <img src={`https://image.tmdb.org/t/p/w342/${item.backdrop_path}`} />
      </ImgWrapper>
      {showDetail && (
        <ExDiv showDetail={showDetail}>
          <ImgWrapper showDetail={showDetail}>
            <img
              src={`https://image.tmdb.org/t/p/w342/${item.backdrop_path}`}
            />
          </ImgWrapper>
          <Description showDetail={showDetail}>title</Description>
        </ExDiv>
      )}
    </CardWrapper>
  );
};

export default Card;
const ExDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 15;
  background-color: green;
  ${({ showDetail }) =>
    showDetail &&
    css`
      animation: scaling 1s;
      animation-fill-mode: forwards;
      transform-origin: 50% 140%;
      /* transform-origin: 50% 50px; */
      @keyframes scaling {
        0% {
          transform: scale(1);
        }
        100% {
          transform: scale(1.3);
        }
      }
    `}
`;
const CardWrapper = styled.div`
  position: relative;

  box-shadow: rgb(0 0 0 / 75%) 0px 3px 10px;
  div {
    /* height: 100%; */
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 3px;
    overflow: hidden;

    /* object-fit: cover; */
    img {
      display: block;
      width: 100%;
      object-fit: cover;
    }
  }
`;
const ImgWrapper = styled.div`
  position: relative;
  z-index: 10;
  ${({ showDetail }) =>
    showDetail &&
    css`
      animation: scaling 1s;
      animation-fill-mode: forwards;
      transform-origin: 50% 140%;
      /* transform-origin: 50% 50px; */
      @keyframes scaling {
        0% {
          transform: scale(1);
        }
        100% {
          transform: scale(1.3);
        }
      }
    `}
`;
const Description = styled.div`
  transform-origin: 50% 40%;
  position: relative;
  z-index: 5;
  animation: scaling 1s;
  animation-fill-mode: forwards;
  /* transition: all 3s; */
  background-color: red;

  @keyframes scaling {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.3);
    }
  }
  ${(showDetail) => {
    console.log(showDetail);
    return (
      showDetail &&
      css`
        display: block;
      `
    );
  }}
`;
