import { createGlobalStyle } from "styled-components";
import { theme } from "./Theme";

export const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'Netflix Sans';
  src: url('/fonts/NetflixSans.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Netflix Sans';
  src: url('/fonts/NetflixSansMedium.woff') format('woff');
  font-weight: 700;
  font-style: normal;
}

*,*::before,*::after{

    margin:0;
    padding:0;
    box-sizing: inherit;
}

html{

    font-size: 62.5%;
}
body{
    box-sizing: border-box;
    background-color:${({ theme }) => theme.backGroundColor};
    min-width:32rem;
    color:${({ theme }) => theme.greyColor}
}
/* h1,h2{margin-bottom:0.4em} */

`;
