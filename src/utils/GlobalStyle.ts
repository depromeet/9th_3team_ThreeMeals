import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export const GlobalStyle = createGlobalStyle`
  ${reset};

  html,
  body {
    background: #191919;
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
  button { 
    border: none;
    outline: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }
`
