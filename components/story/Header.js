import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { getGenres } from "../../helpers/browseHelper";
import { genreActions } from "../../store/genreSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { EditOverlay } from "../profile/ProfileCard";
import {
  HeaderWrapper,
  HeaderContent,
  LogoWrapper,
  StyledLink,
  ButtonLink,
  MenuList,
  AccountTool,
  BellButton,
  BellIcon,
  ProfileWrapper,
  SelectedProfile,
  ProfilesBox,
} from "./HeaderStyle";
import Search from "./Search";
import Image from "next/image";
import { userActions } from "../../store/userSlice";
const Header = () => {
  console.log("header running");
  const [stickyHeader, setStickHeader] = useState(false);
  const router = useRouter();
  const { pathname } = router;
  const isNavShown =
    pathname.includes("/browse") ||
    pathname.includes("/search") ||
    pathname.includes("/mylist");
  const dispatch = useDispatch();
  const managingProfilesHandler = () => {
    dispatch(userActions.setShowManagingProfile(true));
  };
  useEffect(() => {
    // sticky header and background-color change
    const scrollHandler = () => {
      if (window.scrollY > 2) {
        setStickHeader(true);
      } else {
        setStickHeader(false);
      }
    };
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  const selectedUserProfile = useSelector(
    (state) => state.users.selectedProfile
  );
  const allUserProfiles = useSelector((state) => state.users.profiles);
  useEffect(() => {
    //fetch genres data
    console.log("useEffect header genre");
    const getGenresInfo = async () => {
      const movieGenres = await getGenres("movies");
      const tvGenres = await getGenres("TVShows");
      console.log("dispatch genres");
      //it's too late to dispatch generes in the end... at the page we can do this because we fetched genre at backend.
      //but we can skip use genres when it's not dispatched yet.
      // the reason why i want it here is thate we can avoid to fetch genres everywhere.
      dispatch(
        genreActions.setGenre({ movies: movieGenres, TVShows: tvGenres })
      );
    };
    getGenresInfo();
  }, []);

  return (
    <HeaderWrapper isNavShown={isNavShown} stickyHeader={stickyHeader}>
      <HeaderContent isNavShown={isNavShown}>
        <LogoWrapper isNavShown={isNavShown}>
          {pathname === "/" ? (
            <img src="/images/misc/logo.png" />
          ) : (
            <StyledLink href="/">
              <img src="/images/misc/logo.png" />
            </StyledLink>
          )}
        </LogoWrapper>
        <nav>
          {isNavShown && (
            <>
              <MenuList>
                <ul>
                  <li>
                    <StyledLink href="/browse">Home</StyledLink>
                  </li>
                  <li>
                    <StyledLink href="/browse/tv">TV Shows</StyledLink>
                  </li>
                  <li>
                    <StyledLink href="/browse/movie">Films</StyledLink>
                  </li>
                  <li>
                    <StyledLink href="/mylist">My List</StyledLink>
                  </li>
                </ul>
              </MenuList>
              <AccountTool>
                <Search pathname={pathname} router={router} />
                <BellButton>
                  <BellIcon />
                </BellButton>
                <ProfileWrapper profilesNum={allUserProfiles.length}>
                  <SelectedProfile>
                    <Image
                      src={
                        selectedUserProfile?.src ||
                        "/images/avatars/placerholder_1.png"
                      }
                      width={32}
                      height={32}
                    />
                  </SelectedProfile>
                  <ProfilesBox>
                    {allUserProfiles
                      .filter(
                        (profile) =>
                          profile.avatarId !== selectedUserProfile?.avatarId
                      )
                      .map((item) => (
                        <button
                          onClick={() => {
                            if (pathname === "/browse") {
                              console.log("reload the page");
                              router.reload();
                            } else {
                              router.push("/browse");
                            }
                            // router.push("/browse");
                            dispatch(userActions.setSelectedProfile(item));
                            localStorage.setItem(
                              "netflex",
                              JSON.stringify(item)
                            );
                          }}
                        >
                          <Image src={item.src} width={30} height={30} />
                          <span>{item.profileName}</span>
                        </button>
                      ))}
                    <button onClick={managingProfilesHandler}>
                      <div>
                        <EditOverlay />
                      </div>

                      <span>Managing profile</span>
                    </button>
                    <button
                      onClick={() => {
                        localStorage.removeItem("netflex");
                        signOut({ callbackUrl: "/login" });
                      }}
                    >
                      <span>Sign out of Neflex</span>
                    </button>
                  </ProfilesBox>
                </ProfileWrapper>
              </AccountTool>
            </>
          )}

          {pathname === "/" && (
            <ButtonLink href="/login">
              <span>Sign in</span>
            </ButtonLink>
          )}
        </nav>
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default Header;
const navList = ({}) => {};
