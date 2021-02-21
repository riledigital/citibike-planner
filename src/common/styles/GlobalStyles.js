import { css, createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

import FontJostBook from "./../fonts/subset-Jost-Book.woff2";
import FontJostHeavy from "./../fonts/subset-Jost-Heavy.woff2";

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
  --c-blue: #0a2472;
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
  --h-header: 32px;

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

/* App container*/

#App {
  -webkit-transform: translate3d(0,0,0);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  overflow: unset;
  z-index: 0;
}

.mapContainer {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0%;
  z-index: ${ZSPACE.map};
  cursor: pointer;
}

.mapboxgl-ctrl-top-right {

  top: calc(var(--margin-base) + 1rem );
}

.mapboxgl-ctrl {
  font-family: var(--font-main);
}


.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
  border-top-color: var(--c-blue);
}

.mapboxgl-popup-content {
  display: flex;
  flex-direction: column;
  min-height: 2rem;
  padding-right: 2rem;
}

.mapboxgl-popup-close-button {
  color: var(--c-white);
  padding: 1ch;
  margin-bottom: 1ch;
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
