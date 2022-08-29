import React from "react";
import { ButtonBox } from "../billboard/BillboardHeroStyle";
import { CirclePlayButton, ListButton } from "../ui/Buttons";
import EmbedButtonBox from "../ui/Buttons";
import { useSelector } from "react-redux";
import useList from "../hooks/useList";
import { ActionsBox } from "./DetailsStyles";
const ActionBox = ({ item, itemCategory }) => {
  const currentUser = useSelector((state) => state.users.email);
  const currentProfile = useSelector((state) => state.users.selectedProfile);
  const { isInMyList, setIsInMyList, listIconState, addToListHandler } =
    useList(item, currentUser, currentProfile?.profileName);
  return (
    <ActionsBox>
      <ButtonBox scaled={1.7}>
        <CirclePlayButton />
      </ButtonBox>
      <ButtonBox scaled={1.7}>
        {listIconState && (
          <ListButton
            isChecked={isInMyList}
            onClick={async (e) => {
              e.stopPropagation();
              const data = await addToListHandler(item, itemCategory);
              if (data.ok) {
                setIsInMyList((prev) => !prev);
              }
            }}
          />
        )}
      </ButtonBox>
      <EmbedButtonBox showMuteToggling={true} scaled={0.85} />
    </ActionsBox>
  );
};

export default ActionBox;
