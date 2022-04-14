import {
  SectionContainer,
  ContentContainer,
  DescriptionContainer,
} from "./FeatureStyles";
import React from "react";
import ImgAnimation from "./ImgAnimation";

export const FeatureSection = (props) => {
  const { id, title, description, layout } = props;
  return (
    <SectionContainer>
      <ContentContainer layout={layout}>
        <DescriptionContainer id={id}>
          <h2>{title}</h2>
          <p>{description}</p>
        </DescriptionContainer>
        <ImgAnimation {...props} />
      </ContentContainer>
    </SectionContainer>
  );
};

// card is component, container is element
