import { ThemeProvider } from "styled-components";
import { theme } from "../styles/Theme";
import { GlobalStyles } from "../styles/GlobalStyles";
import Header from "../components/story/Header";
import Footer from "../components/story/footer/Footer";
import { useRouter } from "next/router";
import { PlayerContext } from "../store/playerContext";
import PlayerContextProvider from "../store/playerContext";
const Layout = ({ children }) => {
  const { pathname } = useRouter();
  return (
    <PlayerContextProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header pathname={pathname} />
        <main>{children}</main>
        <Footer pathname={pathname} />
      </ThemeProvider>
    </PlayerContextProvider>
  );
};

export default Layout;
