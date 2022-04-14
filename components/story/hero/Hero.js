import React from "react";

import {
  BackgroundImage,
  HeroSection,
  HeroWrapper,
  HeroText,
  CTAForm,
  FormContent,
  InputFiled,
  FormButton,
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
        <CTAForm>
          <h3>
            Ready to watch Netflix? Enter your email to create or restart your
            membership.
          </h3>
          <FormContent>
            <InputFiled>
              <input type="email"></input>
              {/* <label>Email addressS</label> */}
            </InputFiled>
            <FormButton>Get started ></FormButton>
          </FormContent>
        </CTAForm>
      </HeroWrapper>
    </HeroSection>
  );
};

export default Hero;
