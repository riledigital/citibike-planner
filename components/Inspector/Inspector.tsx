"use client";
import { StationHeader } from "./components/StationHeader";
import { StationActivity } from "./components/StationActivity/StationActivity";
import { LiveStatus } from "./components/LiveStatus";
import { animated, useSpring, useTrail } from "@react-spring/web";
import { useStationState } from "common/MapState";
import styled from "styled-components";
import { DEVICES, ZSPACE } from "styles/GlobalStyles";

const StyledInspector = styled(animated.div)`
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
export function Inspector() {
  const { showInspector } = useStationState();
  const spring = useSpring({
    config: {
      tension: 210,
      friction: 20,
    },
    transform: `translateX(${showInspector ? "0" : "-98"}%)`,
  });

  const springs = useTrail(5, {
    delay: 40,
    trail: 500,
    opacity: showInspector ? 1 : 0,
  });

  return (
    <StyledInspector {...{ style: spring }}>
      <StyledDecorative>Station Info</StyledDecorative>
      <animated.div style={springs[1]}>
        <StationHeader />
      </animated.div>
      <animated.div style={springs[2]}>
        <StationActivity height={150} fill="white" />
      </animated.div>
      <animated.div style={springs[3]}>
        <LiveStatus />
      </animated.div>
    </StyledInspector>
  );
}
