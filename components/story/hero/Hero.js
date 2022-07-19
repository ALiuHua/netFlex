import React from "react";
import CTAFormComponent from "./CTAFormComponent";
import heroImage from "../../../public/images/misc/background.jpg";
import Image from "next/image";
import {
  BackgroundImage,
  HeroSection,
  HeroWrapper,
  HeroText,
  GradientLayer,
} from "./HeroStyles";

const Hero = () => {
  return (
    <HeroSection>
      <Background src={heroImage} altInfo="film poster collections" />
      {/* <BackgroundImage>
        <GradientLayer />
        <Image src={heroImage} layout="fill" objectFit="cover" />
      </BackgroundImage> */}
      <HeroWrapper>
        <HeroText>
          <h1>Unlimited movies, TV shows and more.</h1>
          <h2>Watch anywhere. Cancel at any time.</h2>
        </HeroText>
        <CTAFormComponent />
      </HeroWrapper>
    </HeroSection>
  );
};

export default Hero;
export const Background = ({ src, altInfo }) => {
  return (
    <BackgroundImage>
      <GradientLayer />
      <Image src={src} alt={altInfo} layout="fill" objectFit="cover" />
    </BackgroundImage>
  );
};
