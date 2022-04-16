import styled from "styled-components";
import React, { useState } from "react";
import QuestionAccordion from "./QuestionAccordion";
import { theme } from "../../../styles/Theme";
// import {QuestionSection} from
import CTAFormComponent from "../hero/CTAFormComponent";
import Questions from "./Questions";

const Question = () => {
  return (
    <QuestionSection>
      <QuestionWrapper>
        {console.log("question re-runing")}
        <h2>Frequently Asked Questions</h2>
        <Questions />
      </QuestionWrapper>
      <CTAFormComponent />
    </QuestionSection>
  );
};
// why the title is bliking and content start from empty to normall every time i refresh.
export default Question;

const QuestionSection = styled.section`
  padding: 7rem 4.5rem;
  border-bottom: 0.8rem solid ${({ theme }) => theme.borderBottomColor};
`;
const QuestionWrapper = styled.div`
  width: 75%;
  max-width: 81.5rem;
  margin: 3.2rem auto;
  h2 {
    font-size: 5rem;
    text-align: center;
    margin-bottom: 0.8rem;
  }
`;
