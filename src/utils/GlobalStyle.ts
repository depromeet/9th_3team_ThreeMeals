import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
export const GlobalStyle = createGlobalStyle`
  ${reset};

  html {height: 100%;}
  body {
    background: #191919;
    height: 100%;
    font-family: system-ui;
  }
  body > div:first-child,
  div#__next,
  div#__next > div {
    height: 100%;
  }
  #root {
    height: 100%;
  }
  html {
    box-sizing: border-box;
    
    * {
      box-sizing: inherit;
    }
  }
  a, u {
    text-decoration: none;
  }
  a, button { 
    border: none;
    outline: none;
    background: none;
    padding: 0;
    cursor: pointer;
    text-decoration: none;
  }
  
`
