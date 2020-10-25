import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import localforage from "localforage";

import "./App.css";
import styles from "./styles/buttons.module.css";

import { styleDefault, activityMarker } from "./MapStyles";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import Modal from "./Modal/Modal";
import StationHeader from "./StationHeader/StationHeader";
import StationActivity from "./StationActivity/StationActivity";
import StationPopularity from "./StationPopularity/StationPopularity";
import LiveStatus from "./LiveStatus/LiveStatus";
import MapLegend from "./MapLegend/MapLegend";

// import Ranking from "./Ranking/Ranking";
import CircleLegend from "./CircleLegend";
const App = () => {
  // const [coords, setCoords] = useState({ lon: -73, lat: 40 });
  const [map, setMap] = useState(null);
  const [currentStation, setCurrentStation] = useState({});
  const [aggData, setAggData] = useState(null);
  const [stationStatus, setStationStatus] = useState(null);
  const [stationGeo, setStationGeo] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(true);
  const [ranking, setRanking] = useState({});

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

  function toggleModal(e) {
    setShowModal(!showModal);
    // if (e.target.className === "button" || e.target.className === "modal") {
    //   setShowModal(!showModal);
    // } else {
    // }
  }

  function getStationRanking(station_id) {
    try {
      let output = stationGeo.features.find(
        (d) => d.properties.station_id === station_id
      );

      return { ...output.properties };
    } catch (e) {
      console.warn("stationGeo not showing");
      console.warn(e);
    }
  }

  function getStationStatus(id) {
    try {
      return stationStatus[id];
    } catch (e) {
      console.error("stationGeo not showing");
      console.error(e);
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
              loading ? setLoading(false) : console.log("Loading statuses...");
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
    const queryElement = document.querySelector("#stationHeader");
    if (queryElement) {
      queryElement.scrollIntoView({
        behavior: "smooth",
      });
    }
    setCurrentStation(station);
  };

  let mapContainer = React.createRef();

  const markerUrl = `${process.env.PUBLIC_URL}/custom_marker.png`;

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.PUBLIC_URL}/data/aggs_by_hour.json`)
      .then((resp) => resp.json())
      .then((data) => {
        setAggData(data);
        setLoading(false);
      });

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

    fetch(`${process.env.PUBLIC_URL}/data/station_info.geojson`)
      .then((resp) => resp.json())
      .then((data) => {
        setStationGeo(data);
        // debugger;
        map.on("load", function () {
          map.loadImage(markerUrl, function (error, img) {
            if (error) throw error;
            map.addImage("custom-marker", img);
            map.addSource("stationSource", {
              type: "geojson",
              // Test later?
              data: data,
            });
            // Add a layer showing the places.

            map.addLayer(activityMarker);
            if (loading) {
              setLoading(false);
            }
          });
          setMap(map);
        });
      })
      .then(() => {});

    fetchStationStatus();
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
      handleStationClick(feature);
    });

    return () => map.remove();
  }, []);

  return (
    <div className="App" id="stationHeader">
      <Header toggleModal={toggleModal} />
      <div className="grid-container">
        <div className="App-sidebar">
          {loading ? (
            <p>
              <progress></progress>
            </p>
          ) : (
            <div className="data-viewer">
              {stationGeo ? <StationHeader {...currentStation} /> : null}
              {ranking ? (
                <StationPopularity
                  {...getStationRanking(currentStation.station_id)}
                />
              ) : null}

              {aggData ? (
                <StationActivity
                  data={aggData ? aggData[currentStation.station_id] : null}
                  height={200}
                  fill="white"
                />
              ) : null}
              {stationStatus ? (
                <LiveStatus {...getStationStatus(currentStation.station_id)} />
              ) : null}
            </div>
          )}

          <div className="App-sidebar-footer">
            <details>
              <summary>How is popularity calculated?</summary>
              <p>
                We rank rides by the average number of trips started at each
                stations, grouped by Neighborhood Tabulation Areas (NTAs), which
                were created to predict population counts in New York City at a
                level finer than Census Tracts. Neighborhoods are loosely
                defined, but NTA's provide a sufficient rough estimate.
              </p>
            </details>
          </div>
        </div>

        <div id="main-map">
          <div ref={(el) => (mapContainer = el)} className="mapContainer" />;
          <div id="map-legend">
            <MapLegend />
          </div>
        </div>
        <Footer />
      </div>
      {showModal ? <Modal toggle={toggleModal} /> : <></>}
    </div>
  );
};

export default App;
