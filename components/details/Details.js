import React, { useState, useEffect, useContext, useRef } from "react";
import { CoverImage } from "../billboard/BillboardHero";
import { useRouter } from "next/router";
import Player from "../billboard/Player";
import ActionBox from "./ActionBox";
import { CloseButton } from "../ui/Buttons";
import { detailsActions } from "../../store/detailsSlice";
import { GradientLayerAdd } from "../billboard/BillboardHeroStyle";
import Description from "./Description";
import { getDetails } from "../../helpers/browseHelper";
import Episodes from "./Episodes";
import Recommendation from "./Recommondation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { playerActions } from "../../store/player-slice";
import {
  NoScrollBar,
  MoreInfoWrapper,
  ContentWrapper,
  DetailsContent,
  RelatedInfoContainer,
  PreviewPlayer,
} from "./DetailsStyles";
const Details = ({ urlOriginal }) => {
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState(null);
  const [playerLoaded, setPlayerLoaded] = useState(false);
  const [trailerShow, setTrailerShow] = useState(false);
  const detailsPoster = useSelector((state) => state.details.posterPath);
  const itemCategory = router.query.cat;
  const genresCtx = useSelector((state) => state.genre.genres);
  const [scrollBarWidth, setScrollBarWidth] = useState(null);
  useEffect(() => {
    const scrollbar = window.innerWidth - document.body.offsetWidth;
    setScrollBarWidth(scrollbar);
  }, []);
  const playHandler = () => {
    dispatch(
      detailsActions.setItemDetails({
        posterPath: detailsPoster,
      })
    );
    dispatch(playerActions.toggleActivePlayer("main"));
    router.push(`/play/${item.id}?cat=${itemCategory}`);
  };

  useEffect(() => {
    const getPreviewDetail = async () => {
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
      if (!clickRef.current?.contains(e.target)) {
        // if (clickRef.current && !clickRef.current.contains(e.target)) {
        setTrailer(null);
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
        <DetailsContent
          onClick={(e) => {
            e.stopPropagation();
            playHandler();
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
                  // use onReady to avoid the very first media skipping which bringed up by seetTo
                  if (seetToTime > 0) vPlayer.current.seekTo(seetToTime);
                  setTrailerShow(true);
                }}
              />
            )}
          </PreviewPlayer>
          <ActionBox item={item} itemCategory={itemCategory} />
          <CloseButton
            onClick={(e) => {
              setTrailer(null);
              router.push(urlOriginal, undefined, { shallow: true });
              dispatch(playerActions.toggleActivePlayer("billboard"));
              dispatch(playerActions.setPlayedTime(0));
              e.stopPropagation();
            }}
          />
        </DetailsContent>
        <RelatedInfoContainer>
          <Description details={item} genreContext={genresCtx} cast={cast} />
          {item && itemCategory === "TVShows" && <Episodes details={item} />}
          {item && (
            <Recommendation details={item} itemCategory={itemCategory} />
          )}
        </RelatedInfoContainer>
      </ContentWrapper>
      {scrollBarWidth !== null && <NoScrollBar scrollbar={scrollBarWidth} />}
    </MoreInfoWrapper>
  );
};

export default Details;
