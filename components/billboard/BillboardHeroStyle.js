import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../../store/player-slice";
// const EmbedButtonBox = ({
//   showMuteToggling,
//   replayHandler,
//   showReplay,
//   scaled,
// }) => {
//   const muted = useSelector((state) => state.player.mute);
//   const dispatch = useDispatch();
//   return (
//     <ButtonBox scaled={scaled}>
//       {showMuteToggling && (
//         <MuteButton
//           onClick={(e) => {
//             // toggleMuted((prev) => !prev);
//             dispatch(playerActions.toggleMuted());
//             e.stopPropagation(); // to resolve the issue that i click on the detail page still trigger the detail click outside handler, which is a problem because mute icon will change
//           }}
//         >
//           {muted ? <MuteIcon /> : <NotMuteIcon />}
//         </MuteButton>
//       )}

//       {showReplay && (
//         <ReplayButton onClick={replayHandler}>
//           <ReplayIcon />
//         </ReplayButton>
//       )}
//     </ButtonBox>
//   );
// };

// export default EmbedButtonBox;

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
  /* ${({ banner }) => css`
    background: linear-gradient(
        77deg,
        rgba(0, 0, 0, 0.6) 0,
        rgba(0, 0, 0, 0) 85%
      ),
      url(https://image.tmdb.org/t/p/original${banner?.backdrop_path});
      url(https://image.tmdb.org/t/p/original/111616);
  `}; */
  /* background-position: center;
  background-size: cover; */
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
// export const GradientLayer = styled.div`
//   position: absolute;
//   left: 0;
//   bottom: 0;
//   width: 100%;
//   height: 14.7vw;
//   background-image: linear-gradient(
//     to bottom,
//     rgba(20, 20, 20, 0) 0,
//     rgba(20, 20, 20, 0.15) 15%,
//     rgba(20, 20, 20, 0.35) 29%,
//     rgba(20, 20, 20, 0.58) 44%,
//     #141414 68%,
//     #141414 100%
//   );
//   opacity: 1;
// `;
export const BillboardDetail = styled.div`
  position: absolute;
  bottom: 8%;
  /* background-color: orangered; */
  /* transform: translateY(-50%); */
  /* bottom: 0; */

  /* right: 0; */
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
// export const ButtonBox = styled.div`
//   position: absolute;
//   bottom: 0;
//   right: 6%;
//   z-index: 2;
//   ${({ scaled }) =>
//     css`
//       transform: scale(${scaled});
//     `}
// `;
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

// export const MuteButton = styled.button`
//   width: 5.3rem;
//   height: 5.3rem;
//   border-radius: 50%;
//   border: 1px solid currentColor;
//   cursor: pointer;
//   transition: background-color 0.2s;
//   :hover {
//     background-color: rgba(255, 255, 255, 0.1);
//   }
//   svg {
//     width: 100%;
//     height: 100%;
//     fill: currentColor;
//     padding: 1.35rem;
//     display: inline-block;
//   }
// `;
// export const PlayButton = styled.button`
//   display: flex;
//   padding: 1.15rem 3.5rem 1.15rem 2.9rem;
//   margin-right: 1.44rem;
//   align-items: center;
//   color: black;
//   background-color: white;
//   border: 0;
//   border-radius: 4px;
//   /* font-size:6.4rem */
//   transition: background-color 0.2s;
//   @media (max-width: 68.75em) {
//     padding: 0.85rem 2rem 0.85rem 1.8rem;
//   }
//   @media (max-width: 50em) {
//     padding: 0.5rem 1rem 0.5rem 1rem;
//   }
//   cursor: pointer;
//   :hover {
//     background-color: rgba(255, 255, 255, 0.75);
//   }
//   svg {
//     width: 3.5rem;
//     height: 3.5rem;
//     margin-right: 1.6rem;
//     @media (max-width: 87.5em) {
//       width: 3rem;
//       height: 3rem;
//       margin-right: 1rem;
//     }
//     @media (max-width: 68.75em) {
//       width: 2.2rem;
//       height: 2.2rem;
//       margin-right: 1rem;
//     }
//     @media (max-width: 50em) {
//       width: 2rem;
//       height: 2rem;
//       margin-right: 0.6rem;
//     }
//   }
//   span {
//     display: block;
//     font-size: 2.3rem;
//     font-weight: bold;
//     @media (max-width: 87.5em) {
//       font-size: 2rem;
//     }
//     @media (max-width: 68.75em) {
//       font-size: 1.8rem;
//     }
//     @media (max-width: 50em) {
//       font-size: 1.6rem;
//     }
//   }
// `;
// export const CirclePlayButton = styled.button`
//   width: 2.4rem;
//   height: 2.4rem;
//   border-radius: 50%;
//   border: 1px solid currentColor;
//   cursor: pointer;
//   transition: background-color 0.2s;
//   :hover {
//     background-color: rgba(255, 255, 255, 0.1);
//   }
//   /* transform: scale(0.35); */
//   svg {
//     width: 100%;
//     height: 100%;
//     fill: currentColor;
//     padding: 0.2rem;
//     display: inline-block;
//   }
// `;
// export const MoreInfoButton = styled(PlayButton)`
//   background-color: rgba(109, 109, 110, 0.7);
//   color: white;
//   cursor: pointer;
//   :hover {
//     background-color: rgba(109, 109, 110, 0.4);
//   }
// `;
// // export const StyledMuteIcon = styled(MuteIcon)`
// // `
// export const ReplayButton = styled(MuteButton)``;
// icons
// export const MuteIcon = () => (
//   <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
//     <path d="M4.34 2.93L2.93 4.34 7.29 8.7 7 9H3v6h4l5 5v-6.59l4.18 4.18c-.65.49-1.38.88-2.18 1.11v2.06c1.34-.3 2.57-.92 3.61-1.75l2.05 2.05 1.41-1.41L4.34 2.93zM10 15.17L7.83 13H5v-2h2.83l.88-.88L10 11.41v3.76zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zm-7-8l-1.88 1.88L12 7.76zm4.5 8c0-1.77-1.02-3.29-2.5-4.03v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"></path>
//   </svg>
// );

// export const NotMuteIcon = () => (
//   <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
//     <path d="M3 9v6h4l5 5V4L7 9H3zm7-.17v6.34L7.83 13H5v-2h2.83L10 8.83zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z"></path>
//   </svg>
// );

// export const PlayIcon = () => (
//   <svg viewBox="0 0 24 24">
//     <path d="M6 4l15 8-15 8z" fill="currentColor"></path>
//   </svg>
// );

// export const InfoIcon = () => (
//   <svg viewBox="0 0 24 24">
//     <path
//       d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 0 0-8-8 8 8 0 0 0-8 8 8 8 0 0 0 8 8 8 8 0 0 0 8-8zm-9 6v-7h2v7h-2zm1-8.75a1.21 1.21 0 0 1-.877-.364A1.188 1.188 0 0 1 10.75 8c0-.348.123-.644.372-.886.247-.242.54-.364.878-.364.337 0 .63.122.877.364.248.242.373.538.373.886s-.124.644-.373.886A1.21 1.21 0 0 1 12 9.25z"
//       fill="currentColor"
//     ></path>
//   </svg>
// );

// export const ReplayIcon = () => (
//   <svg viewBox="0 0 24 24">
//     <path
//       d="M20 12.35l1.919-1.371 1.162 1.627-4.08 2.915-4.082-2.915 1.162-1.627L18 12.349V12c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.93 0 3.68-.79 4.94-2.06l1.42 1.42A8.954 8.954 0 0 1 11 21a9 9 0 1 1 9-9v.35z"
//       fill="currentColor"
//     ></path>
//   </svg>
// );
// export const CloseIcon = () => {
//   return (
//     <svg viewBox="0 0 512 512">
//       <path
//         fill="none"
//         stroke="currentColor"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="32"
//         d="M368 368L144 144M368 144L144 368"
//       />
//     </svg>
//   );
// };
