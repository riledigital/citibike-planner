import React from "react";
import { interpolateHcl, interpolate, scaleLinear } from "d3";

import {
  StyledMapLegend,
  StyledLabel,
  StyledFigure,
  StyledHeading,
} from "./styles.js";

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
    <StyledMapLegend>
      <StyledHeading>Legend</StyledHeading>
      <StyledFigure>
        <StyledLabel>Popularity</StyledLabel>
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
      </StyledFigure>
    </StyledMapLegend>
  );
};

export default MapLegend;
