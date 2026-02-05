import { createGlobalStyle } from "styled-components";

const RootStyles = createGlobalStyle`
  :root {

    /* Width variables */
    --width-xs: 390px;
    --width-sm: 430px;
    --width-md: 693px;
    --width-lg: 1208px;

    /* Font sizes */
    --font-xs: 12px;
    --font-sm: 14px;
    --font-md: 16px;
    --font-lg: 18px;
    --font-xl: 20px;

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

    /* Flex  */
    --flex-row: row;
    --flex-column: column;
    --flex-center: center;

    /* Background colors */
    --bg-berge: #f6f6ef;
    --bg-gray: #828282;
    --bg-white: #fff;

    /* Text colors */
    --text-blue: #0078FF;
    --text-purple: #551A8B;
    --text-orange: #ff6600;
    --text-green: #3c963c;
    --text-gray: var(--bg-gray);
    --text-dark: #222222;
    --text-black: #000000;
  }
`;

export default RootStyles;
