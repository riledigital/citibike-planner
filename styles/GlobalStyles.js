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
`;

export default GlobalStyle;
