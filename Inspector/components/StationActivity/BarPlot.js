/* eslint-disable */
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
import { useCallback } from "react";

const RADIAL_PLOT = Symbol("RADIAL_PLOT");
const BAR_PLOT = Symbol("BAR_PLOT");

const PADDING_BOTTOM = 40;

const BarPlot = ({
  width = 400,
  height = 250,
  fill = "var(--c-blue)",
  textFill = "var(--c-background)",
}) => {
  const timeRanges = [6, 22];
  const timeRangeCount = timeRanges[1] - timeRanges[0];
  let data = useSelector(selectStationFrequencyData);
  data = data?.filter(
    (d) => d.start_hour > timeRanges[0] && d.start_hour <= timeRanges[1]
  );
  const formatHour = timeFormat("%_I %p");
  const parseTime = timeParse("%H");
  const formatDecimals = format(".2f");

  const [coords, setCoords] = useState({});
  const [showTooltip, setShowTooltip] = useState(null);
  const [tooltipText, setTooltipText] = useState(null);
  const [showLabels, setShowLabels] = useState(false);
  const maxYDefault =
    max(data?.map(({ mean_rides }) => mean_rides) ?? []) ?? 100;
  const yRange = [0, maxYDefault];

  // prettier-ignore
  const yScale = scaleLinear()
    .domain(yRange)
    .range([0, height - PADDING_BOTTOM])
    .clamp(true);
  const currentHour = useRef();

  currentHour.current = new Date().getHours();

  const xScale = scaleTime()
    .domain(timeRanges)
    .range([0, width - 32])
    .clamp(false);

  const eventRefs = useMergeRefs(
    useEventListenerRef("mousemove", (e, pageX, pageY) => {
      setShowTooltip(true);
      setCoords({ x: e.clientX, y: e.clientY });
    }),
    useEventListenerRef("mouseout", (e) => {
      // setShowTooltip(false);
      // setShowLabels(false);
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

  // prettier-ignore
  const barWidth = (width / timeRangeCount) - padding;

  function formatAMPM(hr) {
    return hr >= 12 ? "PM" : "AM";
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={[0, -20, width, height + 20].join(" ")}
      preserveAspectRatio="xMidYMin meet"
      ref={eventRefs}
      className={styles["svgContainer"]}
      {...{ width, height }}
    >
      {data.map(({ start_hour, mean_rides }, t, key) => (
        <g
          key={key}
          transform={`translate(
                ${xScale(start_hour)},
              ${yScale(yRange[1])})`}
        >
          <rect
            fill={fill}
            width={barWidth}
            height={yScale(mean_rides)}
            style={{ transform: `scaleY(-1)` }}
          />
          {true && (
            <StyledBarLabel
              textAnchor="center"
              dx="1"
              dy={-yScale(mean_rides) - 4}
              fill="var(--c-black)"
              fontSize="12"
              fontWeight="800"
              style={{ opacity: showLabels ? 1.0 : 0 }}
            >
              {Number.parseFloat(mean_rides).toFixed(0)}
            </StyledBarLabel>
          )}

          <StyledBarLabel
            textAnchor="center"
            dy={10}
            dx={barWidth / 4}
            fill="var(--c-foreground)"
            fontSize="10"
            fontWeight="800"
            style={{
              opacity: showLabels ? 1 : 0,
              transform: "rotate(45deg)",
            }}
          >
            {formatTime(start_hour)} {formatAMPM(start_hour)}
          </StyledBarLabel>
        </g>
      ))}
    </svg>
  );
};

export default BarPlot;
