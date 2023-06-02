import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}

  body {
    background-color: #f8f9fc;
  }

  button {
    border: none;
    cursor: pointer;
  }
`;

export default GlobalStyles;
