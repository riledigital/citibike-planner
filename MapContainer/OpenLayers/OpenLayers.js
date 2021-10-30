import "ol/ol.css";
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import XYZ from "ol/source/XYZ";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

// Interactions
import Select from "ol/interaction/Select";
import { click } from "ol/events/condition";
import { singleClick, shiftKeyOnly } from "ol/events/condition";

import { useEffect, useRef, useState } from "react";
import { map } from "lodash";

import { StyledMapElement } from "./styles";
import { Fill, Stroke, Style, Text } from "ol/style";
import mapboxgl from "mapbox-gl";

//openlayers.org/en/latest/examples/vector-layer.html

const OpenLayers = ({
  handleClickPoint,
  srcGeojson = "/data/geojson/countries.geojson",
}) => {
  const element = useRef();
  const mapRef = useRef();

  const [map, setMap] = useState(null);

  const handleFeatureSelect = (e) => {
    console.log("Selected feature!");
    // debugger;
  };

  const style = new Style({
    fill: new Fill({
      color: "rgba(255, 255, 255, 0.6)",
    }),
    stroke: new Stroke({
      color: "#319FD3",
      width: 1,
    }),
    text: new Text({
      font: "12px Calibri,sans-serif",
      fill: new Fill({
        color: "#000",
      }),
      stroke: new Stroke({
        color: "#fff",
        width: 3,
      }),
    }),
  });

  useEffect(() => {
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        url: srcGeojson,
        format: new GeoJSON(),
      }),
      style: function (feature) {
        style.getText().setText(feature.get("name"));
        return style;
      },
    });
    const map = new Map({
      renderer: "webgl",
      layers: [
        new TileLayer({
          source: new XYZ({
            attributions: "CartoDB Voyager",
            url:
              "https://{a-c}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
            tilePixelRatio: 1, // THIS IS IMPORTANT
          }),
        }),
        // vectorLayer,
      ],
      target: element.current,
      view: new View({
        projection: "EPSG:3857",
        center: [-73.96923065185547, 40.751678516237334],
        zoom: 12,
      }),
    });
    const select = new Select({
      condition: click,
      toggleCondition: (e) => {
        const cond = shiftKeyOnly(e) && singleClick(e);
        return cond;
      },
    });
    select.on("select", handleFeatureSelect);
    map.addInteraction(select);
    setMap(map);
    map.on("singleclick", function (e) {
      console.log("Click:", e);
      console.log(select);
    });
    mapRef.current = map;
    return () => {
      // Remove the map on unmount
      mapRef.current = null;
    };
  }, [srcGeojson]);
  return <StyledMapElement ref={element} />;
};

export default OpenLayers;
