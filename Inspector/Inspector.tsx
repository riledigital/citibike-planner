"use client";
import { StyledInspector, StyledDecorative } from "./styles";
import { StationHeader } from "./components/StationHeader/StationHeader";
import { animated, useSpring, useTrail } from "@react-spring/web";
import { useStationState } from "common/MapState";

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
        {/* <StationActivity height={150} fill="white" /> */}
      </animated.div>
      <animated.div style={springs[3]}>{/* <LiveStatus /> */}</animated.div>
    </StyledInspector>
  );
}
