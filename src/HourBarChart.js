// https://observablehq.com/@d3/margin-convention
import React, { useEffect } from "react";
import { scaleTime, scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import { timeParse, timeFormat } from "d3-time-format";
import "./HourBarChart.css";

const HourBarChart = ({ data, width = 200, height = 200, fill = "blue" }) => {
  const formatHour = timeFormat("%_I %p");
  const parseTime = timeParse("%H");
  const margin = { top: 30, right: 15, bottom: 30, left: 30 };
  const extentOut = data
    ? extent(data, (d) => d.mean_rides + d.mean_rides * 0.25)
    : [0, 100];
  const xScale = scaleTime()
    .domain([0, 24])
    .range([margin.left, width - margin.right]);
  const yScale = scaleLinear()
    .domain(extentOut)
    .range([height - margin.bottom, margin.top]);

  const padding = 2;
  const currentHour = new Date().getHours();
  useEffect(() => {});

  return !data ? null : (
    <figure className="barchart__hours">
      <svg viewBox={`0 0 ${width} ${height}`}>
        <text
          class="axisTitle"
          text-anchor="middle"
          fontFamily="sans-serif"
          fontSize="12px"
          fontWeight="800"
          fill="white"
          transform={`translate(${width / 2} ${height - margin.bottom / 2})`}
        >
          Time of day
        </text>
        {data.map((d, idx) => {
          return (
            <g
              class="axis-bottom"
              transform={`rotate(${45} ${xScale(d.start_hour) - margin.left} ${
                height - margin.bottom
              }) translate(${xScale(d.start_hour) - margin.left}, ${
                height - margin.bottom
              })`}
            >
              <text
                className="axis-bottom"
                fill="white"
                fontSize="8px"
                dy="-25px"
                fontFamily="sans-serif"
                fontWeight="800"
                text-anchor="left"
              >
                {formatHour(parseTime(d.start_hour))}
              </text>
            </g>
          );
        })}
        {data.map((d, idx) => (
          <>
            <g
              transform={`translate(${xScale(d.start_hour) - margin.right}, ${
                yScale(d.mean_rides) - margin.bottom
              })`}
            >
              <rect
                className={d.start_hour === currentHour ? "current_hour" : null}
                fill={fill}
                width={width / 24 - padding}
                height={`${yScale(0) - yScale(d.mean_rides)}`}
              >
                <title>
                  Average of {d.mean_rides} at hour {d.start_hour}
                </title>
              </rect>
              <text
                // className="bar-label"
                fill="white"
                text-anchor="middle"
                dx=".75em"
                dy="-.25em"
                fontSize="8px"
                fontFamily="sans-serif"
                fontWeight="800"
              >
                {Number.parseFloat(d.mean_rides).toFixed(0)}
              </text>

              {!!0 && currentHour === d.start_hour ? (
                <text
                  className="bar-label"
                  transform="rotate(-90)"
                  dy={width / 20 / 2}
                >
                  Avg of {Number.parseFloat(d.mean_rides).toFixed(2)} at
                  {d.start_hour}
                </text>
              ) : null}
            </g>
          </>
        ))}
      </svg>
    </figure>
  );
};

export default HourBarChart;
