import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { styleDefault, activityMarker } from "./modules/Map/MapStyles";
import { throttle } from "lodash";
import Data from "./../../modules/Data";

const Map = ({ sfx, stationGeos }) => {
  const [map, setMap] = useState(null);
  const [stationGeo, setStationGeo] = useState(null);

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;
  let mapContainer = React.createRef();
  const markerUrl = `${process.env.PUBLIC_URL}/custom_marker.png`;
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer,
      style: "mapbox://styles/mapbox/light-v10",
      center: [-73.98, 40.75],
      zoom: 14,
      maxBounds: [
        [-74.35890197753906, 40.483515047963024],
        [-73.6907958984375, 40.92285206859968],
      ],
    });

    setLoading(true);
    const DataManager = new Data();

    const fetchData = async () => {
      const results = await DataManager.startFetching();
      setAggData(results[0].value);
      setStationGeo(results[1].value);
      let allStationsStatus = {};
      const fetchedData = data[2].value;
      fetchedData["data"]["stations"].forEach((record) => {
        allStationsStatus[record.station_id] = { ...record };
      });
      setStationStatus(results[2].value);
      setStationStatus(allStationsStatus);
      setLastUpdated(new Date(fetchedData["last_updated"] * 1000));
    };

    return () => map.remove();
  }, []);

  return (
    <div id="main-map">
      <div ref={(el) => (mapContainer = el)} className="mapContainer" />;
    </div>
  );
};

export default App;
