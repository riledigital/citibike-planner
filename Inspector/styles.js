import styled from "styled-components";
import { DEVICES, ZSPACE } from "/styles/GlobalStyles";
import { animated } from "@react-spring/web";

export const StyledInspector = styled(animated.div)`
  --c-background: var(--c-white);
  --c-foreground: var(--c-black);

  contain: layout;
  isolation: isolate;
  border: 0;
  box-shadow: 0px 3px 6px 2px rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;

  background: var(--c-background);
  color: var(--c-foreground);

  display: flex;
  flex-flow: column nowrap;
  gap: 0.5rem;

  z-index: ${ZSPACE.inspector};

  position: absolute;
  top: 15vh;

  left: var(--margin-base);
  z-index: 10;

  padding: var(--margin-base);
  padding-right: calc(var(--margin-base) * 2);

  max-height: 80vh;
  height: fit-content;
  max-width: 90%;

  overflow: visible;

  @media ${DEVICES.tablet} {
    height: max-content;
    width: 30rem;
    padding: var(--margin-tablet);
    padding-right: calc(var(--margin-base) * 2);
  }
  @media ${DEVICES.desktop} {
    padding: var(--margin-desktop);
    padding-right: calc(var(--margin-base) * 2);
  }
`;

export const StyledDecorative = styled(animated.span)`
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
