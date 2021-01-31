import { createGlobalStyle } from "styled-components";
import FontJostBook from "./../fonts/subset-Jost-Book.woff2";
import FontJostHeavy from "./../fonts/subset-Jost-Heavy.woff2";
// import FontJostHeavy from

export const DEVICES = {
  tablet: "screen and (min-width: 700px)",
  desktop: "screen and (min-width: 1000px)",
  "desktop-xl": " screen and (min-width: 768px)",
};

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Jost';
    src: url(${FontJostHeavy}) format('woff2');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Jost';
    src: url(${FontJostBook}) format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

/* Colors */
:root {
  --c-text: #0a2472;
  --c-links: #c0b8ff;
  --button-bg: var(--c-links);
  --button-bg-hover: #c2b9fe;
  --c-background: #ffffff;

  --theme-1: var(--c-links);
}
/* Typography */
:root {
  --font-main: "Jost", "Futura", sans-serif;
  --font-size-base: 18px;
  --line-height-base: 1.5;
  --font-headings: var(--font-main);
}

/* Margins */
:root {
  --margin-base: 1rem;
  --margin-tablet: 1.25rem;
}

/* Breakpoints */
:root {
  --bp-tablet: 600px;
  --bp-tablet-xl: 700px;
  --bp-desktop: 1000px;
  --bp-desktop-xl: 1400px;
}

/* Defaults */
body {
  font-family: var(--font-main);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  text-align: left;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  background: var(--c-background);
}

`;

export default GlobalStyle;
