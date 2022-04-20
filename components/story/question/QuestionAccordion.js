import React from "react";
import { StyledCloseIcon } from "./CloseIcon";
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
        <button>
          <StyledCloseIcon qState={qState} />
        </button>
      </AccordionHeader>
      <ContentWrapper qState={qState}>
        <p>{text}</p>
      </ContentWrapper>
    </AccordionWrapper>
  );
};

export default QuestionAccordion;
