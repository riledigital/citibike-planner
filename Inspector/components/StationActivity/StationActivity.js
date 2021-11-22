// https://observablehq.com/@d3/margin-convention
import React, { useEffect, useRef, useState } from "react";
import {
  extent,
  timeParse,
  timeFormat,
  scaleTime,
  scaleLinear,
  format,
} from "d3";
import { useTransition, animated } from "@react-spring/web";

import { dispatch, useSelector } from "react-redux";
import { selectStationFrequencyData } from "@/common/Store/AppSlice";

// import "./StationActivity.css";
import { StyledTooltip, StyledBarLabel } from "./styles";

const StationActivity = ({
  width = 400,
  height = 400,
  fill = "blue",
  textFill = "white",
}) => {
  const data = useSelector(selectStationFrequencyData);
  const formatHour = timeFormat("%_I %p");
  const parseTime = timeParse("%H");
  const formatDecimals = format(".2f");
  const margin = { top: 10, right: 5, bottom: 35, left: 5 };

  const [coords, setCoords] = useState({});
  const [showTooltip, setShowTooltip] = useState(null);
  const [tooltipText, setTooltipText] = useState(null);
  const [showLabels, setShowLabels] = useState(false);

  let xScale =
    data &&
    scaleTime()
      .domain([6, 24])
      .range([margin.left, width - margin.right]);

  let yScale =
    data &&
    scaleLinear()
      .domain(extent(data, (d) => d?.mean_rides))
      .range([height - margin.bottom, margin.top]);

  const currentHour = useRef();

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

  const transitions = useTransition(data, {
    from: (item) => ({ opacity: 0 }),
    enter: (item) => ({ opacity: 1 }),
    leave: (item) => ({ opacity: 0 }),
    unique: true,
    trail: 20,
  });

  const padding = 1;

  useEffect(() => {
    if (data) {
      currentHour.current = new Date().getHours();
      xScale =
        data &&
        scaleTime()
          .domain([6, 24])
          .range([margin.left, width - margin.right]);

      yScale =
        data &&
        scaleLinear()
          .domain(extent(data, (d) => d?.mean_rides))
          .range([height - margin.bottom, margin.top]);
    }
  }, [data]);

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
    <>
      <StyledTooltip>Test</StyledTooltip>
      <p>Average number of rides per hour:</p>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        onPointerOver={(e) => handleMouseOver(e)}
        onPointerOut={(e) => handleMouseOut(e)}
      >
        <g>
          {transitions((props, item, t, key) => (
            <React.Fragment key={key}>
              <animated.g style={props}>
                <g
                  onMouseOut={(e) => handleMouseOut(e)}
                  transform={`translate(${xScale(item?.start_hour)}, ${yScale(
                    item?.mean_rides
                  )})`}
                >
                  <rect
                    fill={fill}
                    width={width / 24 - padding}
                    height={`${
                      height - yScale(item?.mean_rides) - margin.bottom
                    }`}
                    onMouseMove={(e) => handleMouseMove(e, e.pageX, e.pageY)}
                  />
                  <StyledBarLabel
                    textAnchor="left"
                    dx="3px"
                    dy="-.25em"
                    fill={textFill}
                    fontSize="8px"
                    fontWeight="800"
                    style={{ opacity: showLabels ? 1.0 : 0 }}
                  >
                    {Number.parseFloat(item?.mean_rides).toFixed(0)}
                  </StyledBarLabel>

                  <StyledBarLabel
                    textAnchor="left"
                    dx="3px"
                    dy={height - yScale(item?.mean_rides)}
                    fill={textFill}
                    fontSize="8px"
                    fontWeight="800"
                    style={{ opacity: showLabels ? 1.0 : 0 }}
                  >
                    {formatTime(item?.start_hour)}
                  </StyledBarLabel>
                </g>
              </animated.g>
            </React.Fragment>
          ))}
        </g>
      </svg>
    </>
  );
};

export default StationActivity;
