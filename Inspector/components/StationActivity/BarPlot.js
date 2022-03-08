// https://observablehq.com/@d3/margin-convention
import { useEventListenerRef, useMergeRefs, useMouse } from "rooks";
import { selectStationFrequencyData } from "common/store/AppSlice";
import { animated, useTransition } from "@react-spring/web";
import { format, scaleLinear, scaleTime, timeFormat, timeParse, max } from "d3";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { StyledBarLabel } from "./styles";
import clsx from "clsx";
import styles from "./BarPlot.module.css";

const RADIAL_PLOT = Symbol("RADIAL_PLOT");
const BAR_PLOT = Symbol("BAR_PLOT");

const BarPlot = ({
  width = 400,
  height = 250,
  fill = "var(--c-white)",
  textFill = "var(--c-blue)",
}) => {
  const timeRanges = [6, 22];
  const timeRangeCount = timeRanges[1] - timeRanges[0];
  const data = useSelector(selectStationFrequencyData)?.filter(
    (d) => d.start_hour > timeRanges[0] && d.start_hour <= timeRanges[1]
  );
  const yRange = [0, 50];

  const formatHour = timeFormat("%_I %p");
  const parseTime = timeParse("%H");
  const formatDecimals = format(".2f");

  const [coords, setCoords] = useState({});
  const [showTooltip, setShowTooltip] = useState(null);
  const [tooltipText, setTooltipText] = useState(null);
  const [showLabels, setShowLabels] = useState(false);
  const currentHour = useRef();

  currentHour.current = new Date().getHours();

  const xScale = scaleTime().domain(timeRanges).range([0, width]).clamp(true);
  // const [xScale] = useState(() =>
  //   scaleTime().domain(timeRanges).range([0, width]).clamp(true)
  // );

  const yScale = scaleLinear().domain(yRange).range([0, height]).clamp(true);
  // const [yScale] = useState(() =>
  //   scaleLinear().domain(yRange).range([0, height]).clamp(true)
  // );

  const eventRefs = useMergeRefs(
    useEventListenerRef("mousemove", (e, pageX, pageY) => {
      setShowTooltip(true);
      setCoords({ x: e.clientX, y: e.clientY });
    }),
    useEventListenerRef("mouseout", (e) => {
      setShowTooltip(false);
      setShowLabels(false);
    }),
    useEventListenerRef("mouseover", function (e, item) {
      setShowLabels(true);
      setTooltipText(`Average of ${formatDecimals(
        item?.mean_rides
      )} rides started/hour at
    ${item?.start_hour}:00`);
    })
  );

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

  const barWidth = width / timeRangeCount - padding;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={[0, 0, width, height].join(" ")}
        preserveAspectRatio="xMidYMin meet"
        ref={eventRefs}
        {...{ width, height }}
      >
        {data.map((item, t, key) => (
          <React.Fragment key={t}>
            <g
              transform={`translate(
                ${xScale(item?.start_hour)},
              ${yScale(yRange[1])})`}
            >
              <rect
                fill={fill}
                width={width / timeRangeCount - padding}
                height={yScale(item?.mean_rides)}
                style={{ transform: `scaleY(-1)` }}
              />
              {true && (
                <StyledBarLabel
                  textAnchor="center"
                  dx="1"
                  dy={-yScale(item?.mean_rides) + 13}
                  fill={textFill}
                  fontSize="12"
                  fontWeight="800"
                  style={{ opacity: showLabels ? 1.0 : 0 }}
                >
                  {Number.parseFloat(item?.mean_rides).toFixed(0)}
                </StyledBarLabel>
              )}

              <StyledBarLabel
                textAnchor="center"
                dy={-2}
                dx={barWidth / 4}
                fill={textFill}
                fontSize="11"
                fontWeight="800"
                style={{ opacity: showLabels ? 1 : 0 }}
              >
                {formatTime(item?.start_hour)}
              </StyledBarLabel>
            </g>
          </React.Fragment>
        ))}
      </svg>
    </>
  );
};

export default BarPlot;
