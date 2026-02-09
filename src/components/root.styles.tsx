import { createGlobalStyle } from "styled-components";

const RootStyles = createGlobalStyle`
  /* Import Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap');

  :root {
    /* Font family variables */
    --font-base: 'Inter', 'Roboto', 'Segoe UI', 'Helvetica Neue', sans-serif;

    /* Width variables */
    --width-xs: 390px;
    --width-sm: 430px;
    --width-md: 693px;
    --width-lg: 1366px;

    /* Font sizes */
    --font-xxs: 8px;      /*...*/
    --font-xs: 0.75em;    /* 12px / 16 */
    --font-sm: 0.875em;   /* 14px / 16 */
    --font-md: 1.0625em;  /* 17px / 16 */
    --font-lg: 1.25em;    /* 20px / 16 */
    --font-xl: 1.75em;    /* 28px / 16 */

    /* Spacing */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 12px;
    --spacing-lg: 16px;
    --spacing-xl: 24px;

    /* Border radius */
    --radius-xs: 4px;
    --radius-sm: 8px;
    --radius-md: 17px;
    --radius-lg: 35%;
    --round: 50%;
    --squicle: 20px/20px;

    /* Background colors */
    --bg-white: #FFFFFF;
    --bg-grey: #FAFAFA;
    --bg-black: #0C1015;
    --bg-subtle: #ffffff66;
    --bg-trans: rgba(0, 0, 0, 0.05);


    /* Text colors */
    --text-white: #e2e5e9;
    --text-blue: #0078FF;
    --text-red: #eb3b5a;
    --text-black: var(--bg-black);
    --text-bold: #161525;
    --text-muted: #465a6a;
    --text-grey: #757a80;    
    /* --text-grey: #757575;   */

    /* Border colors */
    --border-light: #EBEBEB;
    --border-subtle: #e0e2ec;
    --border-gray: #dddddd;
    --border-muted: #66667536;
  }

  /* Generic Resets */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-base);
    background-color: var(--bg-white);
    color: var(--text-main);
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:visited {
    color: var(--text-muted);
  }

  button {
    font-family: var(--font-base);
    cursor: pointer;
    border: none;
    background: none;
  }

  input,
  textarea {
    font-family: var(--font-base);
    outline: none;
    border: 1px solid var(--border-subtle);
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  @media (max-width: var(--width-sm)) {
    body {
      font-size: 13px;
    }
  }
`;

export default RootStyles;
