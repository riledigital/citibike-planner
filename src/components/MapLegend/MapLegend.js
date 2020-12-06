import React from "react";
import { scaleLinear } from "d3-scale";
import { interpolateHcl, interpolate } from "d3-interpolate";
import styles from "./MapLegend.module.css";
const MapLegend = ({
  data = [...Array(5).fill()],
  width = 120,
  height = 40,
}) => {
  const legendLabel = {
    fontFamily: "Jost",
    fontSize: 10,
  };
  const color = scaleLinear()
    .domain([0, data.length])
    .range(["white", "blue"])
    .interpolate(interpolateHcl);
  const padding = 1;
  const radius = height / 6;

  if (!data) {
    return <div>No data present.</div>;
  }
  const margin = {
    left: 5,
    right: 20,
  };
  return (
    <div className={styles.container}>
      <h4 className={styles.heading}>Legend</h4>
      <figure style={{ maxWidth: "100%", margin: "none" }}>
        <p>Popularity</p>
        <svg viewBox={`0 0 ${width} ${height}`}>
          <g
            transform={`translate(${
              margin.left + (0 + 0.5) * ((width - margin.right) / data.length)
            }, 10)`}
          >
            <text style={legendLabel} textAnchor="middle">
              Least
            </text>
          </g>
          <g
            transform={`translate(${
              margin.left +
              (data.length - 1 + 0.5) * ((width - margin.right) / data.length)
            }, 10)`}
          >
            <text style={legendLabel} textAnchor="middle">
              Most
            </text>
          </g>
          {data.map((d, idx) => {
            return (
              <g key={idx}>
                <circle
                  cx={
                    margin.left +
                    (idx + 0.5) * ((width - margin.right) / data.length)
                  }
                  cy={height / 2}
                  r={radius}
                  fill={color(idx)}
                  stroke="black"
                  strokeWidth="1px"
                />
              </g>
            );
          })}
        </svg>
      </figure>
    </div>
  );
};

export default MapLegend;
