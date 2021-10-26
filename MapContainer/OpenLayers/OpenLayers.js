import "ol/ol.css";
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import XYZ from "ol/source/XYZ";

import { useEffect, useRef, useState } from "react";
import { map } from "lodash";

import { StyledMapElement } from "./styles";
const attributions =
  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

const OpenLayers = ({ handleClickPoint }) => {
  const element = useRef();
  const mapRef = useRef();

  const [map, setMap] = useState(null);

  useEffect(() => {
    const map = new Map({
      layers: [
        // new TileLayer({
        //   source: new OSM(),
        // }),
        new TileLayer({
          source: new XYZ({
            attributions: attributions,
            url:
              "https://{a-c}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
            tilePixelRatio: 1, // THIS IS IMPORTANT
          }),
        }),
      ],
      target: element.current,
      view: new View({
        // projection: "EPSG:4326",
        center: [0, 0],
        zoom: 2,
      }),
    });
    setMap(map);
    mapRef.current = map;

    return () => {};
  }, []);
  return <StyledMapElement ref={element} />;
};

export default OpenLayers;
