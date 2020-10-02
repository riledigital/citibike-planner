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

  // const barData = {
  //   table: [
  //     { a: "A", b: 28 },
  //     { a: "B", b: 55 },
  //     { a: "C", b: 43 },
  //     { a: "D", b: 91 },
  //     { a: "E", b: 81 },
  //     { a: "F", b: 53 },
  //     { a: "G", b: 19 },
  //     { a: "H", b: 87 },
  //     { a: "I", b: 52 },
  //   ],
  // };

  return props.data ? <VegaLite className="vis-vl" spec={spec} /> : <p> .</p>;
}

export default Vis;
