import Head from "next/head";
import Feature from "../components/story/feature/Feature";
import Hero from "../components/story/hero/Hero";
import Question from "../components/story/question/Question";
import { getSession } from "next-auth/react";
export default function Home() {
  return (
    <>
      <Head>
        <title>Netflex | Create or sign in your account</title>
      </Head>
      <Hero />
      <Feature />
      <Question />
    </>
  );
}
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
