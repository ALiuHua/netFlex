import React from "react";
import {
  ToggleListButton,
  StyledCloseButton,
  StyledMuteButton,
  StyledReplayButton,
  StyledPlayButton,
  StyledMoreInfoButton,
  StyledDetailButton,
  StyledCirclePlayButton,
} from "./ButtonsStyle";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { playerActions } from "../../store/player-slice";
import {
  PlayIcon,
  ReplayIcon,
  InfoIcon,
  MuteIcon,
  NotMuteIcon,
  CheckedIcon,
  AddToListIcon,
  CloseIcon,
  DetailIcon,
} from "./ButtonIcons";
import { ButtonBox } from "../billboard/BillboardHeroStyle";
// why i put calssName here is because we can styled this components

const EmbedButtonBox = ({
  showMuteToggling,
  replayHandler,
  showReplay,
  scaled,
}) => {
  const muted = useSelector((state) => state.player.mute);
  const dispatch = useDispatch();
  console.log(MuteButton);
  return (
    <ButtonBox scaled={scaled}>
      {showMuteToggling && (
        <MuteButton
          muted={muted}
          onClick={(e) => {
            dispatch(playerActions.toggleMuted());
            e.stopPropagation(); // to resolve the issue that i click on the detail page still trigger the detail click outside handler, which is a problem because mute icon will change
          }}
        />
      )}
      {showReplay && <ReplayButton onClick={replayHandler} />}
    </ButtonBox>
  );
};

export default EmbedButtonBox;

export const MuteButton = ({ className, muted, onClick }) => {
  return (
    <StyledMuteButton className={className} onClick={onClick}>
      {muted ? <MuteIcon /> : <NotMuteIcon />}
    </StyledMuteButton>
  );
};

export const ReplayButton = ({ onClick }) => {
  return (
    <StyledReplayButton onClick={onClick}>
      <ReplayIcon />
    </StyledReplayButton>
  );
};
export const PlayButton = ({ onClick, children, className }) => {
  return (
    <StyledPlayButton onClick={onClick} className={className}>
      <PlayIcon />
      {children}
    </StyledPlayButton>
  );
};
export const MoreInfoButton = ({ onClick, children, className }) => {
  return (
    <StyledMoreInfoButton onClick={onClick} className={className}>
      <InfoIcon />
      {children}
    </StyledMoreInfoButton>
  );
};
export const DetailButton = ({ onClick }) => {
  return (
    <StyledDetailButton onClick={onClick}>
      <DetailIcon></DetailIcon>
    </StyledDetailButton>
  );
};

// add/remove mylist
export const ListButton = ({ isChecked, onClick }) => {
  return (
    <ToggleListButton onClick={onClick}>
      {isChecked ? <CheckedIcon /> : <AddToListIcon />}
    </ToggleListButton>
  );
};

export const CloseButton = ({ className, onClick }) => {
  return (
    <StyledCloseButton className={className} onClick={onClick}>
      <CloseIcon />
    </StyledCloseButton>
    // why i need to pass into this onclick otherwise i can not triggler it on the StyledCloseButton in details component
  );
};
export const CirclePlayButton = ({ onClick }) => {
  return (
    <StyledCirclePlayButton onClick={onClick}>
      <PlayIcon />
    </StyledCirclePlayButton>
  );
};
