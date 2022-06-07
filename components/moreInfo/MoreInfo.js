import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Player from "../billboard/Player";
const MoreInfo = (props) => {
  const router = useRouter();
  return (
    <>
      <ContentWrapper>
        <BackDrop
          onClick={() => {
            props.onShowMore();
            router.push("/browse");
          }}
        />
        <Content>
          <PreviewPlayer>
            <Player trailer="6sosTNRw_uQ" playing={true} />
          </PreviewPlayer>
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
`;
