import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useSession } from "next-auth/react";
import ProfileCard from "./ProfileCard";
import Image from "next/image";

import { AvatarWrapper } from "./ProfileCard";
import { EditOverlay } from "./ProfileCard";
import { userActions } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
const getAvatars = () => {
  let avatars = [];
  for (let i = 1; i < 12; i++) {
    avatars.push({
      src: `/images/avatars/Avatar_${i}.png`,
      avatarId: `avatar_${i}`,
    });
  }
  return avatars;
};

const Profile = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isAdd, setIsAdd] = useState(false);
  const [isManaging, setIsManaging] = useState(true);
  const [editAvatar, setEditAvatar] = useState(false);
  const [editProfile, setEditProfile] = useState({
    isEdit: false,
    editedProfile: {},
    originalProfile: {},
  });
  const profiles = useSelector((state) => state.users.profiles) || [];

  const updateProfilesData = async (profiles, user) => {
    const response = await fetch("/api/auth/profileData", {
      method: "POST",
      body: JSON.stringify({ profiles, user }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "something goes wrong");
    return data;
  };
  const profileEditHandler = (param) => {
    if (isManaging) {
      // set edited profile
      setEditProfile((prev) => {
        return { isEdit: true, editedProfile: param, originalProfile: param };
      });
    } else {
      if (router.pathname === "/browse") {
        router.reload();
      } else {
        router.push("/browse");
      }
      localStorage.setItem("netflex", JSON.stringify(param));
    }
  };
  const cancelButtonHandler = () => {
    // cancle editing
    setEditProfile((prev) => {
      return { ...prev, isEdit: false };
    });
  };
  const saveButtonHandler = () => {
    //confirm editing and back to managing menu
    setEditProfile((prev) => {
      return {
        ...prev,
        isEdit: false,
        editedProfile: { ...prev.editedProfile },
      };
    });
    if (isAdd) {
      //check if already exist
      if (
        profiles.find(
          (profile) => profile.avatarId === editProfile.editedProfile.avatarId
        )
      )
        return console.error("avatar already exist");
      if (
        profiles.find(
          (profile) =>
            profile.profileName === editProfile.editedProfile.profileName
        ) ||
        editProfile.editedProfile.profileName === ""
      )
        return console.error("name already exist or not blank name");
      //Add new profile to profiles
      dispatch(
        userActions.setProfiles({
          type: "ADD_PROFILE",
          payload: editProfile.editedProfile,
        })
      );
      setIsAdd(false);
      return;
    }
    // Replace the original one
    dispatch(
      userActions.setProfiles({
        type: "EDIT_PROFILE",
        payload: editProfile,
      })
    );
  };
  const deleteProfileButtonHandler = () => {
    //confirm editing
    setEditProfile((prev) => {
      return { ...prev, isEdit: false };
    });
    dispatch(
      userActions.setProfiles({
        type: "DELETE_PROFILE",
        payload: editProfile.originalProfile.avatarId,
      })
    );
  };
  const createProfileHandler = () => {
    if (profiles.length === 0) setIsManaging(true);
    setEditProfile({
      isEdit: true,
      editedProfile: {
        src: `/images/avatars/placeholder_${profiles.length + 1}.png`,
        avatarId: `placeholder_${profiles.length + 1}`,
        profileName: "",
      },
      originalProfile: {},
    });
    setIsAdd(true);
  };
  const setAvatarHandler = (avatar) => {
    setEditAvatar(false);
    setEditProfile((prev) => {
      return {
        ...prev,
        editedProfile: {
          ...prev.editedProfile,
          ...avatar,
        },
      };
    });
  };
  return (
    <ProfileWrapper>
      <ProfileContent>
        {!editProfile.isEdit && (
          <>
            <p>{isManaging ? "Manage profiles" : "Who's watching?"}</p>
            <FlexContainer>
              {profiles.map((profile) => (
                <ProfileCard
                  key={profile.avatarId}
                  isManaging={isManaging}
                  avatarSrc={profile.src}
                  width={200}
                  height={200}
                  avatarId={profile.avatarId}
                  profileId={profile.profileName}
                  onClick={profileEditHandler.bind(undefined, profile)}
                />
              ))}

              {profiles.length < 5 && (
                <CreateNewUserButton onClick={createProfileHandler}>
                  <PlusIcon />
                  <span>Add profile</span>
                </CreateNewUserButton>
              )}
            </FlexContainer>
            <Button
              styled={isManaging}
              onClick={() => {
                setIsManaging((prev) => !prev);
                updateProfilesData(profiles, session.user.email);
              }}
            >
              {isManaging ? "Done" : "Manage Profiles"}
            </Button>
          </>
        )}
        {editProfile.isEdit && (
          <>
            {!editAvatar && (
              <>
                <FlexContainer flexDirection="column">
                  <p>Edit Profile</p>
                  <ProfileContainer>
                    <AvatarWrapper
                      onClick={() => {
                        setEditAvatar(true);
                      }}
                    >
                      <Image
                        src={editProfile.editedProfile.src}
                        width={200}
                        height={200}
                      />
                      <EditOverlay />
                    </AvatarWrapper>
                    <Input
                      type="text"
                      placeholder="Name"
                      value={editProfile.editedProfile.profileName}
                      onChange={(e) =>
                        setEditProfile((prev) => {
                          return {
                            ...prev,
                            editedProfile: {
                              ...prev.editedProfile,
                              profileName: e.target.value,
                            },
                          };
                        })
                      }
                    />
                  </ProfileContainer>
                  <ButtonBox>
                    <Button styled={true} onClick={saveButtonHandler}>
                      Save
                    </Button>
                    <Button onClick={cancelButtonHandler}>Cancel</Button>
                    <Button onClick={deleteProfileButtonHandler}>
                      Delete profile
                    </Button>
                  </ButtonBox>
                </FlexContainer>
              </>
            )}
            {editAvatar && (
              <>
                <p>choose your avatar icon</p>
                <FlexContainer>
                  {getAvatars().map((avatar) => {
                    return profiles.find(
                      (profile) => profile.avatarId === avatar.avatarId
                    ) ? null : (
                      <AvatarWrapper
                        key={avatar.avatarId}
                        onClick={setAvatarHandler.bind(undefined, avatar)}
                      >
                        <Image src={avatar.src} width={200} height={200} />
                      </AvatarWrapper>
                    );
                  })}
                </FlexContainer>
              </>
            )}
          </>
        )}
      </ProfileContent>
    </ProfileWrapper>
  );
};

export default Profile;
export const ProfileWrapper = styled.div`
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  height: 100vh;
  position: absolute;
  background-color: #141414;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1500;
`;
export const ProfileContent = styled.div`
  width: 90vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection }) =>
    flexDirection ? flexDirection : "row"};
  padding: 3rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  flex-wrap: wrap;
`;

export const ProfileContainer = styled.div`
  padding: 2rem 0;
  width: 80%;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Input = styled.input`
  width: 12rem;
  margin-top: 2rem;
  padding: 10px 20px;
  background-color: #666;
  border: none;
  outline: none;
  font-size: 1.6rem;
  color: #fff;
  &::placeholder {
    color: #ddd;
  }
`;
export const ButtonBox = styled.div`
  width: 100%;
  margin-top: 2rem;
`;
export const Button = styled.button`
  padding: 6px 20px;
  font-size: 1.6rem;
  color: #aaa;
  border: 1px solid #aaa;
  background: none;
  &:not(:last-child) {
    margin-right: 2rem;
  }
  &:hover {
    color: #eee;
    border: 1px solid #eee;
  }
  ${({ styled }) =>
    styled &&
    css`
      color: #444;
      border: 1px solid #aaa;
      background-color: #fff;
      font-weight: 700;
      &:hover {
        color: #fff;
        border: 1px solid #c00;
        background-color: #c00;
      }
    `}
`;
export const CreateNewUserButton = styled.button`
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 400;
  color: #aaa;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover {
    color: #eee;
    svg {
      background-color: #eee;
    }
  }
  svg {
    padding: 20px;
    width: 10vw;
    height: 10vw;
    min-height: 84px;
    max-height: 135px;
    min-width: 84px;
    max-width: 135px;
    fill: #aaa;
    border-radius: 3px;
  }
  span {
    padding: 12px 0;
    display: block;
    line-height: 1.6;
    font-size: 16px;
  }
`;
export const PlusIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
        clipRule="evenodd"
      />
    </svg>
  );
};
