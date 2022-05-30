import { useState, useEffect } from "react";

import { StyledInspector, StyledDecorative } from "./styles";

import {
  LiveStatus,
  StationHeader,
  StationActivity,
  StationPopularity,
} from "./components";

import { useSelector } from "react-redux";

import { selectShowInspector } from "common/store/AppSlice";
import { animated, useSpring, useTrail } from "@react-spring/web";

const Inspector = () => {
  // const [stationActivityData, setStationActivityData] = useState(new Map());
  const visible = useSelector(selectShowInspector);
  const spring = useSpring({
    config: {
      tension: 210,
      friction: 20,
    },
    transform: `translateX(${visible ? "0" : "-98"}%)`,
  });

  const springs = useTrail(5, {
    delay: 40,
    trail: 500,
    opacity: visible ? 1 : 0,
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
};

export default Inspector;
