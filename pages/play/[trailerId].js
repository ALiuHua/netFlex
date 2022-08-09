import React, { useContext, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import Player from "../../components/billboard/Player";
import { getTrailer } from "../../helpers/browseHelper";
import { useSelector } from "react-redux";
import { CoverImage } from "../../components/billboard/BillboardHero";
export const PlayerPage = ({ onShowMore }) => {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  console.log(router);
  const [trailer, setTrailer] = useState(null);
  const [isMouseActive, setIsMouseActive] = useState(true);
  const posterPath = useSelector((state) => state.details.posterPath);
  useEffect(() => {
    let currentRender = true;
    setTimeout(() => {
      if (currentRender) setIsMouseActive(false);
    }, 5000);
    return () => {
      currentRender = false;
    };
  }, [isMouseActive]);
  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const fetchedTrailer = await getTrailer(
          router.query.cat,
          router.query.trailerId
        );
        // "675353"
        console.log("runniung");
        setTrailer(fetchedTrailer);
      } catch (err) {
        if (err.response) {
          console.log(err.response); // response status not at 200 range
        } else {
          console.log(err.message); //no response at all
        }
      }
    };
    fetchCardData();
    return () => {
      setTrailer(null);
    };
  }, [router.query.trailerId, router.query.cat]);

  //x7Krla_UxRg   6sosTNRw_uQ    TWTfhyvzTx0   b9EkMc79ZSU
  return (
    <PlayerBox>
      <PlayerOverlay
        onMouseMove={() => {
          console.log("mouse move"), setIsMouseActive(true);
        }}
        onClick={() => {
          setIsPlaying((prev) => !prev), console.log("clci");
        }}
        isCompleted={isCompleted}
        isMouseActive={isMouseActive}
      >
        {isMouseActive && (
          <BackButton
            onClick={(e) => {
              console.log("buttno click");
              // const urlPathOriginal = `${window.location.pathname}${window.location.search}`;
              // let updatedUrlPath;
              // if (urlPathOriginal.includes("?")) {
              //   updatedUrlPath = `${urlPathOriginal}&jbv=${item.id}&cat=${item.category}`;
              // } else {
              //   updatedUrlPath = `${urlPathOriginal}?jbv=${item.id}&cat=${item.category}`;
              // }

              // onShowMore(updatedUrlPath, urlPathOriginal);
              router.push("/browse");
              e.stopPropagation();
            }}
          />
        )}
      </PlayerOverlay>
      {isCompleted && (
        <CoverImage coverPath={posterPath} size="original" altInfo="poster" />
      )}
      <Player
        trailer={trailer}
        playing={isPlaying}
        player="videoPlayer"
        control={true}
        onEnded={() => setIsCompleted(true)}
        onPlay={() => {
          console.log("onPlay");
          setIsPlaying(true);
          setIsCompleted(false);
        }}
      />
    </PlayerBox>
  );
};
export default PlayerPage;
const PlayerBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  z-index: 10;
  overflow: hidden;
  & > div {
    width: 100%;
    height: 100%;
  }
`;
export const PlayerOverlay = styled.span`
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  width: 100vw;

  ${({ isCompleted }) =>
    !isCompleted
      ? css`
          height: calc(100vh - 50px);
          background: linear-gradient(
            to bottom,
            #000 60px,
            transparent 60px 100%
          );
        `
      : css`
          height: 100vh;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.65) 0% 100%);
        `};
  z-index: 3;
  cursor: ${({ isMouseActive }) => (isMouseActive ? "auto" : "none")};
`;
export const BackButton = styled.button`
  position: absolute;
  top: 30px;
  left: 50px;
  z-index: 1;
  /* background-color: red; */
  width: 10rem;
  height: 3rem;
  cursor: pointer;
  ::before {
    content: "←";
    position: absolute;
    /* width: 100%; */
    /* width: 5rem;
    height: 5rem; */
    /* border: 3px solid #ddd;
    border-radius: 50%; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    font-size: 6rem;
    color: #ddd;
    /* display: flex;
    justify-content: center;
    align-items: center; */
  }
`;
