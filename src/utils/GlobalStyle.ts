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
  
  button { 
    border: none;
    outline: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }

  * { 
    box-sizing: border-box;
  }
`
