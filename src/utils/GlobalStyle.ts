import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export const GlobalStyle = createGlobalStyle`
  ${reset};

  html,
  body,
  #root {
    height: 100%;
  }
  html {
    box-sizing: border-box;
    
    * {
      box-sizing: inherit;
    }
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
