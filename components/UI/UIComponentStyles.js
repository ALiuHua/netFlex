import styled, { css } from "styled-components";
const gap = 0; //unit "rem"
export const SectionContainer = styled.section`
  padding: 7rem 4.5rem;
  border-bottom: 0.8rem solid ${({ theme }) => theme.borderBottomColor};
`;
export const ContentContainer = styled.div`
  max-width: 110rem;
  margin: 0 auto;

  display: flex;
  flex-direction: ${({ layout }) => layout};
  gap: ${gap}rem;
  align-items: center;
  justify-content: space-between;
`;
export const ImgContainer = styled.div`
  width: calc(48% - ${gap}rem);
`;
export const DeviceImgContainer = styled.div`
  width: 100%;
  position: relative;

  margin: ${({ id }) =>
    id === "1"
      ? "-10% -5% -5% 0"
      : id === "2"
      ? "-8% 0 -4% -15%"
      : "-5% -10% 0 0"}; // i don't understand why this can have this effect on image.
`;
export const DeviceImg = styled.img`
  position: relative;
  width: 100%;
  z-index: 3;
`;
export const AnimationContainer = styled.div`
  position: absolute;
  width: 63%;
  bottom: 18%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
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
      background-color: ${({ theme }) => theme.backGroundColor};
      box-shadow: 0 0 3.2rem 0 #000;
      z-index: 4;
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
  width: 52%;

  h2 {
    font-size: 5rem;
    line-height: 1.1;
    margin-bottom: 0.8rem;
  }
  p {
    font-size: 2.6rem;
    font-weight: 400;
    margin: 1.95rem 0 0.65rem 0;
  }
`;
export const Video = styled.video`
  width: 100%;
`;
