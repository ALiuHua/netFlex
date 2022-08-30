import Layout from "../components/Layout";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Netflex | Media streaming ...</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/images/favicon.png" />
        <meta
          property="og:title"
          content="Netflex | Media streaming to watch TV shows and movies"
        />
        <meta
          property="og:image"
          content="https://netflex.vercel.app/images/misc/background.jpg"
        />
        <meta
          property="og:description"
          content="Netflex is a Netflix clone that comes with all the basic functionalities Netflix offers"
        />
        <meta property="og:url" content="https://netflex.vercel.app/" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
