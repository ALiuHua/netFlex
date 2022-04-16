import React from "react";
import {
  AccordionWrapper,
  AccordionHeader,
  ContentWrapper,
} from "./QuestionAccordionStyle";
const QuestionAccordion = ({ title, text, onClose, qState }) => {
  return (
    <AccordionWrapper>
      <AccordionHeader onClick={onClose}>
        <h3>{title}</h3>
        <button>x</button>
      </AccordionHeader>
      <ContentWrapper qState={qState}>{text}</ContentWrapper>
    </AccordionWrapper>
  );
};

export default QuestionAccordion;
