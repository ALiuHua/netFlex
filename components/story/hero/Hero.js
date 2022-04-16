import React from "react";
import CTAFormComponent from "./CTAFormComponent";
import {
  BackgroundImage,
  HeroSection,
  HeroWrapper,
  HeroText,
} from "./HeroStyles";
const Hero = () => {
  return (
    <HeroSection>
      <BackgroundImage />
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
