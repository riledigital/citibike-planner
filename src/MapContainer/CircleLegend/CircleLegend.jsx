import React, { useEffect } from "react";
import { interpolateLab, scaleLinear } from "d3";
const d3 = Object.assign({}, { scaleLinear, interpolateLab });

const CircleLegend = ({ cmap }) => {
  let colormap = [];

  useEffect(() => {
    const cScale = d3
      .scaleLinear()
      .domain([0, 5])
      .range(["white", "blue"])
      .interpolate(d3.interpolateLab);
    const range = [...Array(5).keys()];

    for (let i of range) {
      colormap.push({ i, col: cScale(i) });
    }
  });

  return (
    <div>
      Legend
      {colormap.map((c, idx) => (
        <span key={idx}>
          {c.i} for {c.col}
        </span>
      ))}
    </div>
  );
};

export default CircleLegend;
