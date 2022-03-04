// https://observablehq.com/@d3/margin-convention
import { selectStationFrequencyData } from "common/store/AppSlice";
import { useTransition } from "@react-spring/web";
import { scaleLinear, scaleTime } from "d3";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import BarPlot from "./BarPlot";
import RadialVis from "./RadialVis";

const RADIAL_PLOT = Symbol("RADIAL_PLOT");
const BAR_PLOT = Symbol("BAR_PLOT");

const StationActivity = ({
  width = 400,
  height = 400,
  fill = "var(--c-white)",
  textFill = "var(--c-white)",
}) => {
  const [type, setType] = useState(BAR_PLOT);

  const currentHour = useRef();

  currentHour.current = new Date().getHours();

  return (
    <StyledStationActivity
      onClick={(e) => {
        setType(type === BAR_PLOT ? RADIAL_PLOT : BAR_PLOT);
      }}
    >
      <p>Average number of rides per hour:</p>
      {renderVisType(type)}
    </StyledStationActivity>
  );
};

const renderVisType = (type) => {
  switch (type) {
    case RADIAL_PLOT: {
      return <RadialVis />;
    }
    case BAR_PLOT: {
      return <BarPlot />;
    }
    default: {
      return <BarPlot />;
    }
  }
};

export default StationActivity;

const formatTime = (time) => {
  if (time > 12) {
    return `${Number.parseFloat(time).toFixed(0) - 12}`;
  } else {
    return `${Number.parseFloat(time).toFixed(0)}`;
  }
};

const StyledStationActivity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  max-height: 20rem;
  width: 100%;
  overflow: auto;
`;
