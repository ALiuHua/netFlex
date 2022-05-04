import React from "react";
import styled from "styled-components";
import { BackgroundImage } from "../components/story/hero/HeroStyles";
import SignIn from "../components/story/signIn/SignIn";
const login = () => {
  return (
    <>
      <BackgroundImage />
      {/*set body into relative position */}
      <SignIn />
    </>
  );
};

export default login;

const BackgroundImgWrapper = styled.div`
  position: absolute;
  /* top: 0;
  left: 0;
  bottom: 0; */
  z-index: -2;
  min-height: 100%;
  min-width: 100%;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  //why when we adjust the window size; the background image will shrink or expand reletive. really
  //netflex will not.
`;
