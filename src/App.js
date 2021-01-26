import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import "./App.css";
import styles from "./styles/buttons.module.css";

import { styleDefault, activityMarker } from "./MapStyles";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Modal from "./components/Modal/Modal";
import StationHeader from "./components/StationHeader/StationHeader";
import StationActivity from "./components/StationActivity/StationActivity";
import StationPopularity from "./components/StationPopularity/StationPopularity";
import LiveStatus from "./components/LiveStatus/LiveStatus";
import MapLegend from "./components/MapLegend/MapLegend";
import { Howl, Howler } from "howler";

// import Ranking from "./Ranking/Ranking";
import CircleLegend from "./components/CircleLegend/CircleLegend";
const App = () => {
  const [map, setMap] = useState(null);
  const [currentStation, setCurrentStation] = useState({});
  const [aggData, setAggData] = useState(null);
  const [stationStatus, setStationStatus] = useState(null);
  const [stationGeo, setStationGeo] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(true);
  const [ranking, setRanking] = useState({});
  const [soundOn, setSound] = useState(false);

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

  function toggleModal(e) {
    setShowModal(!showModal);
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
      console.error("Oops, stationStatus not loaded");
      console.error(e);
    }
  }

  const handleStationClick = (station) => {
    sfxClickSound.play();
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

  // sound effects
  const sfxClickSound = new Howl({
    src: [`${process.env.PUBLIC_URL}/sound/pop.mp3`],
  });

  const sfxBike1 = new Howl({
    src: [`${process.env.PUBLIC_URL}/sound/bikes.mp3`],
    volume: 0.15,
  });

  const sfxScrolling = new Howl({
    src: [`${process.env.PUBLIC_URL}/sound/zoom.mp3`],
    volume: 2,
  });

  useEffect(() => {
    sfxBike1.play();
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
    // Async load everything
    Promise.allSettled([
      fetch(`${process.env.PUBLIC_URL}/data/aggs_by_hour.json`).then((resp) =>
        resp.json()
      ),
      fetch(
        `${process.env.PUBLIC_URL}/data/station_info.geojson`
      ).then((resp) => resp.json()),
      fetch(
        "https://gbfs.citibikenyc.com/gbfs/en/station_status.json"
      ).then((resp) => resp.json()),
    ]).then((data) => {
      setAggData(data[0].value);
      setStationGeo(data[1].value);
      let allStationsStatus = {};
      const fetchedData = data[2].value;

      fetchedData["data"]["stations"].map((record) => {
        allStationsStatus[record.station_id] = { ...record };
        return record;
      });
      setStationStatus(allStationsStatus);
      setLastUpdated(new Date(fetchedData["last_updated"] * 1000));
      setLoading(false);
      map.on("load", function () {
        map.loadImage(markerUrl, function (error, img) {
          if (error) throw error;
          map.addImage("custom-marker", img);
          map.addSource("stationSource", {
            type: "geojson",
            data: data[1].value,
          });
          map.addLayer(activityMarker);
        });
        setMap(map);
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
        map.on("drag", function (e) {
          if (!sfxScrolling.playing()) {
            sfxScrolling.play();
          }
        });
        map.on("zoom", function (e) {
          if (!sfxScrolling.playing()) {
            sfxScrolling.play();
          }
        });
      });
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
      handleStationClick(feature);
    });

    return () => map.remove();
  }, []);

  Howler.mute(!soundOn);

  return (
    <div className="App" id="stationHeader">
      <Header
        toggleSound={() => setSound(!soundOn)}
        soundOn={soundOn}
        toggleModal={toggleModal}
      />
      <div className="grid-container">
        <div className="App-sidebar">
          {loading ? (
            <p>
              <progress></progress>
            </p>
          ) : (
            <div className="data-viewer">
              {stationGeo ? <StationHeader {...currentStation} /> : null}
              {!loading && ranking && stationGeo ? (
                <StationPopularity
                  {...getStationRanking(currentStation.station_id)}
                />
              ) : null}

              {aggData ? (
                <StationActivity
                  data={aggData ? aggData[currentStation.station_id] : null}
                  height={150}
                  fill="white"
                />
              ) : null}
              {stationStatus ? (
                <LiveStatus {...getStationStatus(currentStation.station_id)} />
              ) : null}
            </div>
          )}

          <div className="App-sidebar-footer">
            <Footer />
          </div>
        </div>

        <div id="main-map">
          <div ref={(el) => (mapContainer = el)} className="mapContainer" />;
          <div id="map-legend">
            <MapLegend />
          </div>
        </div>
      </div>
      {showModal ? (
        <Modal
          toggle={toggleModal}
          soundOn={soundOn}
          toggleSound={() => setSound(!soundOn)}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;
