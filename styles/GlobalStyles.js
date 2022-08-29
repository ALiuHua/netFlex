import { createGlobalStyle } from "styled-components";

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
    font-size: 62.5%; //10px
    background-color: #141414;
    @media only screen and (max-width:87.5em) {
        font-size: 56.25%;
    }
    @media only screen and (max-width:50em) {
        font-size: 50%;
    }
}
body{
    position:relative;
    /* font-family: 'Netflix Sans',sans-serif; */
    font-family: sans-serif;
    font-weight: 400;
    line-height:1.1;
  
    font-size:1.6rem;
    box-sizing: border-box;
    background-color:${({ theme }) => theme.backgroundColor};
    min-width:32rem;
    color:${({ theme }) => theme.greyColor};
    overflow-x:hidden ;
}
a{
    color:inherit;
    text-decoration: none;
}
button{
    border:none;
    background:none;
    color:inherit;
    font-family: inherit;
}
li{list-style:none}
`;
