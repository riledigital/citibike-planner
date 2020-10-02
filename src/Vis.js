import React from "react";
import { VegaLite } from "react-vega";
import { isNullOrFalse } from "vega-lite";
import "./Vis.css";

function Vis(props) {
  //   const visRef = useRef(null);
  // const spec = {
  //   height: "container",
  //   width: "container",
  //   mark: "bar",
  //   encoding: {
  //     x: { field: "a", type: "ordinal" },
  //     y: { field: "b", type: "quantitative" },
  //   },
  //   data: { name: "table" }, // note: vega-lite data attribute is a plain object instead of an array
  // };
  let currentHour = props.currentHour;

  const spec = {
    data: { url: props.data },
    height: 200,
    width: "container",
    config: {
      mark: { bar: {} },
      title: { titleFont: "Jost", titleFontSize: 16, titleColor: "white" },

      axis: {
        domain: false,
        domainOpacity: 0.4,
        gridOpacity: 0.4,
        labelFont: "Jost",
        labelColor: "white",
        titleFontSize: 16,
        titleFont: "Jost",
        titleFontSize: 16,
        titleColor: "white",
      },
    },
    background: "transparent",
    layer: [
      {
        mark: {
          type: "bar",
          color: "white",
        },
        encoding: {
          x: {
            type: "ordinal",
            field: "start_hour",
            title: "Hour",
          },
          y: {
            type: "quantitative",
            aggregate: "mean",
            field: "sum",
            title: "Average count of rides",
          },
        },
      },
      {
        mark: { type: "rule", color: "blue" },
        data: {
          values: [
            {
              start_hour: currentHour,
            },
          ],
        },
        encoding: {
          x: {
            type: "ordinal",
            field: "start_hour",
            title: "Hour",
          },
          size: { value: 3 },
        },
      },
      {
        mark: {
          type: "text",
          style: "label",
          color: "white",
          dy: -10,
          fontWeight: "bold",
        },
        encoding: {
          text: {
            type: "quantitative",
            aggregate: "mean",
            field: "sum",
            format: ".0f",
            color: {
              condition: { test: "datum['start_hour'] >= 12", value: "#aaa" },
              value: "#fff",
            },
          },
          x: {
            type: "ordinal",
            field: "start_hour",
            title: "Hour",
          },
          y: { type: "quantitative", aggregate: "mean", field: "sum" },
        },
      },
    ],
    title: { color: "white", text: "Average trips per hour", font: "Jost" },
    $schema: "https://vega.github.io/schema/vega-lite/v4.8.1.json",
  };

  return props.data ? (
    <VegaLite className="vis-vl" spec={spec} />
  ) : (
    <p>Please click on a station on the map to view the activity details.</p>
  );
}

export default Vis;
