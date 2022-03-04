import { selectStationFrequencyData } from "common/store/AppSlice";
import { max } from "d3-array";
import { scaleBand, scaleLinear, scaleRadial } from "d3-scale";
import { interpolatePuOr } from "d3-scale-chromatic";
import { arc } from "d3-shape";
import { range } from "lodash-es";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const RadialVis = (props) => {
  const data = useSelector(selectStationFrequencyData);
  const height = 400;
  const width = height;
  const innerRadius = 60;
  const outerRadius = height / 2;

  const [maxRides] = useState(() => max(data.map((d) => d.mean_rides)));

  const [x] = useState(() =>
    scaleBand()
      .domain(range(6, 22))
      .range([0, 2 * Math.PI])
  );
  const [y] = useState(() =>
    scaleRadial()
      .domain([0, maxRides])
      .range([innerRadius, outerRadius])
      .clamp(true)
  );

  const [fill] = useState(() => (x) => {
    const normalized = scaleLinear().domain([6, 22]).range([0, 1]).clamp(true)(
      x
    );
    return interpolatePuOr(normalized);
  });

  const [arcGen] = useState(() =>
    arc()
      .innerRadius(innerRadius)
      .outerRadius(({ mean_rides }) => y(mean_rides))
      .startAngle(function ({ start_hour }) {
        return x(start_hour);
      })
      .endAngle(({ start_hour }) => x(start_hour) + x.bandwidth())
      .padAngle(1)
      .padRadius(Math.PI * 2)
  );

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: 300, height: 300, margin: "auto" }}
      {...props}
    >
      <g style={{ transform: `translate(${width / 2}px,${width / 2}px)` }}>
        {data?.map((item, i) => (
          <path
            key={i}
            fill={fill(item.start_hour)}
            d={arcGen(item)}
            tite={JSON.stringify(item)}
          ></path>
        ))}
      </g>
    </svg>
  );
};

export default RadialVis;
