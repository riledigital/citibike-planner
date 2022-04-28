import Map, { Source, Layer } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import styles from "./ReactMap.module.css";
import clsx from "clsx";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectStationGeoJson } from "common/store/AppSlice";

const layerStyle = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
};
const ReactMap = () => {
  const stationsGeoJson = useSelector(selectStationGeoJson);
  return (
    <Map
      onClick={(e) => {
        let firstFeature;
        if (e.features) {
          firstFeature = e.features.at(0);
          const {
            properties: { station_id },
          } = firstFeature;
          console.debug(`Clicked station_id: `, station_id);
          // TODO: do stuff with clicked feature
          debugger;
        }
      }}
      interactiveLayerIds={["point"]}
      mapLib={maplibregl}
      initialViewState={{
        latitude: 40.751678516237334,
        longitude: -73.96923065185547,
        zoom: 14,
      }}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
      }}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    >
      <Source
        id="my-data"
        type="geojson"
        data={"data/stations-with-nta.geojson"}
      >
        <Layer {...layerStyle} />
      </Source>
    </Map>
  );
};

export default ReactMap;
