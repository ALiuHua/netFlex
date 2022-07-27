import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import BrowseContent from "../../components/billboard/BrowseContent";
import { getGenres } from "../../helpers/browseHelper";
import { genreActions } from "../../store/genreSlice";
import { getSession } from "next-auth/react";
import { userActions } from "../../store/userSlice";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// const Browse = ({ movieGenres, tvGenres }) => {
const Browse = ({ userEmail, userProfiles }) => {
  // console.log("index ", session);
  // const {
  //   user: { email: userEmail, profiles: userProfiles },
  // } = session;
  const dispatch = useDispatch();
  console.log(userEmail, userProfiles, !userProfiles);
  // const dispatch = useDispatch();
  // this logic is not right for refresh////
  // useEffect(() => {
  //   dispatch(userActions.setProfiles(userProfiles));
  // }, [userProfiles]);
  //isManagingProfiles=false || userProfiles  来判断是否显示profiles内容
  //header里的数据与page中的state数据如何交换
  const showManagingProfile = useSelector(
    (state) => state.users.showManagingProfile
  );
  //need to change this state at header component

  // useEffect(() => {
  //   // check if there is already have profiles
  //   // yes
  //   console.log("======", userEmail, userProfiles, !userProfiles);
  //   //no
  //   // if (userProfiles && JSON.stringify(localStorage.getItem("netflex"))?.email!==userEmail)
  //   //   localStorage.setItem(
  //   //     "netflex",
  //   //     JSON.stringify({
  //   //       email: userEmail,
  //   //       profile: userProfiles[0],
  //   //     })
  //   //   );
  //   // dispatch state  第一次登陆
  //   // if 都有  则是刷新
  //   //if 都没有  则是第一次注册
  //   if (userProfiles) dispatch(userActions.setProfiles(userProfiles));
  // }, []);
  return (
    <BrowseContent
      category="browse"
      profilesManaging={showManagingProfile || !userProfiles}
      userEmail={userEmail}
    />
  );
};
export default Browse;
export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  // const user = session.user;
  // console.log("data", data);
  const { email: userEmail, profiles: userProfiles } = session.user;
  // // console.log(userEmail, userProfiles, !userProfiles);
  // // check if it's a new user?
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      // data,
      userEmail,
      userProfiles: userProfiles || null,
    },
  };
};
// export const getStaticProps = async () => {
//   // just query params change will not call this function when using shallow:true with router change. otherwise will still trigger this running;
//   const movieGenres = await getGenres("movies");
//   const tvGenres = await getGenres("TVShows");
//   // another way is to create dummy data locally.
//   console.log("getProps running");
//   return {
//     props: {
//       movieGenres,
//       tvGenres,
//     },
//   };
// };
