import {
  SectionContainer,
  ContentContainer,
  ImgContainer,
  DescriptionContainer,
} from "./UIComponentStyles";
import React from "react";
import ImgCard from "./ImgCard";

export const FeatureCard = (props) => {
  const { title, description, layout } = props;
  return (
    <SectionContainer>
      <ContentContainer layout={layout}>
        <DescriptionContainer>
          <h2>{title}</h2>
          <p>{description}</p>
        </DescriptionContainer>
        <ImgCard {...props} />
      </ContentContainer>
    </SectionContainer>
  );
};

// card is component, container is element
