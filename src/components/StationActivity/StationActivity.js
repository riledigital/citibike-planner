// https://observablehq.com/@d3/margin-convention
import React, { useEffect, useState } from "react";
import { extent, timeParse, timeFormat, scaleTime, scaleLinear } from "d3";
import { useTransition, animated } from "react-spring";

import styles from "./StationActivity.module.css";

const StationActivity = ({
  data = [],
  width = 400,
  height = 400,
  fill = "blue",
  textFill = "white",
}) => {
  const [items, setItems] = useState([]);

  const transitions = useTransition(data, (item) => item.start_hour, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    unique: true,
    reset: true,
    trail: 20,
  });

  const formatHour = timeFormat("%_I %p");
  const parseTime = timeParse("%H");
  const margin = { top: 10, right: 5, bottom: 35, left: 5 };
  let extentOut = data ? extent(data, (d) => d.mean_rides) : [0, 100];
  const xScale = scaleTime()
    .domain([6, 24])
    .range([margin.left, width - margin.right]);
  let yScale = scaleLinear()
    .domain(extentOut)
    .range([height - margin.bottom, margin.top]);

  const padding = 1;
  const currentHour = new Date().getHours();
  useEffect(() => {
    extentOut = data ? extent(data, (d) => d.mean_rides) : [0, 100];
    yScale = scaleLinear().domain(extentOut).range([height, 0]);
  });

  return !data ? (
    <div>
      <h3 className={styles.heading}>Average trips per hour</h3>
      <p>Select a station on the map to view activity trends.</p>
    </div>
  ) : (
    <figure className={styles["barchart__hours"]}>
      <h3 className={styles.heading}>Average trips per hour</h3>
      <svg viewBox={`0 0 ${width} ${height}`}>
        <text
          className={styles.axisTitle}
          textAnchor="middle"
          fontFamily="Jost"
          fontSize="8px"
          fontWeight="800"
          fill={textFill}
          transform={`translate(${width / 2} ${height - 4})`}
        >
          {/* Time of day */}
        </text>
        <g className={styles.axisLabels}>
          {data.map((d, idx) => {
            return (
              <g
                key={idx}
                className={styles.axisBottom}
                transform={`
              translate(${xScale(d.start_hour) + margin.left}, ${
                  height - margin.bottom / 1.2
                })
              rotate(${45}) `}
              >
                <text
                  className={styles.axisBottom}
                  fill={textFill}
                  fontSize="9px"
                  fontFamily="Jost"
                  fontWeight="600"
                  textAnchor="left"
                >
                  {d.start_hour >= 6
                    ? formatHour(parseTime(d.start_hour))
                    : null}
                </text>
              </g>
            );
          })}
        </g>
        <g className={styles.bars}>
          {transitions.map(({ item, props, key }) => (
            <React.Fragment key={key}>
              <animated.g style={props}>
                <g
                  transform={`translate(${xScale(item.start_hour)}, ${yScale(
                    item.mean_rides
                  )})`}
                  className={styles.svgBar}
                >
                  <rect
                    className={
                      styles[
                        item.start_hour === currentHour ? "current_hour" : null
                      ]
                    }
                    fill={fill}
                    width={width / 24 - padding}
                    height={`${
                      height - yScale(item.mean_rides) - margin.bottom
                    }`}
                  >
                    <title>
                      Average of {item.mean_rides} at hour {item.start_hour}
                    </title>
                  </rect>
                  <text
                    className={styles.barLabel}
                    textAnchor="left"
                    dx="3px"
                    dy="-.25em"
                    fill={textFill}
                    fontSize="8px"
                    fontFamily="Jost"
                    fontWeight="800"
                  >
                    {Number.parseFloat(item.mean_rides).toFixed(0)}
                  </text>
                </g>
              </animated.g>
            </React.Fragment>
          ))}
        </g>
      </svg>
    </figure>
  );
};

export default StationActivity;
