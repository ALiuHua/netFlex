import React from "react";
import styled from "styled-components";
import UserAuth from "../components/story/user/UserAuth";
import { getSession } from "next-auth/react";
const Login = () => {
  return <UserAuth />;
};

export default Login;
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/browse",
        permanent: false,
      },
    };
  }

  return { props: { session } };
}

const BackgroundImgWrapper = styled.div`
  position: absolute;
  z-index: -2;
  min-height: 100%;
  min-width: 100%;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
`;
