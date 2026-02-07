import { createGlobalStyle } from "styled-components";

const RootStyles = createGlobalStyle`
  :root {

    /* Width variables */
    --width-xs: 390px;
    --width-sm: 430px;
    --width-md: 693px;
    --width-lg: 1366px;

    /* Font sizes */
    --font-xs: 0.75em;      /* 12px / 16 */
    --font-sm: 0.875em;     /* 14px / 16 */
    --font-md: 1.0625em;    /* 17px / 16 */
    --font-lg: 1.25em;      /* 20px / 16 */
    --font-xl: 1.75em;      /* 28px / 16 */

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
    --bg-white: #ffffff;
    --bg-light: #ffffff99;
    --bg-subtle: #ffffff66;
    --bg-glass: #ffffff33;
    --bg-soft: #FAFAFA;
    /* --bg-v-soft: #f9f9fb; */

    /* Text colors */
    --text-blue: #0078FF;
    --text-purple: #551A8B;
    --text-orange: #ff6600;
    --text-green: #3c963c;
    --text-gray: var(--bg-gray);
    --text-black: #000000;
    --text-white: #e2e5e9;
    --text-muted: #465a6a;    /* Accessible gray/blue for descriptions */
  --text-main: #333333;     /* Standard body text */
  --text-deep: #1e2151;     /* Brand/Navy for headers */
  --text-dark: #1d2733;     /* UI text for labels */
  --text-bold: #161525;     /* High-contrast headings */
  --text-glass: #16161633;  /* Low-opacity text for watermarks/placeholders */
  --text-black: #000000;    /* Pure black */

    /* Border colors */
  --border-white: #ffffff;
  --border-light: #EEE;
  --border-subtle: #e0e2ec;
  --border-gray: #dddddd;
  --border-blue: #4086ce;
  --border-muted: #66667536;
  }
`;

export default RootStyles;
