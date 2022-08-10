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
/* display: block; */
    font-size: 62.5%; //10px
    background-color: #141414;
    /* -webkit-text-size-adjust: 100%; */
    /* @media only screen and (max-width:${({ theme }) => theme.mediaSmall}) {
        font-size: 50%;
    } */
    @media only screen and (max-width:87.5em) {
        font-size: 56.25%;
    }
    @media only screen and (max-width:50em) {
        font-size: 50%;
    }
    overflow-x: hidden;
    /* overflow-y:hidden */
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
    overflow-x:hidden ;  // sometimes we can cancle this overflow:hidden to check items
}
/* h1,h2{margin-bottom:0.4em} */
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
/* main{
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    overflow-y:scroll;
    overflow-x:hidden;
} */
`;
