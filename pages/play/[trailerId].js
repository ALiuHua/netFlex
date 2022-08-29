import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import Player from "../../components/billboard/Player";
import { getTrailer } from "../../helpers/browseHelper";
import { useSelector } from "react-redux";
import { CoverImage } from "../../components/billboard/BillboardHero";
export const PlayerPage = () => {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

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
  return (
    <PlayerBox>
      <PlayerOverlay
        onMouseMove={() => {
          setIsMouseActive(true);
        }}
        onClick={() => {
          setIsPlaying((prev) => !prev), console.log("clci");
        }}
        isCompleted={isCompleted}
        isMouseActive={isMouseActive}
      >
        {(isMouseActive || true) && (
          <BackButton
            isCompleted={isCompleted}
            onClick={(e) => {
              router.push("/browse");
              e.stopPropagation();
            }}
          >
            <span>Back to Browse</span>
          </BackButton>
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
  top: 4rem;
  left: 6rem;
  z-index: 1;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  color: #ccc;
  font-size: 3rem;
  cursor: pointer;

  ::before {
    content: "←";
    width: 7rem;
    height: 7rem;
    font-size: 5.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #ccc;
    border-radius: 50%;
  }
  ${({ isCompleted }) =>
    !isCompleted &&
    css`
      span {
        display: none;
      }
      ::before {
        border: none;
        border-radius: none;
      }
    `}
  :hover {
    color: #fff;
    ::before {
      border: 3px solid #fff;
    }
  }
`;
