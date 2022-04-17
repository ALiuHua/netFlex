import React, { useState } from "react";
import styled from "styled-components";
import QuestionAccordion from "./QuestionAccordion";
const content = [
  {
    id: 1,
    title: "What is NetFlex?",
    text: "NetFlex is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more on thousands of internet-connected devices.You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!",
  },
  {
    id: 2,
    title: "How much does NetFlex cost?",
    text: "Watch NetFlex on your smartphone, tablet, Smart TV, laptop or streaming device, all for one fixed monthly fee. Plans range from $10.99 to $22.99 per month. No extra costs, no contracts.",
  },
  {
    id: 3,
    title: "Where can I watch NetFlex?",
    text: "Watch anywhere, at any time. Sign in with your NetFlex account to watch instantly on the web at NetFlex.com from your personal computer or on any internet-connected device that offers the NetFlex app, including smart TVs, smartphones, tablets, streaming media players and game consoles. You can also download your favourite shows with the iOS, Android or Windows 10 app. Use downloads to watch titles while you're on the go and without an internet connection. Take NetFlex with you anywhere.",
  },
  {
    id: 4,
    title: "How do I cancel?",
    text: "NetFlex is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account at any time.",
  },
  {
    id: 5,
    title: "What can I watch on NetFlex?",
    text: "NetFlex has an extensive library of feature films, documentaries, TV shows, anime, award-winning NetFlex Originals and more. Watch as much as you want, at any time that you want.",
  },
  {
    id: 6,
    title: "Is NetFlex good for kids?",
    text: "The NetFlex Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.",
  },
];
const orginal = [false, false];
const Questions = () => {
  const [questionState, setQuestionState] = useState(orginal);
  const toggleQuestionStateHandler = (index) => {
    console.log(index);
    const clickedState = questionState[index - 1];
    const undatedClickedState = !clickedState;
    const undatedState = [...orginal];
    undatedState[index - 1] = undatedClickedState;
    setQuestionState(undatedState);
  };
  return (
    <QuestionContainer>
      {console.log("question map")}
      {content.map((data) => (
        <QuestionAccordion
          {...data}
          key={data.id}
          onClose={toggleQuestionStateHandler.bind(null, data.id)}
          qState={questionState[data.id - 1]}
        />
      ))}
    </QuestionContainer>
  );
};

export default Questions;
const QuestionContainer = styled.div`
  margin: 5.2rem auto;
`;
