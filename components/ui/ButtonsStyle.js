import styled from "styled-components";
// This is the icon button for add/remove from mylist
export const ToggleListButton = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  border: 1px solid #fff;
  margin-right: auto;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    // this is also a good way to align the svg in the center of button , because we can not use display:flex here cause of dispaly:none
    width: 100%;
    height: 100%;
    padding: 0.2rem;
  }
`;
export const StyledCloseButton = styled.button`
  position: absolute;
  z-index: 200;
  top: 20px;
  right: 20px;
  width: 35px;
  height: 35px;
  padding: 5px;
  border-radius: 50%;
  background-color: #181818;
  /* cursor: pointer; */
`;
export const StyledMuteButton = styled.button`
  width: 5.3rem;
  height: 5.3rem;
  border-radius: 50%;
  border: 1px solid currentColor;
  cursor: pointer;
  transition: background-color 0.2s;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    padding: 1.35rem;
    display: inline-block;
  }
`;
export const StyledReplayButton = styled(StyledMuteButton)``;
export const StyledPlayButton = styled.button`
  display: flex;
  padding: 1.15rem 3.5rem 1.15rem 2.9rem;
  margin-right: 1.44rem;
  align-items: center;
  color: black;
  background-color: white;
  border: 0;
  border-radius: 4px;
  /* font-size:6.4rem */
  transition: background-color 0.2s;
  @media (max-width: 68.75em) {
    padding: 0.85rem 2rem 0.85rem 1.8rem;
  }
  @media (max-width: 50em) {
    padding: 0.5rem 1rem 0.5rem 1rem;
  }
  cursor: pointer;
  :hover {
    background-color: rgba(255, 255, 255, 0.75);
  }
  svg {
    width: 3.5rem;
    height: 3.5rem;
    margin-right: 1.6rem;
    @media (max-width: 87.5em) {
      width: 3rem;
      height: 3rem;
      margin-right: 1rem;
    }
    @media (max-width: 68.75em) {
      width: 2.2rem;
      height: 2.2rem;
      margin-right: 1rem;
    }
    @media (max-width: 50em) {
      width: 2rem;
      height: 2rem;
      margin-right: 0.6rem;
    }
  }
  span {
    display: block;
    font-size: 2.3rem;
    font-weight: bold;
    @media (max-width: 87.5em) {
      font-size: 2rem;
    }
    @media (max-width: 68.75em) {
      font-size: 1.8rem;
    }
    @media (max-width: 50em) {
      font-size: 1.6rem;
    }
  }
`;
export const StyledMoreInfoButton = styled(StyledPlayButton)`
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
  cursor: pointer;
  :hover {
    background-color: rgba(109, 109, 110, 0.4);
  }
`;
export const StyledDetailButton = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  border: 1px solid currentColor;
  cursor: pointer;
  transition: background-color 0.2s;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  /* transform: scale(0.35); */
  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    padding: 0.2rem;
    display: inline-block;
  }
`;
export const StyledCirclePlayButton = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  border: 1px solid currentColor;
  cursor: pointer;
  transition: background-color 0.2s;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  /* transform: scale(0.35); */
  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    padding: 0.2rem;
    display: inline-block;
  }
`;
