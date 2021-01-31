import styled from "styled-components";
import DEVICES from "./../../styles/GlobalStyles";

export const StyledInspector = styled.dialog`
  border: 0;
  box-shadow: 0px 3px 6px 2px rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
  background: var(--c-blue);
  color: var(--c-white);
  display: grid;

  /* position: absolute; */
  /* top: 15vh; */

  left: var(--margin-base);
  z-index: 50;

  padding: var(--margin-base);
  padding-right: calc(var(--margin-base) * 2);

  max-height: 80vw;
  max-width: 90vw;

  transition: transform 200ms 250ms ease-in-out;
  /* transform: ${({ visible }) =>
    visible ? "translateY(0)" : "translateY(110%)"}; */

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
