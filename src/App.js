import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import localforage from "localforage";

import "animate.css";
import "./App.css";
import Vis from "./Vis";
import Modal from "./Modal";
import StationInfo from "./StationInfo";
import { styleDefault, activityMarker } from "./MapStyles";
import CircleLegend from "./CircleLegend";
import Footer from "./Footer";
import HourBarChart from "./HourBarChart";
function App() {
  // const [coords, setCoords] = useState({ lon: -73, lat: 40 });
  const [map, setMap] = useState(null);
  const [currentStation, setCurrentStation] = useState({});
  const [aggData, setAggData] = useState(null);
  // const [vegaData, setVegaData] = useState(null);
  const [stationStatus, setStationStatus] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(true);

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

  function toggleModal(e) {
    if (e.target.className === "button" || e.target.className === "modal") {
      setShowModal(!showModal);
    } else {
    }
  }

  function extractStationDataHourly(station_id) {
    try {
      return aggData[`${station_id}`];
    } catch (e) {
      return null;
    }
  }

  async function fetchAggData() {
    setLoading(true);
    let aggs = await fetch(
      `${process.env.PUBLIC_URL}/data/aggs_by_hour.json`
    ).then((resp) => resp.json());

    console.log(`Got back agg data for ${aggs.length} stations`);
    setAggData(aggs);
    setLoading(false);
    return aggs;
  }

  function getStationStatus(id) {
    try {
      return stationStatus[id];
    } catch (e) {
      return `Status not loaded ${e}`;
    }
  }

  function fetchStationStatus() {
    setLoading(true);
    console.log("Attempting to get station status...");
    const url = "https://gbfs.citibikenyc.com/gbfs/en/station_status.json";

    localforage.length().then((numberOfKeys) => {
      if (false) {
        console.log("Attempting to load preexisting data from localforage...");
        setStationStatus(localforage.getItem("stationStatus"));
      } else {
        console.log("Fetching new data and caching it to indexedDb...");
        let allStationsStatus = {};
        fetch(url, { cache: "force-cache" })
          .then((resp) => resp.json())
          .then((data) => {
            data["data"]["stations"].map((record) => {
              allStationsStatus[record.station_id] = { ...record };
              // localforage.setItem(record.station_id, { ...record });
              loading
                ? setLoading(false)
                : console.log("still loading statuses");
              return record;
            });
            setStationStatus(allStationsStatus);
            setLastUpdated(new Date(data["last_updated"] * 1000));
            localforage.setItem("stationStatus", stationStatus);
          });
      }
    });
  }

  const handleStationClick = (station) => {
    // fetchVizData(station);
    setCurrentStation(station);
  };

  let mapContainer = React.createRef();

  const markerUrl = `${process.env.PUBLIC_URL}/custom_marker.png`;

  useEffect(() => {
    fetchAggData();
    fetchStationStatus();

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

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );

    const scale = new mapboxgl.ScaleControl({
      maxWidth: 80,
      unit: "imperial",
    });

    map.addControl(scale);

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });

    map.addControl(geolocate);

    // data: "https://data.cityofnewyork.us/resource/mifw-tguq.geojson",
    map.on("load", function () {
      map.loadImage(markerUrl, function (error, data) {
        if (error) throw error;
        map.addImage("custom-marker", data);
        map.addSource("stationSource", {
          type: "geojson",
          data: `${process.env.PUBLIC_URL}/data/station_info.json`,
        });
        // Add a layer showing the places.

        map.addLayer(activityMarker);
        if (loading) {
          setLoading(false);
        }
      });
      setMap(map);
    });

    // "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
    map.on("click", "stationLayer", function (e) {
      let feature = e.features[0].properties;
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.name;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
      console.log(`Moused on ${feature}`);
      console.log(feature);
      handleStationClick(feature);
    });

    return () => map.remove();
  }, []);

  return (
    <div className="App">
      <header className="App-header">Citibike Activity Viewer</header>
      {showModal ? <Modal toggle={toggleModal} /> : <></>}
      <div className="App-sidebar">
        {loading ? (
          <p>
            <progress></progress>
          </p>
        ) : (
          <div className="data-viewer">
            <StationInfo
              station={currentStation}
              status={getStationStatus(currentStation.station_id)}
              lastUpdated={lastUpdated}
            />
            <HourBarChart
              data={extractStationDataHourly(currentStation.station_id)}
              width={400}
              height={150}
              fill="white"
            />
            {false ? (
              <Vis
                data={extractStationDataHourly(currentStation.station_id)}
                currentHour={new Date().getHours()}
              />
            ) : null}
          </div>
        )}

        <div className="App-sidebar-footer">
          <button className="button" onClick={toggleModal}>
            Show Instructions
          </button>
          {/* <p>It is {getCurrentTime()}.</p> */}
          {/* <CircleLegend /> */}
        </div>
      </div>

      <div id="main-map">
        <div ref={(el) => (mapContainer = el)} className="mapContainer" />;
      </div>
      <Footer />
    </div>
  );
}

export default App;
