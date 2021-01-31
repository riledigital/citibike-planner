import styled from "styled-components";
import { DEVICES, ZSPACE } from "./../../styles/GlobalStyles";

const EASE_SLIDE = "cubic-bezier(0.16, 1, 0.3, 1)";
const SPEED = "180ms";
const DELAY = "1s";

export const StyledInspector = styled.div`
  border: 0;
  box-shadow: 0px 3px 6px 2px rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
  background: var(--c-blue);
  color: var(--c-white);
  display: flex;
  flex-direction: column;

  z-index: ${ZSPACE.inspector};

  position: absolute;
  top: 15vh;

  left: var(--margin-base);
  z-index: 10;

  padding: var(--margin-base);
  padding-right: calc(var(--margin-base) * 2);

  min-height: auto;
  max-height: 80vh;
  max-width: 90vw;

  overflow: visible;

  -webkit-transform: translate3d(0, 0, 0);

  transition: transform ${SPEED} ${DELAY} ${EASE_SLIDE};
  transform: ${({ visible }) =>
    visible ? "translateX(0)" : "translateX(-97%)"};

  @media ${DEVICES.tablet} {
    width: 450px;
    padding: var(--margin-tablet);
    padding-right: calc(var(--margin-base) * 2);
  }
  @media ${DEVICES.desktop} {
    padding: var(--margin-desktop);
    padding-right: calc(var(--margin-base) * 2);
  }
`;

export const StyledDecorative = styled.span`
  display: inline;
  position: absolute;
  height: auto;
  width: auto;
  top: 0;
  right: 0;

  padding: 0.5ch 0;
  transform-origin: 100% 100%;
  transform: rotate(-90deg);

  font-size: 0.7rem;
  font-weight: 900;
  text-transform: uppercase;
`;
