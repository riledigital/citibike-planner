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
import { useSpring, useTrail } from "@react-spring/web";

const Inspector = () => {
  // const [stationActivityData, setStationActivityData] = useState(new Map());
  const visible = useSelector(selectShowInspector);
  const spring = useSpring({
    config: {
      tension: 210,
      friction: 20,
    },
    transform: `translateX(${visible ? "0" : "-100"}%)`,
  });

  const springs = useTrail(5, {
    trail: 1000,
    opacity: visible ? 1 : 0,
  });

  return (
    <StyledInspector {...{ style: spring }}>
      <StyledDecorative style={springs[0]}>Station Info</StyledDecorative>
      <StationHeader style={springs[1]} />
      <StationActivity height={150} fill="white" />
      <LiveStatus />
    </StyledInspector>
  );
};

export default Inspector;
