import styled, { css } from "styled-components";
const gap = 0; //unit "rem"
export const SectionContainer = styled.section`
  padding: 7rem 4.5rem;
  border-bottom: 0.8rem solid ${({ theme }) => theme.borderBottomColor};
  background-color: #000;
  @media only screen and (max-width: ${({ theme }) => theme.mediaMedium}) {
    padding: 7.5rem 5rem;
  }
  @media only screen and (max-width: ${({ theme }) => theme.mediaXsmall}) {
    padding: 6.25rem 5%;
  }
`;
export const ContentContainer = styled.div`
  max-width: 110rem;
  margin: 0 auto;
  display: flex;
  flex-direction: ${({ layout }) => layout};
  gap: ${gap}rem;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: ${({ theme }) => theme.mediaMedium}) {
    flex-direction: column;
  }
`;
export const ImgContainer = styled.div`
  width: calc(48% - ${gap}rem);
  @media only screen and (max-width: ${({ theme }) => theme.mediaMedium}) {
    max-width: 60rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    margin-top: 1.6rem;
  }
`;
export const DeviceImgContainer = styled.div`
  width: ${({ id }) => (id === "2" ? "100%" : "auto")};
  position: relative;
  z-index: 1;
  margin: ${({ id }) =>
    id === "1"
      ? "-10% -5% -5% 0"
      : id === "2"
      ? "-8% 0 -4% -15%"
      : "-5% -10% 0 0"}; // i don't understand why this can have this effect on image.

  @media only screen and (max-width: ${({ theme }) => theme.mediaMedium}) {
    width: 100%;
    margin: ${({ id }) =>
      id === "1" ? "-10% 0 0 0" : id === "2" ? "-8% 0 0 0" : "-5% 0 0 0"};
  }
`;
export const DeviceImg = styled.img`
  position: relative;
  width: 100%;
  z-index: 1;
`;
export const AnimationContainer = styled.div`
  position: absolute;
  width: 63%;
  bottom: 18%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  ${({ id }) =>
    id === "1" &&
    css`
      width: 73%;
      bottom: -3%;
      left: 50%;
      transform: translate(-50%, -50%);
    `};
  ${({ id }) =>
    id === "2" &&
    css`
      position: absolute;
      padding: 0.8rem 1.2rem;
      border: 0.2rem solid rgba(255, 255, 255, 0.25);
      border-radius: 1rem;
      display: flex;
      align-items: center;

      bottom: 8%;
      left: 50%;
      transform: translate(-50%, 0);
      width: 60%;
      min-width: 27rem;
      background-color: ${({ theme }) => theme.backGroundColor};
      box-shadow: 0 0 3.2rem 0 #000;
      z-index: 2;

      @media only screen and (max-width: ${({ theme }) => theme.mediaMedium}) {
        padding: 0.56rem 1.2rem;
      }
      @media only screen and (max-width: ${({ theme }) => theme.mediaSmall}) {
        padding: 0.7rem 1.5rem;
        min-width: 34rem;
      }
      &::after {
        width: 4.8rem;
        height: 6rem;
        outline: 2px solid #000;
        outline-offset: -2px;
        display: block;
        background: url("/images/feature/download.gif") center center no-repeat;
        background-size: 100%;
        content: "";
      }
    `};
`;
// 判断是否用short circuting operator， 判断多种情况用ternetary expression
export const AnimationImg = styled.div`
  margin-right: 1.6rem;
  img {
    max-width: 100%;
    height: 8rem;
  }
`;
export const AnimationDescription = styled.div`
  margin-right: auto;

  span {
    display: block;
    &:nth-child(1) {
      font-size: 1.6rem;
      font-weight: 600;
    }
    &:nth-child(2) {
      font-size: 1.44rem;
    }
  }
`;
export const DescriptionContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 52%;
  padding: ${({ id }) =>
    id === "2" ? "0 0 0 3rem" : id === "4" ? "0 0 0 4.8rem" : "0 4.8rem 0 0"};
  /* display: flex; */
  h2 {
    font-size: 5rem;
    line-height: 1.1;
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
  p {
    font-size: 2.6rem;
    font-weight: 400;
    margin: 1.95rem 0 0.65rem 0;
    @media only screen and (max-width: ${({ theme }) => theme.mediaMedium}) {
      font-size: 2rem;
    }
    @media only screen and (max-width: ${({ theme }) => theme.mediaSmall}) {
      font-size: 2.5rem;
    }
    @media only screen and (max-width: ${({ theme }) => theme.mediaXsmall}) {
      font-size: 2.25rem;
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.mediaMedium}) {
    width: 100%;
    text-align: center;
    z-index: 2;
    padding: 0 0 0 0;
  }
`;
export const Video = styled.video`
  width: 100%;
`;
