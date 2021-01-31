import styled from "styled-components";
import { DEVICES, ZSPACE } from "./../../styles/GlobalStyles";

const EASE_SLIDE = "cubic-bezier(0.16, 1, 0.3, 1)";
const SPEED = "180ms";
const DELAY = "1s";

export const StyledInspector = styled.dialog`
  border: 0;
  box-shadow: 0px 3px 6px 2px rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
  background: var(--c-blue);
  color: var(--c-white);
  display: grid;

  z-index: ${ZSPACE.inspector};
  /* position: absolute; */
  /* top: 15vh; */

  left: var(--margin-base);
  z-index: 10;

  padding: var(--margin-base);
  padding-right: calc(var(--margin-base) * 2);

  min-height: auto;
  max-height: 80vh;
  max-width: 90vw;

  transition: transform ${SPEED} ${DELAY} ${EASE_SLIDE};
  transform: ${({ visible }) =>
    visible ? "translateX(0)" : "translateX(-97%)"};

  @media ${DEVICES.tablet} {
    width: 450px;
    padding: var(--margin-tablet);
  }
  @media ${DEVICES.desktop} {
    padding: var(--margin-desktop);
  }
`;

export const StyledDecorative = styled.span`
  display: inline;
  position: absolute;
  height: auto;
  width: auto;
  top: 2.5%;
  right: 1.5%;
  transform-origin: 100% 100%;
  transform: rotate(-90deg);

  font-size: 0.7rem;
  font-weight: 900;
  text-transform: uppercase;
`;
