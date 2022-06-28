import React, { useState, useEffect, useContext, useRef } from "react";
import { CoverImage } from "../billboard/BillboardHero";
import { useRouter } from "next/router";
import styled, { createGlobalStyle } from "styled-components";
import Player from "../billboard/Player";
import { CardContext } from "../../store/cardContext";
import { PlayerContext } from "../../store/playerContext";
import { ActionWrapper } from "../billboard/CardStyle";
import { CirclePlayButton, PlayIcon } from "../Billboard/BillboardHeroStyle";
import EmbedButtonBox from "../billboard/BillboardHeroStyle";
import { GradientLayerAdd } from "../billboard/BillboardHeroStyle";
import Description from "./Description";
import { getDetails } from "../../helpers/browseHelper";
import Episodes from "./Episodes";
import Recommendation from "./Recommondation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { playerActions } from "../../store/player-slice";

const Details = ({ category, genreContext, detailsPoster }) => {
  //   const scrollbarWidth = window.innerWidth - document.body.offsetWidth; //need to be at customizehook
  //   console.log(scrollbarWidth);
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState(null);
  const [playerLoaded, setPlayerLoaded] = useState(false);
  const [trailerShow, setTrailerShow] = useState(false);
  const playHandler = () => {
    router.push(`/play/${item.id}`);
  };
  console.log("details running");
  useEffect(() => {
    console.log("More info useEffect");
    const getPreviewDetail = async () => {
      const {
        details: detailsData,
        castData,
        trailer: detailsTrailer,
      } = await getDetails("TVShows", router.query.jbv);
      setItem(detailsData);
      setTrailer(detailsTrailer);
      setCast(castData);
      setPlayerLoaded(true);
    };
    if (router.query.jbv) getPreviewDetail();
    return () => {
      setTrailerShow(false);
    }; // for temporary
  }, [router.query.jbv]);
  const onEndedHandler = () => {
    setTrailerShow(false);
  };
  const dispatch = useDispatch();
  const clickRef = useRef();
  useEffect(() => {
    const clickOutsideHandler = (e) => {
      if (clickRef.current && !clickRef.current.contains(e.target)) {
        setTrailer(null);
        // setShowPlayer({ isShown: false, playerID: null, row: null }); // for temporary
        // setActivePlayer("billboard");

        router.push("/browse", undefined, { shallow: true });
        dispatch(playerActions.toggleActivePlayer("billboard"));
      }
    };
    document.body.addEventListener("click", clickOutsideHandler);
    return () => {
      removeEventListener("click", clickOutsideHandler);
    };
  }, []);
  return (
    <MoreInfoWrapper>
      <ContentWrapper ref={clickRef}>
        <Content>
          <PreviewPlayer>
            <GradientLayerAdd />
            {!trailerShow && (detailsPoster || item?.backdrop_path) && (
              <CoverImage
                coverPath={detailsPoster || item.backdrop_path}
                size="w780"
              />
            )}
            {playerLoaded && (
              <Player
                trailer={trailer}
                playing={true}
                player="billboard"
                onEnded={onEndedHandler}
                onStart={() => {
                  setTrailerShow(true);
                }}
              />
            )}
          </PreviewPlayer>

          <ActionsBox>
            <ActionWrapper>
              <CirclePlayButton onClick={playHandler}>
                <PlayIcon />
              </CirclePlayButton>
            </ActionWrapper>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "50px",
                height: "50px",
              }}
            >
              <EmbedButtonBox showMuteToggling={true} scaled={0.45} />
            </div>
          </ActionsBox>
        </Content>
        <RelatedInfoContainer>
          <Description
            category={category}
            details={item}
            genreContext={genreContext}
            cast={cast}
          />
          {item && <Episodes details={item} />}
          {item && <Recommendation details={item} category={category} />}
        </RelatedInfoContainer>
      </ContentWrapper>
      <NoScrollBar scrollbar={17} />
    </MoreInfoWrapper>
  );
};

export default Details;

const NoScrollBar = createGlobalStyle`

html{
  overflow-y: hidden !important;
  margin-right:${({ scrollbar }) => scrollbar + "px"}
}
`;
const MoreInfoWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  background: rgba(0, 0, 0, 0.75);
  z-index: 11;
  overflow-y: scroll;
`;
const ContentWrapper = styled.div`
  margin: 3.6rem auto 0 auto;
  width: 50vw;
  border-radius: 8px;
  line-height: 1.4;
  background-color: rgba(20, 20, 20);
  min-height: 100vh;
  border-radius: 7px;
  overflow: hidden;
`;
const Content = styled.div`
  position: relative;

  width: 100%;
`;
const RelatedInfoContainer = styled.div`
  padding: 0 5rem;
  margin-bottom: 3.6rem;
`;
const PreviewPlayer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  z-index: 1;
`;
const ActionsBox = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  bottom: 3vw;
  z-index: 2;
  padding: 0 5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    transform: scale(2);
  }
`;
