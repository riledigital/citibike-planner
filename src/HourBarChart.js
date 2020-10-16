import React, { useEffect } from "react";
import { scaleTime, scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import "./HourBarChart.css";

const HourBarChart = ({ data, width, height }) => {
  const extentOut = data ? extent(data, (d) => d.mean_rides) : [0, 50];
  const xScale = scaleTime().domain([0, 24]).range([0, width]);
  const yScale = scaleLinear().domain(extentOut).range([height, 0]);
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
              fill="white"
              width={width / 24 - 4}
              height={`${yScale(0) - yScale(d.mean_rides)}`}
            >
              <title>
                Average of {d.mean_rides} at hour {d.start_hour}
              </title>
            </rect>
            <text
              fill="black"
              //   x={`${xScale(d.start_hour)}`}
              y={yScale(d.mean_rides)}
              dy=".35em"
            >
              {d.start_hour}
            </text>
            <text transform="rotate(90)">
              Average of {d.mean_rides} at hour {d.start_hour}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
};

export default HourBarChart;