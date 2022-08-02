import { StyledMuteButton } from "./ButtonsStyle";
import { MuteIcon, NotMuteIcon } from "./ButtonIcons";

export const MuteButton = ({ className, muted, onClick }) => {
  console.log("muteicon", muted, onClick, className);
  return (
    <StyledMuteButton className={className} onClick={onClick}>
      {muted ? <MuteIcon /> : <NotMuteIcon />}
    </StyledMuteButton>
  );
};
