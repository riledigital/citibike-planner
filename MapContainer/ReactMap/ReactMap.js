import Map, { Source, Layer, Popup } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import styles from "./ReactMap.module.css";
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentStation,
  selectStationGeo,
  selectStationInfo,
  setSelectedStationId,
  setShowInspector,
  setSelectedShortName,
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
  const stationGeo = useSelector(selectStationGeo);
  const stationData = useSelector(selectStationInfo);
  const { name, station_id, ntaname, boroname } = stationData || {};
  const stationNeighborhood = !ntaname ? "" : ntaname;

  const mapRef = useRef();

  const [viewState, setViewState] = useState({
    latitude: 40.751678516237334,
    longitude: -73.96923065185547,
    zoom: 14,
    bounds: BOUNDS,
  });

  useEffect(() => {
    // console.log(`Changed ${selectedStationId}`);
    // query by station id through mapbox
  }, [selectedStationId]);

  const flyMapTo = () => {
    // Cannot use querySourceFeatures bc we
    if (selectedStationId) {
      const {
        geometry: {
          coordinates: [lng, lat],
        },
      } = stationGeo;
      // console.log(lat, lng);

      mapRef.current?.flyTo({
        center: [lng, lat],
        speed: 2,
        minZoom: 14,
      });
    }
  };

  return (
    <Map
      {...viewState}
      ref={mapRef}
      onClick={(e) => {
        // No features on click
        let firstFeature;
        if (e.features) {
          firstFeature = e.features.at(0);
          const {
            properties: { station_id, short_name },
          } = firstFeature;
          // console.debug({ station_id, short_name });
          // TODO: do stuff with clicked feature
          dispatch(setSelectedStationId(station_id));
          dispatch(setSelectedShortName(short_name));
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
      onLoad={() => {
        // console.log("source loaded");
        flyMapTo();
      }}
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
        {selectedStationId && stationGeo && (
          <Popup
            longitude={stationGeo?.geometry?.coordinates?.[0]}
            latitude={stationGeo?.geometry?.coordinates?.[1]}
            anchor="bottom"
            onClose={() => dispatch(setSelectedStationId(null))}
          >
            <div>{name}</div>
            <div>{ntaname}</div>
          </Popup>
        )}
        <Layer {...layerStyleStations} />
        <Layer {...layerStyleStationsText} />
      </Source>
    </Map>
  );
};

export default ReactMap;
