import React from "react";
import { VegaLite } from "react-vega";
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
  const spec = {
    data: { url: props.data },
    height: 130,
    width: "container",
    mark: "bar",
    encoding: {
      x: { type: "ordinal", field: "start_hour" },
      y: { type: "quantitative", aggregate: "mean", field: "sum" },
    },
    title: "Average trips per hour",
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

  return props.data ? (
    <VegaLite className="vis-vl" spec={spec} data={{ table: props.data }} />
  ) : (
    <p>Select a station to view frequency.</p>
  );
}

export default Vis;
