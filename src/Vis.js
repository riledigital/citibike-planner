import React from "react";
import { VegaLite } from "react-vega";
// import { isNullOrFalse } from "vega-lite";
import "./Vis.css";

function Vis(props) {
  const { currentHour, data } = props;
  const barData = { table: data };

  const spec = {
    data: { name: "table" },
    height: "container",
    width: "container",
    autosize: {
      type: "fit",
      contains: "padding",
    },
    config: {
      mark: { bar: {} },
      title: { titleFont: "Jost", titleFontSize: 16, titleColor: "white" },

      axis: {
        domain: false,
        gridOpacity: 0.4,
        labelFont: "Jost",
        labelColor: "white",
        titleFontSize: 16,
        titleFont: "Jost",
        titleFontSize: 16,
        titleColor: "white",
      },
    },
    encoding: { axis: { domain: false } },
    background: "transparent",
    layer: [
      {
        mark: {
          type: "bar",
          color: "white",
        },
        encoding: {
          axis: { domain: false },
          opacity: {
            condition: {
              test: `datum['start_hour'] !== ${currentHour}`,
              value: ".5",
            },
          },
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
        mark: {
          type: "text",
          style: "label",
          color: "white",
          dy: -10,
          fontWeight: "bold",
        },
        encoding: {
          axis: { domain: false },

          text: {
            type: "quantitative",
            aggregate: "mean",
            field: "sum",
            format: ".0f",
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
    <div className="vis-vl">
      <VegaLite spec={spec} data={barData} />
    </div>
  ) : (
    <p>Please click on a station on the map to view the activity details.</p>
  );
}

export default Vis;
