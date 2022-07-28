import React, { useState, useEffect, useRef } from "react";
// import { db } from "../../lib/db";
import styled, { css } from "styled-components";
import { useSession } from "next-auth/react";
import ProfileCard from "./ProfileCard";
import Image from "next/image";

import { AvatarWrapper } from "./ProfileCard";
import { EditOverlay } from "./ProfileCard";
import { userActions } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
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

  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isAdd, setIsAdd] = useState(false); // add new avatar
  const [isManaging, setIsManaging] = useState(true); // switch between choos and manage
  const [editAvatar, setEditAvatar] = useState(false); // switch to avatar gallery
  const [editProfile, setEditProfile] = useState({
    isEdit: false,
    editedProfile: {},
    originalProfile: {},
  }); //switch to profile editing
  const profiles = useSelector((state) => state.users.profiles) || [];
  const userEmail = useSelector((state) => state.users.email);
  console.log("userEmail  profiles", userEmail, profiles);
  const updateProfilesData = async (profiles, user) => {
    console.log(profiles, user);
    const response = await fetch("/api/auth/profileData", {
      method: "POST",
      body: JSON.stringify({ profiles, user }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) throw new Error(data.message || "something goes wrong");
    return data;
  };
  const profileEditHandler = (param) => {
    console.log("profileHandler");
    if (isManaging) {
      // 获取并设定选中的编辑目标
      setEditProfile((prev) => {
        return { isEdit: true, editedProfile: param, originalProfile: param };
      });
    } else {
      // setSelectedAvatar(param);

      dispatch(userActions.setSelectedProfile(param));
      dispatch(userActions.setShowManagingProfile(false));
      console.log(userEmail);
      localStorage.setItem(
        "netflex",
        JSON.stringify({ email: userEmail, profile: param })
      );
    }
  };
  const cancelButtonHandler = () => {
    console.log("cancelButtonHandler");
    // 取消编辑
    setEditProfile((prev) => {
      return { ...prev, isEdit: false };
    });
  };
  const saveButtonHandler = () => {
    console.log("saveButtonHandler");
    //确认编辑 回到managing页面
    setEditProfile((prev) => {
      // console.log({
      //   editedProfile: { ...prev.editedProfile, profileName: inputName },
      // });
      return {
        ...prev,
        isEdit: false,
        editedProfile: { ...prev.editedProfile },
      };
    });
    console.log(editProfile.editedProfile); // not up to date value
    if (isAdd) {
      //验证是否有重复，否则返回(也应该在创建页面)
      if (
        profiles.find(
          (profile) => profile.avatarId === editProfile.editedProfile.avatarId
        )
      )
        // normally would not happen, because we already filter out used avatars.
        return console.error("avatar already exist");
      //check if its already exist
      if (
        profiles.find(
          (profile) =>
            profile.profileName === editProfile.editedProfile.profileName
        ) ||
        editProfile.editedProfile.profileName === ""
      )
        return console.error("name already exist or not blank name");
      //======add new profile to profiles
      // setProfiles((prev) => [...prev, { ...editProfile.editedProfile }]);
      dispatch(
        userActions.setProfiles({
          type: "ADD_PROFILE",
          payload: editProfile.editedProfile,
        })
      );
      setIsAdd(false);
      return;
    }
    // need to replace the original one
    console.log("after return");
    dispatch(
      userActions.setProfiles({
        type: "EDIT_PROFILE",
        payload: editProfile,
      })
    );
  };
  const deleteProfileButtonHandler = () => {
    console.log("deleteProfileButtonHandler");
    //确认编辑 回到managing页面
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
    console.log("createProfileHandler");
    if (profiles.length === 0) setIsManaging(true);
    // we may not need this;
    // setInputName("");
    //设定默认的add选项
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
  console.log(profiles);
  const setAvatarHandler = (avatar) => {
    console.log("setAvatarHandler");
    setEditAvatar(false);
    //设定选中的目标
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
  // console.log(inputNameRef);
  //edite state, selection state.
  //没有用户信息时，进入设置用户界面，当有用户信息时，默认以第一个用户进入browse界面
  // useEffect to define if there is no profiles we need to set it into isManaging into true.
  return (
    <ProfileWrapper>
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
              // const postProfiles = async () => {
              //   const client = await db();
              //   const result = await db
              //     .collections("profiles")
              //     .insetMany(profiles);
              //   console.log(result);
              // };
              // if (isManaging) postProfiles();
              console.log("toggle is managing");
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
    </ProfileWrapper>
  );
};

export default Profile;
export const ProfileWrapper = styled.div`
  /* width: 80%; */
  padding: 0 4.5rem;
  margin: 20px auto;
  text-align: center;
  font-size: 3rem;
  font-weight: 700; ;
`;
export const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection }) =>
    flexDirection ? flexDirection : "row"};
  padding: 3rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
`;

export const ProfileContainer = styled.div`
  padding: 2rem 0;
  width: 40%;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Avatar = styled.div`
  width: 30rem;
  height: 30rem;
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
      /* background: none; */
      background-color: #fff;
      font-weight: 700;
      &:hover {
        color: #fff;
        border: 1px solid #c00;
        background-color: #c00;
      }
    `}
`;
// export const StyledButton = styled(Button)`
//   color: #444;
//   border: 1px solid #aaa;
//   /* background: none; */
//   background-color: #fff;
//   font-weight: 700;
//   &:hover {
//     color: #fff;
//     border: 1px solid #c00;
//     background-color: #c00;
//   }
// `;
export const CreateNewUserButton = styled.button`
  padding: 0 1rem;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 400;
  color: #aaa;
  &:hover {
    color: #eee;
    svg {
      background-color: #eee;
    }
  }
  svg {
    padding: 20px;
    width: 120px;
    height: 120px;
    fill: #aaa;
    border-radius: 3px;
  }
  span {
    padding: 12px 0;
    display: block;
  }
`;
export const PlusIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // class="h-5 w-5"
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
