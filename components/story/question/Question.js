import styled from "styled-components";
import React, { useState } from "react";
import QuestionAccordion from "./QuestionAccordion";
import { theme } from "../../../styles/Theme";
// import {QuestionSection} from
import CTAFormComponent from "../hero/CTAFormComponent";
import Questions from "./Questions";
const QuestionSection = styled.section`
  padding: 7rem 4.5rem;
  border-bottom: 0.8rem solid ${({ theme }) => theme.borderBottomColor};
  @media only screen and (max-width: ${({ theme }) => theme.mediaXsmall}) {
    padding: 7rem 0;
  }
`;
const QuestionWrapper = styled.div`
  width: 75%;
  max-width: 81.5rem;
  margin: 3.2rem auto;
  @media only screen and (max-width: ${({ theme }) => theme.mediaMedium}) {
    width: 90%;
  }
  @media only screen and (max-width: ${({ theme }) => theme.mediaXsmall}) {
    width: 100%;
  }
  h2 {
    /* font-family: "Netflix Sans"; */
    font-size: 5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 0.8rem;
    @media only screen and (max-width: ${({ theme }) => theme.mediaMedium}) {
      font-size: 4rem;
    }
    @media only screen and (max-width: ${({ theme }) => theme.mediaSmall}) {
      font-size: 5rem;
    }
    @media only screen and (max-width: ${({ theme }) => theme.mediaXsmall}) {
      font-size: 3.25rem;
    }
  }
`;
const CTAFormWrapper = styled.div`
  width: 100%;
  @media only screen and (max-width: ${({ theme }) => theme.mediaXsmall}) {
    padding-left: 5%;
    padding-right: 5%;
  }
`;
const Question = () => {
  return (
    <QuestionSection>
      <QuestionWrapper>
        <h2>Frequently Asked Questions</h2>
        {console.log("question re-runing with h2 title")}
        <Questions />
      </QuestionWrapper>
      <CTAFormWrapper>
        <CTAFormComponent />
      </CTAFormWrapper>
    </QuestionSection>
  );
};
// why the title is bliking and content start from empty to normall every time i refresh.
export default Question;
