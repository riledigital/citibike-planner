import { max } from "d3-array";
import { scaleBand, scaleLinear, scaleRadial } from "d3-scale";
import { interpolatePuOr } from "d3-scale-chromatic";
import { arc } from "d3-shape";
import { useFrequency } from "hooks/useFrequency";
import { range } from "lodash-es";
import { useState } from "react";
import { formatAMPM, formatTime } from "./lib";

const RadialVis = ({ stationId = null, ...props }) => {
  const { data } = useFrequency(stationId);
  const height = 400;
  const width = height;
  const innerRadius = 60;
  const outerRadius = height / 2;

  const maxRides = max(data?.map(({ counts }) => counts) ?? [100]);

  const x = scaleBand()
    .domain(range(0, 24))
    .range([0, 2 * Math.PI]);

  const y = scaleRadial()
    .domain([0, maxRides])
    .range([innerRadius, outerRadius])
    .clamp(true);

  const fill = (x) => {
    const normalized = scaleLinear().domain([5, 22]).range([0, 1]).clamp(true)(
      x
    );
    return interpolatePuOr(normalized);
  };

  const arcGen = ({ counts, start_hour }) =>
    arc()
      .innerRadius(innerRadius)
      .outerRadius(y(counts))
      .startAngle(x(start_hour))
      .endAngle(x(start_hour) + x.bandwidth())
      .padAngle(1)
      .padRadius(Math.PI * 2);

  const centroidGen = ({ counts, start_hour }) =>
    arc()
      .innerRadius(innerRadius)
      .outerRadius(y(maxRides) + 60)
      .startAngle(x(start_hour))
      .endAngle(x(start_hour) + x.bandwidth())
      .padAngle(1)
      .padRadius(Math.PI * 2);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: 300, height: 300, margin: "auto" }}
      {...props}
    >
      <g style={{ transform: `translate(${width / 2}px,${width / 2}px)` }}>
        {data?.map((item, i) => {
          let d = arcGen(item)();
          let c = centroidGen(item).centroid();
          return (
            // @ts-ignore
            <g key={i} title={JSON.stringify(item)}>
              <path d={d} fill={fill(item.start_hour)}></path>
              <text
                fontSize=".8rem"
                textAnchor="middle"
                rotate={x(item.start_hour)}
                {...{
                  x: c[0],
                  y: c[1],
                }}
              >
                {formatTime(item.start_hour)} {formatAMPM(item.start_hour)}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default RadialVis;
