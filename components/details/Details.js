import React, { useState, useEffect, useContext, useRef } from "react";
import { CoverImage } from "../billboard/BillboardHero";
import { useRouter } from "next/router";
import styled, { createGlobalStyle } from "styled-components";
import Player from "../billboard/Player";
import { ActionWrapper } from "../billboard/CardStyle";
import { ButtonBox } from "../Billboard/BillboardHeroStyle";
// import {
//   CirclePlayButton,
//   // StyledCloseButton,// a component
//   // PlayIcon,
// } from "../Billboard/BillboardHeroStyle";
import { CloseButton, CirclePlayButton } from "../ui/Buttons";
import { PlayIcon } from "../ui/ButtonIcons";
import EmbedButtonBox from "../ui/Buttons";
import { GradientLayerAdd } from "../billboard/BillboardHeroStyle";
import Description from "./Description";
import { getDetails } from "../../helpers/browseHelper";
import Episodes from "./Episodes";
import Recommendation from "./Recommondation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { playerActions } from "../../store/player-slice";

const Details = ({ category, urlOriginal, genreContext }) => {
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState(null);
  const [playerLoaded, setPlayerLoaded] = useState(false);
  const [trailerShow, setTrailerShow] = useState(false);
  const detailsPoster = useSelector((state) => state.details.posterPath);
  const itemCategory = router.query.cat;
  const genresCtx = useSelector((state) => state.genre.genres);
  const [scrollBarWidth, setScrollBarWidth] = useState(0);
  // const itemCategory = useSelector((state) => state.details.itemCategory);
  useEffect(() => {
    const scrollbar = window.innerWidth - document.body.offsetWidth; //need to be at customizehook
    setScrollBarWidth(scrollbar);
    console.log(scrollbar);
  }, []);
  const playHandler = () => {
    router.push(`/play/${item.id}?cat=${itemCategory}`);
  };
  console.log("details running");
  useEffect(() => {
    console.log("More info useEffect", itemCategory, router.query.jbv);
    const getPreviewDetail = async () => {
      console.log("get detail data============================");
      const {
        details: detailsData,
        castData,
        trailer: detailsTrailer,
      } = await getDetails(itemCategory, router.query.jbv);
      setItem(detailsData);
      setTrailer(detailsTrailer);
      setCast(castData);
      setPlayerLoaded(true);
    };
    if (router.query.jbv) getPreviewDetail();
    return () => {
      setTrailerShow(false);
    }; // for temporary
  }, [itemCategory, router.query.jbv]);
  const onEndedHandler = () => {
    setTrailerShow(false);
  };
  const dispatch = useDispatch();
  const clickRef = useRef();
  const vPlayer = useRef();
  const seetToTime = useSelector((state) => state.player.playedTime);
  useEffect(() => {
    const clickOutsideHandler = (e) => {
      console.log("clcick");
      if (clickRef.current && !clickRef.current.contains(e.target)) {
        setTrailer(null);
        // setShowPlayer({ isShown: false, playerID: null, row: null }); // for temporary
        // setActivePlayer("billboard");

        router.push(urlOriginal, undefined, { shallow: true });
        dispatch(playerActions.toggleActivePlayer("billboard"));
        dispatch(playerActions.setPlayedTime(0));
      }
    };
    document.body.addEventListener("click", clickOutsideHandler);
    return () => {
      document.body.removeEventListener("click", clickOutsideHandler);
    };
  }, []);
  return (
    <MoreInfoWrapper>
      <ContentWrapper ref={clickRef}>
        <Content
          onClick={() => {
            console.log("close button clicked 1");
            playHandler();
            //此处为事件委托。 {//单独部件如mute button此处没有发现bublling  需要证实？}
          }}
        >
          <PreviewPlayer>
            <GradientLayerAdd />
            {!trailerShow && (detailsPoster || item?.backdrop_path) && (
              <CoverImage
                coverPath={detailsPoster || item?.backdrop_path}
                size="w780"
              />
            )}
            {playerLoaded && (
              <Player
                ref={vPlayer}
                trailer={trailer}
                playing={true}
                player="billboard"
                onEnded={onEndedHandler}
                onReady={() => {
                  // use onReady to avoid the very first skip which bringed up by seetTo
                  if (seetToTime > 0) vPlayer.current.seekTo(seetToTime);
                  setTrailerShow(true);
                }}
                // onStart={() => {
                //   if (seetToTime > 0) vPlayer.current.seekTo(seetToTime);
                //   setTrailerShow(true);
                // }}
              />
            )}
          </PreviewPlayer>

          <ActionsBox>
            <ButtonBox scaled={1}>
              <CirclePlayButton
                onClick={() => {
                  console.log("play clicked");
                  // playHandler();
                  // don‘t need this with 事件委托
                }}
              >
                <PlayIcon />
              </CirclePlayButton>
            </ButtonBox>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "50px",
                height: "50px",
              }}
            >
              <EmbedButtonBox showMuteToggling={true} scaled={0.5} />
            </div>
          </ActionsBox>
          <CloseButton
            onClick={(e) => {
              // this part is kind of weird why we need onClick on CloseButton as props
              setTrailer(null);
              router.push(urlOriginal, undefined, { shallow: true });
              dispatch(playerActions.toggleActivePlayer("billboard"));
              dispatch(playerActions.setPlayedTime(0));
              e.stopPropagation();
            }}
          />
        </Content>
        <RelatedInfoContainer>
          <Description
            category={category}
            details={item}
            genreContext={genresCtx}
            cast={cast}
          />
          {item && itemCategory === "TVShows" && <Episodes details={item} />}
          {item && (
            <Recommendation details={item} itemCategory={itemCategory} />
          )}
        </RelatedInfoContainer>
      </ContentWrapper>
      {scrollBarWidth && <NoScrollBar scrollbar={scrollBarWidth} />}
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
  /* width: 50vw; */
  max-width: 850px;
  width: 95%;
  border-radius: 8px;
  line-height: 1.4;
  background-color: rgba(20, 20, 20);
  min-height: 100vh;
  border-radius: 7px;
  overflow: hidden;
  /* @media (max-width: 68.75em) {
    width: 780px;
  }
  @media (max-width: 50em) {
    width: 90%;
  } */
`;
const Content = styled.div`
  position: relative;
  cursor: pointer;
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
