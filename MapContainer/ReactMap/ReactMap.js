import clsx from "clsx";
import { selectCurrentStation, selectCurrentStationData, selectStationGeo, setSelectedShortName, setSelectedStationId, setShowInspector } from "common/store/AppSlice";
import maplibregl from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import Map, { Layer, Popup, Source } from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";

import styles from "./ReactMap.module.css";

import "maplibre-gl/dist/maplibre-gl.css";

const BOUNDS = [
  [-74.1741943359375, 40.550330732028456],
  [-73.66676330566406, 40.901576859936284],
];

const ReactMap = () => {
  const dispatch = useDispatch();
  const selectedStationId = useSelector(selectCurrentStation);
  const stationGeo = useSelector(selectStationGeo);

  const [layerStyleStations] = useState({
    id: "stationsPoints",
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
      // "circle-color": "#007cbf",
    },
  });

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

  const selectedStationData = useSelector(selectCurrentStationData) ?? {};
  const {
    geometry: { coordinates: [lng = 0, lat = 0] = [] } = {},
    properties: {
      name = "",
      station_id = "",
      ntaname = "",
      boroname = "",
    } = {},
  } = selectedStationData;

  const stationNeighborhood = !ntaname ? "" : ntaname;

  const mapRef = useRef();
  const [showPopup, setShowPopup] = useState(true);

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

      mapRef?.current?.flyTo({
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

          dispatch(setSelectedStationId(station_id));
          dispatch(setSelectedShortName(short_name));
          setShowPopup(true);
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
        data={"/data/station_geo_ranked.geojson"}
      >
        {showPopup && (
          <Popup
            longitude={lng}
            latitude={lat}
            anchor="bottom"
            onClose={() => {
              setShowPopup(false);
              dispatch(setSelectedStationId(null));
            }}
          >
            <div className={styles["popup-container"]}>
              <div className={styles["popup-name"]}>{name}</div>
              <div className={styles["popup-nta"]}>{ntaname}</div>
            </div>
          </Popup>
        )}
        <Layer {...layerStyleStations} />
        <Layer {...layerStyleStationsText} />
      </Source>
    </Map>
  );
};

export default ReactMap;
