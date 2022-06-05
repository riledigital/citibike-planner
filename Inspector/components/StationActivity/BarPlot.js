/* eslint-disable */
// https://observablehq.com/@d3/margin-convention
import { format, max, scaleLinear, scaleTime, timeFormat, timeParse } from "d3";
import { useFrequency } from "hooks/useFrequency";
import { useGetHourlySummaryQuery } from "common/store/CBServer";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useEventListenerRef, useMergeRefs } from "rooks";
import styles from "./BarPlot.module.css";
import { formatAMPM, formatTime } from "./lib";
import { useStationData } from "../../../hooks/useStationData";

const RADIAL_PLOT = Symbol("RADIAL_PLOT");
const BAR_PLOT = Symbol("BAR_PLOT");

const PADDING_BOTTOM = 40;

const BarPlot = ({
  width = 400,
  height = 250,
  fill = "var(--c-blue)",
  stationId = null,
  textFill = "var(--c-background)",
}) => {
  const { short_name } = useStationData();
  let { data } = useFrequency(stationId ?? short_name);
  // let { data } = useGetHourlySummaryQuery(stationId ?? short_name);

  const timeRanges = [6, 22];
  const timeRangeCount = timeRanges[1] - timeRanges[0];
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
  const maxY = max(data?.map(({ counts }) => counts) ?? []) ?? 100;

  const yRange = [0, maxY];
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

  useEffect(() => {
    if (stationId) {
      setShowLabels(true);
    }
  });

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

  // prettier-ignore
  const barWidth = (width / timeRangeCount) - padding;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={[0, -20, width, height + 20].join(" ")}
      preserveAspectRatio="xMidYMin meet"
      ref={eventRefs}
      className={styles["svgContainer"]}
      {...{ width, height }}
    >
      {data.map(({ start_hour, counts }, t, key) => (
        <g
          className={styles["group"]}
          key={t}
          transform={`translate(
                ${xScale(start_hour)},
              ${yScale(yRange[1])})`}
        >
          <rect
            className={styles["rect"]}
            fill={
              new Date().getHours() === start_hour
                ? "var(--c-blue-highlight)"
                : fill
            }
            width={barWidth}
            height={yScale(counts)}
            style={{ transform: `scaleY(-1)` }}
          />
          {true && (
            <text
              className={styles["text-label"]}
              textAnchor="center"
              dx="1"
              dy={-yScale(counts) - 4}
              fill="var(--c-black)"
              fontSize="12"
              fontWeight="800"
              style={{ opacity: showLabels ? 1.0 : 0 }}
            >
              {Number.parseFloat(counts).toFixed(0)}
            </text>
          )}

          <text
            className={styles["text-label"]}
            textAnchor="center"
            dy={10}
            dx={barWidth / 4}
            fill={
              new Date().getHours() === start_hour
                ? "red"
                : "var(--c-foreground)"
            }
            fontSize="10"
            fontWeight="800"
            style={{
              opacity: showLabels ? 1 : 0,
              transform: "rotate(45deg)",
            }}
          >
            {formatTime(start_hour)} {formatAMPM(start_hour)}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default BarPlot;
