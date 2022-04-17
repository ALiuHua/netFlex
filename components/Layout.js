import { ThemeProvider } from "styled-components";
import { theme } from "../styles/Theme";
import { GlobalStyles } from "../styles/GlobalStyles";

const Layout = ({ children }) => {
  console.log("runing layout");
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <main>{children}</main>
    </ThemeProvider>
  );
};

export default Layout;
