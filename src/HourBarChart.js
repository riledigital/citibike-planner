// https://observablehq.com/@d3/margin-convention
import React, { useEffect } from "react";
import { scaleTime, scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import "./HourBarChart.css";

const HourBarChart = ({ data, width = 200, height = 200, fill = "blue" }) => {
  const margin = { top: 15, right: 15, bottom: 15, left: 15 };
  const extentOut = data ? extent(data, (d) => d.mean_rides) : [0, 50];
  const xScale = scaleTime()
    .domain([0, 24])
    .range([margin.left, width - margin.right]);
  const yScale = scaleLinear()
    .domain(extentOut)
    .range([height - margin.bottom, margin.top]);

  const currentHour = new Date().getHours();
  useEffect(() => {
    // Set up our scales etc
  });

  return !data ? null : (
    <figure className="barchart__hours">
      <svg viewBox={`0 0 ${width} ${height}`}>
        {data.map((d, idx) => (
          <g
            transform={`translate(${xScale(d.start_hour)}, ${yScale(
              d.mean_rides
            )})`}
          >
            <rect
              className={d.start_hour === currentHour ? "current_hour" : null}
              fill={fill}
              width={width / 24 - 4}
              height={`${yScale(0) - yScale(d.mean_rides)}`}
            >
              <title>
                Average of {d.mean_rides} at hour {d.start_hour}
              </title>
            </rect>
            <text
              className="bar-label"
              fill="white"
              text-anchor="middle"
              dx=".5em"
              dy="pm-.25em"
            >
              {d.start_hour}
            </text>
            {currentHour === d.start_hour ? (
              <text
                className="bar-label"
                transform="rotate(-90)"
                dy={width / 20 / 2}
              >
                Avg of {Number.parseFloat(d.mean_rides).toFixed(2)} at
                {d.start_hour}:00
              </text>
            ) : null}
          </g>
        ))}
      </svg>
    </figure>
  );
};

export default HourBarChart;
