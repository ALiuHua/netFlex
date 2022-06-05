import React, { useState, useEffect, useRef, useContext } from "react";
import { CirclePlayButton, PlayIcon } from "./BillboardHero";
import {
  MediaInfo,
  MiniTile,
  IsNew,
  GenreTag,
  MediaContent,
  ImgWrapper,
  CardWrapper,
  ActionWrapper,
  DetailIcon,
  DetailButton,
  GradientLayer,
} from "./CardStyle";
import { getTrailer } from "../../helpers/browseHelper";
import Player from "./Player";
import { PlayerContext } from "../../store/playerContext";
import { EmbedButtonBox } from "./BillboardHero";
import { isNewRelease } from "../../helpers/browseHelper";
import { GenreContext } from "../../pages/browse";
import { CardContext } from "../../store/cardContext";
const Card = ({ category, item, rowNumber }) => {
  const { muted, volume, activePlayer, setActivePlayer } =
    useContext(PlayerContext);
  const genreCtx = useContext(GenreContext);
  const {
    trailer,
    setTrailer,
    showPlayer,
    setShowPlayer,
    timer,
    setTimer,
    vPlayer,
  } = useContext(CardContext);
  //can also create a context for card component so that we can avoid
  //making each card instance have such states setting.
  // const [trailer, setTrailer] = useState(null);
  // const [showPlayer, setShowPlayer] = useState(false);
  // const [timer, setTimer] = useState(null);
  // const vPlayer = useRef();
  const isNew = isNewRelease(item);

  const genresInfo = item?.genre_ids.map((id, index) => {
    if (index > 2) return null;
    return genreCtx[category].find((genre) => genre.id === id);
  });
  // console.log(genreCtx[category].map(data=>))
  //vote_average  genre_ids
  // to be seosans   pg?  recommondation?

  const hoverHandler = () => {
    const delayPlay = setTimeout(() => {
      const fetchCardData = async () => {
        try {
          const fetchedTrailer = await getTrailer(category, item.id);
          // "675353"
          setTrailer(fetchedTrailer);
          setShowPlayer({
            isShown: false,
            playerID: item.id,
            row: rowNumber,
          });
          setActivePlayer("card");
        } catch (err) {
          if (err.response) {
            console.log(err.response); // response status not at 200 range
          } else {
            console.log(err.message); //no response at all
          }
        }
      };
      fetchCardData();
    }, 500);
    setTimer(delayPlay);
  };
  const onTrailerReady = () => {
    // vPlayer.current.seekTo(20, "seconds"); // can skip to 20s
    if (trailer) {
      setShowPlayer({ isShown: true, playerID: item.id, row: rowNumber });
    }
  };
  const mouseLeaveHandler = () => {
    clearTimeout(timer);
    setTrailer(null);
    setShowPlayer({ isShown: false, playerID: null, row: null });
    setActivePlayer("billboard");
  };
  const onEndedHandler = () => {
    setTrailer(null);
    setShowPlayer({ isShown: false, playerID: null, row: null });
    setActivePlayer("billboard");
  };

  return (
    <CardWrapper onMouseEnter={hoverHandler} onMouseLeave={mouseLeaveHandler}>
      <MediaContent className="mediaContent">
        {(!showPlayer.isShown ||
          showPlayer.playerID !== item.id ||
          showPlayer.row !== rowNumber) && (
          <ImgWrapper>
            {isNewRelease(item) && <IsNew>New</IsNew>}
            <MiniTile>{item?.name.split(":")[0]}</MiniTile>
            <GradientLayer />
            <img
              src={`https://image.tmdb.org/t/p/w342/${item?.backdrop_path}`}
            />
          </ImgWrapper>
        )}
        {trailer &&
          showPlayer.playerID === item.id &&
          showPlayer.row === rowNumber && (
            <>
              <Player
                ref={vPlayer}
                trailer={trailer}
                onEnded={onEndedHandler}
                onReady={onTrailerReady}
                volume={volume}
                muted={muted}
                playing={true}
                activePlayer={activePlayer}
              />
              <EmbedButtonBox
                showPlayer={showPlayer.isShown}
                trailer={trailer}
                muted={muted}
                scaled="0.35"
              />
            </>
          )}
      </MediaContent>
      <MediaInfo className="mediaInfo">
        <ActionWrapper>
          <CirclePlayButton>
            <PlayIcon />
          </CirclePlayButton>
          <DetailButton>
            <DetailIcon />
          </DetailButton>
        </ActionWrapper>

        <GenreTag>
          {genresInfo.map((data, i) => {
            return (
              <React.Fragment key={i}>
                {i !== 0 && <span className="dot">&bull;</span>}
                <span className="genreName">{data?.name.split("&")[0]}</span>
              </React.Fragment>
            );
          })}
        </GenreTag>
      </MediaInfo>
    </CardWrapper>
  );
};

export default Card;
