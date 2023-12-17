import maplibregl from "maplibre-gl";
import { useRef, useState } from "react";
import {
  Map as MapLibre,
  Layer,
  Popup,
  Source,
  CircleLayer,
  SymbolLayer,
} from "react-map-gl/maplibre";
import { useStationRanking } from "hooks/useStationRanking";
import { useStationState } from "common/MapState";

import "maplibre-gl/dist/maplibre-gl.css";

const BOUNDS = [
  [-74.1741943359375, 40.550330732028456],
  [-73.66676330566406, 40.901576859936284],
];

const layerStyleStationsText: SymbolLayer = {
  source: "stations",
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

const layerStyleStations: CircleLayer = {
  id: "stationsPoints",
  source: "stations",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": [
      "interpolate-hcl",
      ["linear"],
      ["get", "station_rank"],
      1,
      "rgb(255, 209, 255)",
      45,
      "rgb(94, 52, 255)",
    ],
  },
};

export function ReactMap() {
  const {
    currentStationId,
    setCurrentStationId,
    setShowInspector,
  } = useStationState((state) => state);

  const { data: stationRankingData, isLoading } = useStationRanking("1");
  // https://docs.mapbox.com/style-spec/reference/sources/#geojson
  const mapData = stationRankingData?.geojson;
  // const { stationAnalysis, geojson } = stationRankingData;
  // const { name, ntaname } = stationAnalysis?.get(currentStationId);

  const mapRef = useRef();
  const [showPopup, setShowPopup] = useState(true);

  const [viewState, setViewState] = useState({
    latitude: 40.751678516237334,
    longitude: -73.96923065185547,
    zoom: 14,
    bounds: BOUNDS,
  });

  const onClick = (e) => {
    let firstFeature;
    // No features on click
    if (!e?.features) {
      console.debug("no features");
      setShowInspector(false);
      setCurrentStationId(null);
    }
    firstFeature = e.features.at(0);
    const {
      properties: { station_id },
    } = firstFeature;
    console.debug({ station_id });
    setShowInspector(true);
    setCurrentStationId(station_id);
    setShowPopup(true);
    setViewState({
      longitude: e.lngLat.lng,
      latitude: e.lngLat.lat,
      zoom: 16,
      bounds: BOUNDS,
    });
  };
  return (
    <MapLibre
      {...{
        ref: mapRef,
        onClick: onClick,
        interactiveLayerIds: ["landcover", "background", "stationsPoints"],
        onMove: (evt) => setViewState({ ...evt?.viewState, bounds: BOUNDS }),
        onLoad: () => {
          console.log("source loaded");
          // flyMapTo();
        },
        mapLib: maplibregl,
        style: {
          position: "fixed",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
        },
        mapStyle:
          "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
        ...viewState,
      }}
    >
      <Source id="stations" type="geojson" data={mapData}>
        <Layer {...layerStyleStations} />
        <Layer {...layerStyleStationsText} />
      </Source>
    </MapLibre>
  );
}
