import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Player from "../billboard/Player";
import { CardContext } from "../../store/cardContext";
import { PlayerContext } from "../../store/playerContext";

import {
  GradientLayerAdd,
  BillboardBackground,
} from "../billboard/BillboardHeroStyle";
import { getDetails } from "../../helpers/browseHelper";

const MoreInfo = (props) => {
  const router = useRouter();
  const [banner, setBanner] = useState(null);
  const { trailer, setTrailer, showPlayer, setShowPlayer } =
    useContext(CardContext);
  const { muted, toggleMuted, volume, activePlayer, setActivePlayer } =
    useContext(PlayerContext);
  console.log(trailer);
  useEffect(() => {
    const getPreviewDetail = async () => {
      console.log(router.query.jbv);
      const {
        details,
        castData,
        trailer: currentTrailer,
      } = await getDetails("TVShows", router.query.jbv);
      console.log(details, castData, trailer);
      if (!trailer) {
        setTrailer(currentTrailer);
      }
      setShowPlayer({ isShown: true, playerID: null, row: null });
      setBanner(details);
      //   setShowPlayer({ isShown: true, playerID: null, row: null });
    };

    let timerId;
    getPreviewDetail();
    const handler = () => {
      //   if (router.query.jbv && !trailer) {
      //     console.log("ruingn edffe", router.query.jbv);
      //     getPreviewDetail();
      //   }
      //   setShowPlayer({ isShown: true, playerID: null, row: null }); // for temporary
    };
    timerId = setTimeout(handler, 500);
    return () => {
      clearTimeout(timerId, handler);
      setShowPlayer({ isShown: false, playerID: null, row: null });
    }; // for temporary
  }, [router.query.jbv]);
  const onEndedHandler = () => {
    setShowPlayer({ isShown: false, playerID: null, row: null });
  };
  return (
    <>
      <ContentWrapper>
        <BackDrop
          onClick={() => {
            props.onShowMore();
            setTrailer(null);
            setShowPlayer({ isShown: false, playerID: null, row: null }); // for temporary
            setActivePlayer("billboard");
            router.push("/browse");
          }}
        />
        {console.log("render onInfo")}
        <Content>
          <PreviewPlayer>
            <GradientLayerAdd />
            {trailer && (
              <Player
                trailer={trailer}
                muted={muted}
                playing={true}
                player="billboard"
                onEnded={onEndedHandler}
              />
            )}
            {!showPlayer.isShown && banner && (
              <BillboardBackground banner={banner}>
                {/* <GradientLayer /> */}
              </BillboardBackground>
            )}
          </PreviewPlayer>
          <div>
            <p>111</p>
            <p>111</p>
            <p>111</p>
            <p>111</p>
            <p>111</p>
            <p>111</p>
          </div>
        </Content>
      </ContentWrapper>
    </>
  );
};

export default MoreInfo;
const BackDrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  background: rgba(0, 0, 0, 0.2);
  z-index: -1;
`;
const ContentWrapper = styled.div`
  position: fixed;
  top: 80px;
  left: 25vw;
  /* right: 15vw; */
  /* transform: translateX(-50%); */
  width: 50vw;
  z-index: 3;
  height: 100vh;
  overflow-y: auto;
  border-radius: 8px;
`;
const Content = styled.div`
  position: relative;
  background-color: #141414;
  width: 100%;
`;
const PreviewPlayer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
`;
