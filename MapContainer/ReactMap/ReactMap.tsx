import Map, { Source, Layer } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import styles from "./ReactMap.module.css";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentStation,
  selectStationGeoJson,
  setSelectedStationId,
  setShowInspector,
} from "common/store/AppSlice";

const layerStyleStations = {
  id: "stationsPoints",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
};

const layerStyleStationsText = {
  id: "stationsText",
  type: "symbol",
  layout: {
    "text-field": ["get", "name"],
    "text-offset": [0, -1.5],
    "text-size": 12,
  },
  paint: {
    "text-color": "#000000",
  },
};

const BOUNDS = [
  [-74.1741943359375, 40.550330732028456],
  [-73.66676330566406, 40.901576859936284],
];
const ReactMap = () => {
  const dispatch = useDispatch();
  const selectedStationId = useSelector(selectCurrentStation);
  const [viewState, setViewState] = useState({
    latitude: 40.751678516237334,
    longitude: -73.96923065185547,
    zoom: 14,
    bounds: BOUNDS,
  });

  return (
    <Map
      {...viewState}
      onClick={(e) => {
        // No features on click
        let firstFeature;
        if (e.features) {
          firstFeature = e.features.at(0);
          const {
            properties: { station_id },
          } = firstFeature;
          console.debug(`Clicked station_id: `, station_id);
          // TODO: do stuff with clicked feature
          dispatch(setSelectedStationId(station_id));

          setViewState({
            longitude: e.lngLat.lng,
            latitude: e.lngLat.lat,
            zoom: 16,
            bounds: BOUNDS,
          });
        } else {
          dispatch(setShowInspector(false));
          dispatch(setSelectedStationId(null));
        }
      }}
      interactiveLayerIds={["landcover", "background", "stationsPoints"]}
      onMove={(evt) => setViewState(evt?.viewState)}
      mapLib={maplibregl}
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
        <Layer {...layerStyleStations} />
        <Layer {...layerStyleStationsText} />
      </Source>
    </Map>
  );
};

export default ReactMap;
