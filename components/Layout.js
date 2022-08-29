import { ThemeProvider } from "styled-components";
import { theme } from "../styles/Theme";
import { GlobalStyles } from "../styles/GlobalStyles";
import Header from "../components/story/header/Header";
import Footer from "../components/story/footer/Footer";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import store from "../store/index";
const Layout = ({ children }) => {
  const { pathname } = useRouter();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header pathname={pathname} />
        <main>{children}</main>
        <Footer pathname={pathname} />
      </ThemeProvider>
    </Provider>
  );
};

export default Layout;
