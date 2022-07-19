import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSession } from "next-auth/react";
import ProfileCard from "./ProfileCard";
import Image from "next/image";
import { AvatarWrapper } from "./ProfileCard";
// import Avatar1 from "../../public/images/avatars/Avatar_01.png";
const getAvatars = () => {
  let avatars = [];
  for (let i = 1; i < 12; i++) {
    avatars.push({
      src: `/images/avatars/Avatar_${i}.png`,
      avatarName: `${i}`,
    });
  }
  return avatars;
};

const Profile = () => {
  const { data: session } = useSession();
  // console.log(Avatar1);
  console.log(session);
  const [profiles, setProfiles] = useState([
    { src: "/images/avatars/Avatar_01.png", avatarName: "1" },
    { src: "/images/avatars/Avatar_02.png", avatarName: "2" },
    { src: "/images/avatars/Avatar_03.png", avatarName: "3" },
  ]);
  const [isManaging, setIsManaging] = useState(false);
  const [editProfile, setEditProfile] = useState({
    isEdit: false,
    editedProfile: {},
    originalProfile: {},
  });

  const [editAvatar, setEditAvatar] = useState(false);
  const profileEditHandler = (param) => {
    setEditProfile((prev) => {
      return { isEdit: true, editedProfile: param, originalProfile: param };
    });
  };
  console.log(profiles);
  //edite state, selection state.
  //没有用户信息时，进入设置用户界面，当有用户信息时，默认以第一个用户进入browse界面
  // useEffect to define if there is no profiles we need to set it into isManaging into true.
  return (
    <ProfileWrapper>
      {!editProfile.isEdit && (
        <>
          <p>{isManaging ? "Edit your Profile" : "Choose profiles"}</p>
          <FlexContainer>
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.avatarName}
                avatarSrc={profile.src}
                width={200}
                height={200}
                avatarName={profile.avatarName}
                onClick={profileEditHandler.bind(undefined, profile)}
              />
            ))}
          </FlexContainer>
          <button onClick={() => setIsManaging(true)}>
            {isManaging ? "Finish" : "Edit your Profile"}
          </button>
        </>
      )}

      {editProfile.isEdit && (
        <>
          {!editAvatar && (
            <>
              <p>edit profiles</p>
              <FlexContainer>
                <div>
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
                  </AvatarWrapper>
                  <input type="text" />
                  <button
                    onClick={() =>
                      setEditProfile((prev) => {
                        return { ...prev, isEdit: false };
                      })
                    }
                  >
                    cancle
                  </button>
                  <button
                    onClick={() => {
                      setEditProfile((prev) => {
                        return { ...prev, isEdit: false };
                      });
                      // need to replace the original one
                      setProfiles((prev) =>
                        prev.map((profile) =>
                          profile.avatarName ===
                          editProfile.originalProfile.avatarName
                            ? editProfile.editedProfile
                            : profile
                        )
                      );
                    }}
                  >
                    ok
                  </button>
                  <button
                    onClick={() => {
                      setEditProfile((prev) => {
                        return { ...prev, isEdit: false };
                      });
                      // need to replace the original one
                      setProfiles((prev) =>
                        prev.filter(
                          (profile) =>
                            profile.avatarName !==
                            editProfile.originalProfile.avatarName
                        )
                      );
                    }}
                  >
                    delet
                  </button>
                </div>
              </FlexContainer>
            </>
          )}
          {editAvatar && (
            <>
              <p>choose your avatar icon</p>
              <FlexContainer>
                {getAvatars().map((avatar) => {
                  return profiles.find(
                    (profile) => profile.avatarName === avatar.avatarName
                  ) ? null : (
                    <AvatarWrapper
                      key={avatar.avatarName}
                      onClick={() => {
                        setEditAvatar(false);
                        setEditProfile((prev) => {
                          return { ...prev, editedProfile: avatar };
                        });
                        // setProfiles((prev) => [...prev, { ...avatar }]);
                      }}
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
  /* width: 100%;
  margin: 20px auto; */
  text-align: center;
  font-size: 3rem;
  font-weight: 700; ;
`;
export const FlexContainer = styled.div`
  display: flex;
  padding: 3rem 0rem;
  justify-content: center;
`;
export const Avatar = styled.div`
  width: 300px;
  height: 300px;
`;
