import React from "react";
import { arc, scaleBand, scaleRadial, max } from "d3";

const RadialBarChart = ({ data }) => {
  const innerRadius = 100;
  const outerRadius = 200;

  const x = scaleBand()
    .domain([0, 23])
    .range([0, 2 * Math.PI])
    .align(0);

  const y = scaleRadial
    .domain([0, max(data, d => d.mean_rides)])
    .range([innerRadius, outerRadius]);

  const arc = arc()
    .innerRadius(d => y(d.mean_rides))
    .outerRadius(d => y(d.mean_rides))
    .startAngle(d => x(d.start_hour))
    .endAngle(d => x(d.start_hour) + x.bandwidth())
    .padAngle(0.01)
    .padRadius(innerRadius)
  return <>
    <svg viewBox="0 0 600 600">
{data.map((d, i) => (<path></path>))}
    </svg>
    </>
  );
};

export default RadialBarChart;
