import React from "react";
import Image from "next/image";
import {
  ImgContainer,
  DeviceImgContainer,
  DeviceImg,
  AnimationContainer,
  AnimationImg,
  AnimationDescription,
  Video,
} from "./FeatureStyles";
const ImgAnimation = (props) => {
  const { id, image, post, video } = props;
  return (
    <ImgContainer>
      <DeviceImgContainer id={id}>
        <DeviceImg src={image} />
        <AnimationContainer id={id}>
          {id === "2" ? (
            <>
              <AnimationImg>
                <Image
                  src={post}
                  alt="iphone screen"
                  width={640}
                  height={480}
                />
              </AnimationImg>
              <AnimationDescription>
                <span>Stranger Things</span>
                <span>Downloading</span>
              </AnimationDescription>
            </>
          ) : id === "4" ? (
            <></>
          ) : (
            <Video autoPlay muted loop playsInline>
              <source src={video} type="video/mp4" />
            </Video>
          )}
        </AnimationContainer>
      </DeviceImgContainer>
    </ImgContainer>
  );
};

export default ImgAnimation;
