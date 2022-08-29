import styled, { css, createGlobalStyle } from "styled-components";
export const NoScrollBar = createGlobalStyle`
  html{
    overflow-y: hidden !important;
    margin-right:${({ scrollbar }) => scrollbar + "px"}
  }
`;
export const MoreInfoWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  background: rgba(0, 0, 0, 0.75);
  z-index: 11;
  overflow-y: scroll;
`;
export const ContentWrapper = styled.div`
  margin: 3.6rem auto 0 auto;
  max-width: 850px;
  width: 95%;
  border-radius: 8px;
  line-height: 1.1;
  background-color: rgba(20, 20, 20);
  min-height: 100vh;
  border-radius: 7px;
  overflow: hidden;
`;
export const DetailsContent = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;
`;
export const RelatedInfoContainer = styled.div`
  padding: 0 5rem;
  margin-bottom: 3.6rem;
`;
export const PreviewPlayer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  z-index: 1;
`;
// description
export const DetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
  column-gap: 20px;
  min-height: 15rem;
`;
export const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 2.2rem;
    margin-bottom: 16px;
  }
  div {
    margin-bottom: 16px;
    span:not(:last-child) {
      margin-right: 15px;
    }
    span:last-child {
      padding: 2px 4px;
    }
  }
  p {
    margin-bottom: 16px;
    font-size: 1.6rem;
    margin-top: auto;
  }
`;
export const SubInfo = styled.div`
  .actors,
  .genre,
  .tag {
    color: #777;
  }
  div:not(:last-child) {
    margin-bottom: 16px;
  }
  display: flex;
  flex-direction: column;
`;
export const Rate = styled.span`
  background-color: ${({ rate, theme }) => rate > 8 && theme.accentColor};
  border-radius: 2px;
`;
//episode
export const EpisodesWrapper = styled.div`
  & > div:nth-child(2) {
    background-color: rgb(36, 36, 36);
    border-radius: 6px;
    overflow: hidden;
  }
`;
export const EpisodeContent = styled.div`
  display: flex;
  padding: 1.6rem;
  min-height: 8em;
  border-bottom: 1px solid #404040;
  & > span {
    flex: 0 0 7%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
  }
  & > div:nth-child(2) {
    flex: 0 0 23%;
    display: flex;
    justify-content: center;
    align-items: center;

    div {
      width: 100%;
      aspect-ratio: 16/9;
      border-radius: 3.6%/6.4%;
      overflow: hidden;
      position: relative;
    }
  }
  & > div:nth-child(3) {
    flex: 0 0 70%;
    padding: 1.6rem;
  }
`;
export const HeadInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 2.2rem;
  align-items: center;
  span {
    margin: 4.8rem 0 2rem 0;
  }
`;

export const Select = styled.select`
  font-size: 2rem;
  background-color: rgb(36, 36, 36);
  color: rgb(255, 255, 255);
  margin: 4.8rem 0 2rem 0;
  padding: 8px 24px;
  border-radius: 4px;
  border: 1px solid #404040;
  option {
    background-color: rgb(36, 36, 36);
  }
`;
export const EpisodeDescription = styled.div`
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;
  }
  p {
    font-size: 1.4rem;
    color: #d2d2d2;
  }
`;
export const SubTitle = styled.span`
  font-size: 1em;
  font-weight: 700;
`;
export const Duration = styled.span`
  font-size: 1em;
`;
export const ButtonWrapper = styled.div`
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-top: 2px solid #555;
    z-index: 1;
  }

  button {
    position: absolute;
    left: 50%;
    transform: scale(1.5) translate(-50%, -50%) rotate(0deg);
    transform-origin: 0% 0%;
    color: #aaa;
    z-index: 2;
    ${({ showMore }) =>
      showMore &&
      css`
        transform: scale(1.5) translate(50%, 50%) rotate(180deg);
      `};
  }
`;
//recommondation
export const RecommendationWrapper = styled.div``;
export const RecommendationContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(21rem, 1fr));
  grid-gap: 12px;
  @media (max-width: 87.5em) {
    grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
  }
  @media (min-width: 68.75em) {
  }
  @media (min-width: 50em) {
  }
`;
export const RecommendationCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(36, 36, 36);
  min-height: 20em;
  border-radius: 6px;
  overflow: hidden;
  & > span {
    flex: 0 0 7%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
  }
`;

export const Poster = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
`;
export const RecommondationDescription = styled.div`
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  height: 20rem;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;
  }
  p {
    font-size: 1.4rem;
    color: #d2d2d2;
  }
`;

export const ActionsBox = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  bottom: 3vw;
  z-index: 2;
  padding: 0 5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div:nth-child(2) {
    margin-left: 2rem;
    margin-right: auto;
  }
`;
