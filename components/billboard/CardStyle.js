import styled from "styled-components";
export const MediaInfo = styled.div`
  width: 100%;
  background-color: rgba(35, 35, 35);
  opacity: 0;
  transition: all 0.5s ease-in;
  font-size: 1vw;
  cursor: pointer;
  * {
    display: none;
  }
`;
export const MiniTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: inline-block !important;
  position: absolute;
  left: 5%;
  bottom: 8%;
  color: #eee;
  z-index: 1;
`;
export const IsNew = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e30613;
  font-size: 1vw;
  padding: 4px;
  margin-bottom: 0.6rem;
  top: 0;
  right: 0;
  z-index: 1;
  position: absolute;
`;
export const GenreTag = styled.div`
  display: flex !important;
  align-items: center;
  font-size: clamp(1.5rem 1.4vw 2rem);
  .dot {
    color: rgba(245, 245, 245, 0.5);
    padding: 0 4px;
  }
`;

export const MediaContent = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 4px;
  background-color: #141414;
  cursor: pointer;
`;
export const ImgWrapper = styled.div`
  position: relative;
  z-index: 3;
  width: 100%;
  height: 100%;
  background-color: #333;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

export const CardWrapper = styled.div`
  position: relative;
  aspect-ratio: 16/9;

  box-shadow: 2px 2px 1rem rgba(20, 20, 20, 0.85);
  transform-origin: ${({ location }) =>
    location === "left"
      ? "0% 85%"
      : location === "right"
      ? "100% 85%"
      : "50% 85%"};
  transition: all 0.3s ease-in;
  &:hover {
    transform: scale(1.5);
    transition-delay: 0.5s;
    ${GenreTag} {
      transform: scale(0.75);
      transform-origin: left;
    }
  }

  &:hover .mediaContent {
    border-radius: 4px 4px 0 0;
  }
  &:hover .mediaInfo {
    opacity: 1;
    height: 70px;
    transition: opacity 0.3s ease-in;
    transition-delay: 0.5s;
    padding: 6px 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-radius: 0 0 4px 4px;
    * {
      display: block;
    }
  }
`;
export const ActionWrapper = styled.div`
  width: 100%;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center;
`;
export const GradientLayer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.2) 0,
    rgba(0, 0, 0, 0.1) 60%,
    rgba(0, 0, 0, 0.1) 100%
  );
`;
