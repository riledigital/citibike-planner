// https://observablehq.com/@d3/margin-convention
import { selectStationFrequencyData } from "common/store/AppSlice";
import { animated, useTransition } from "@react-spring/web";
import { format, scaleLinear, scaleTime, timeFormat, timeParse } from "d3";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { StyledBarLabel } from "./styles";

const RADIAL_PLOT = Symbol("RADIAL_PLOT");
const BAR_PLOT = Symbol("BAR_PLOT");

const BarPlot = ({
  width = 400,
  height = 300,
  fill = "var(--c-white)",
  textFill = "var(--c-white)",
}) => {
  const timeRanges = [6, 22];
  const timeRangeCount = timeRanges[1] - timeRanges[0];

  const yRange = [0, 60];

  const data = useSelector(selectStationFrequencyData)?.filter(
    (d) => d.start_hour > timeRanges[0] && d.start_hour <= timeRanges[1]
  );
  const formatHour = timeFormat("%_I %p");
  const parseTime = timeParse("%H");
  const formatDecimals = format(".2f");

  const [coords, setCoords] = useState({});
  const [showTooltip, setShowTooltip] = useState(null);
  const [tooltipText, setTooltipText] = useState(null);
  const [showLabels, setShowLabels] = useState(false);

  const transitions = useTransition(data, {
    from: (item) => ({ transform: `scaleX(1)`, opacity: 0 }),
    update: (item) => ({ opacity: 1 }),
    enter: (item) => ({ opacity: 1 }),
    leave: (item) => ({ transform: `scaleX(0)` }),
    unique: true,
    trail: 20,
  });

  const currentHour = useRef();

  currentHour.current = new Date().getHours();

  const [xScale] = useState(() =>
    scaleTime().domain([6, 22]).range([0, width]).clamp(true)
  );

  const [yScale] = useState(() =>
    scaleLinear().domain([0, 50]).range([0, height]).clamp(true)
  );

  const handleMouseOut = (e) => {
    setShowTooltip(false);
    setShowLabels(false);
  };

  const handleMouseOver = (e, item) => {
    setShowLabels(true);
    setTooltipText(`Average of ${formatDecimals(
      item?.mean_rides
    )} rides started/hour at
    ${item?.start_hour}:00`);
  };

  const handleMouseMove = (e, pageX, pageY) => {
    setShowTooltip(true);
    setCoords({ x: e.clientX, y: e.clientY });
  };
  const padding = 6;

  if (!data || !xScale || !yScale) {
    return <>No data available.</>;
  }

  const formatTime = (time) => {
    if (time > 12) {
      return `${Number.parseFloat(time).toFixed(0) - 12}`;
    } else {
      return `${Number.parseFloat(time).toFixed(0)}`;
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      onPointerOver={(e) => handleMouseOver(e)}
      onPointerOut={(e) => handleMouseOut(e)}
      viewBox={[0, 0, width, height].join(" ")}
      preserveAspectRatio="xMidYMin meet"
      {...{ width, height }}
    >
      {transitions((props, item, t, key) => (
        <React.Fragment key={key}>
          <animated.g
            style={{ opacity: props.opacity }}
            onMouseOut={(e) => handleMouseOut(e)}
            transform={`translate(${xScale(item?.start_hour)}, ${yScale(
              yScale(yRange[1])
            )})`}
          >
            <animated.rect
              fill={fill}
              width={width / timeRangeCount - padding}
              height={`${yScale(item?.mean_rides)}`}
              onMouseMove={(e) => handleMouseMove(e, e.pageX, e.pageY)}
              style={{ transform: `scaleY(-1)` }}
            />
            <StyledBarLabel
              textAnchor="center"
              dx="1"
              dy="-6"
              fill={textFill}
              fontSize="12"
              fontWeight="800"
              style={{ opacity: showLabels ? 1.0 : 0 }}
            >
              {Number.parseFloat(item?.mean_rides).toFixed(0)}
            </StyledBarLabel>

            <StyledBarLabel
              textAnchor="center"
              dy={height - yScale(item?.mean_rides)}
              fill="black"
              fontSize="14"
              fontWeight="800"
              style={{ opacity: showLabels ? 1.0 : 0 }}
            >
              {formatTime(item?.start_hour)}
            </StyledBarLabel>
          </animated.g>
        </React.Fragment>
      ))}
    </svg>
  );
};

export default BarPlot;
