import styled, { css } from "styled-components";

export const BillboardWrapper = styled.div`
  position: relative;
  margin-top: -100px;
  /* padding-bottom: 40%; */
  height: 40vw;
  margin-bottom: 20px;
  z-index: 1;
`;
export const BillboardContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 56.25vw;
  z-index: -1;
  overflow: hidden;
`;
export const BillboardBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;
export const GradientLayerAdd = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 14.7vw;
  background-image: linear-gradient(
    to bottom,
    rgba(20, 20, 20, 0) 0,
    rgba(20, 20, 20, 0.15) 15%,
    rgba(20, 20, 20, 0.3) 30%,
    rgba(20, 20, 20, 0.45) 40%,
    rgba(20, 20, 20, 0.6) 50%,
    rgba(20, 20, 20, 0.75) 65%,
    rgba(20, 20, 20, 0.95) 75%,
    rgba(20, 20, 20, 1) 85%,
    rgba(20, 20, 20, 1) 100%
  );
  opacity: 1;
  z-index: 1000;
`;
export const BillboardDetail = styled.div`
  position: absolute;
  bottom: 8%;
  width: 100%;
  height: 55%;
  padding: 0 4%;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: end;
`;
export const DescriptionContainer = styled.div`
  width: 40%;
  @media (max-width: 68.75em) {
    width: 55%;
  }

  height: 100%;
  /* background-color: green; */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  /* gap: 1rem; */
`;
export const Description = styled.div`
  /* width: 36%;
    height: 100%;
    background-color: green; */
  width: 100%;
  h1 {
    font-size: 6.4rem;
    transition: all 1.3s ease-in 1.2s;
    /* margin-bottom: 3rem; */
    padding-bottom: 3rem;
    @media (max-width: 68.75em) {
      font-size: 5rem;
    }
    @media (max-width: 50em) {
      font-size: 3.5rem;
      padding-bottom: 1.5rem;
    }
    ${({ showPlayer }) =>
      showPlayer &&
      css`
        /* font-size: 3.2rem; */
        transform: scale(0.55);
        transform-origin: bottom left;
        padding-bottom: 0;
      `}
  }
  p {
    line-height: 1.2;
    opacity: 1;
    /* height: 100%; */
    max-height: 1000px;
    transition: all 1s ease-in 1s;
    ${({ showPlayer }) =>
      showPlayer &&
      css`
        opacity: 0;
        max-height: 0;
      `}
  }
`;

export const ActionBox = styled.div`
  display: flex;
  /* width: 100%; */
  // in order to use scale, because we need scale details and hero, so we just use transform-origin:center
  transform: translateY(50%);
`;
export const ButtonBox = styled.div`
  /* width: 2.4rem;
  height: 2.4rem; */
  /* margin-right: auto; */
  ${({ scaled }) =>
    scaled &&
    css`
      transform: scale(${scaled});
      /* transform-origin: 50% 100%; */
      @media (max-width: 68.75em) {
        transform: scale(${scaled / 1.2});
      }
      @media (max-width: 50em) {
        transform: scale(${scaled / 1.25});
      }
      @media (max-width: 30em) {
        transform: scale(${scaled / 1.3});
      }
    `}
`;
// export const ButtonWrapper = styled.div`
// position: re;

// `;
