import { css, createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const DEVICES = {
  // Media query mixin
  tablet: "screen and (min-width: 700px)",
  desktop: "screen and (min-width: 1000px)",
  "desktop-xl": " screen and (min-width: 768px)",
};

export const ZSPACE = {
  map: -100,
  inspector: 20,
  modal: 30,
  header: 50,
};

const GlobalStyle = createGlobalStyle`
${normalize}
/* Colors */
:root {
  --c-blue: hsl(225,83.9%,24.3%);
  --c-blue-dark: hsl(225,83.9%,15%);
  --c-blue-alpha: rgba(10, 36, 114, .8);
  --c-white: #fefefe;
  --c-black: #010203;
  --c-text: #0a2472;
  --c-links: #c0b8ff;
  --c-buttons: var(--c-links);
  --button-bg: var(--c-links);
  --button-bg-hover: #c2b9fe;
  --c-background: #ffffff;

  --theme-1: var(--c-links);
}
/* Typography */
:root {
  --font-main: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --font-size-base: 20px;
  --line-height-base: 1.4;
  --font-headings: var(--font-main);
}

/* Margins */
:root {
  --margin-base: 1rem;
  --margin-tablet: 1.25rem;
  --margin-desktop: 2rem;

/* Height of header */
  --h-thumbnav: 4rem;

 /* Border radius */
  --radius-s: 8px;
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
  font-weight: normal;
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

p {
  margin-bottom: 1rem;
}
`;

export const ButtonBase = css`
  background-color: var(--c-buttons);
  border: 0;
  border-radius: 9px;

  height: auto;
  width: auto;
  padding: 0.5ch 2ch;

  color: var(--c-black);
  font-size: 0.8rem;
  letter-spacing: 1px;
  text-align: center;
  font-weight: 900;

  text-transform: uppercase;

  :first-of-type {
    margin-right: 1ch;
  }
`;

export default GlobalStyle;
