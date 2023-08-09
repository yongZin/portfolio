import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  *{
    box-sizing:border-box;
  }
  input{
    padding:0;
    border:0;
    outline:none;
  }
`

export default GlobalStyle