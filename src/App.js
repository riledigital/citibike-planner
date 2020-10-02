import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import localforage from "localforage";

// import Map from "./Map";
import "./App.css";
import "./Map.css";
import Vis from "./Vis";
import StationInfo from "./StationInfo";

function App() {
  const [coords, setCoords] = useState({ lon: -73, lat: 40 });
  const [map, setMap] = useState(null);
  const [currentStation, setCurrentStation] = useState({});
  const [currentData, setCurrentData] = useState(null);
  const [vegaData, setVegaData] = useState(null);
  const [stationStatus, setStationStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

  function getVizData(station) {
    return `${process.env.PUBLIC_URL}/data/${station.station_id}.json`;
  }

  function getStationStatus() {
    console.log("Attempting to get station status...");
    const url = "https://gbfs.citibikenyc.com/gbfs/en/station_status.json";
    let theStationStatus = localforage.getItem("stationStatus");
    localforage.length().then((numberOfKeys) => {
      if (numberOfKeys > 0) {
        console.log("Attempting to load preexisting data from localforage...");
        setStationStatus(localforage.getItem("stationStatus"));
      } else {
        console.log("Fetching new data and caching it to indexedDb...");
        let allStationsStatus = new Object();
        fetch(url)
          .then((resp) => resp.json())
          .then((data) => {
            data["data"]["stations"].map((record) => {
              allStationsStatus[record.station_id] = { ...record };
              localforage.setItem(record.station_id, { ...record });
              return record;
            });
            setStationStatus(allStationsStatus);
            localforage.setItem("stationStatus", allStationsStatus);
            loading ? setLoading(false) : console.log("still loading statuses");
          });
      }
    });
  }

  function getCurrentTime(hour) {
    const dt = new Date();
    let fmt = null;
    hour
      ? (fmt = new Intl.DateTimeFormat("en-us", {
          hour: "numeric",
          hour12: false,
        }))
      : (fmt = new Intl.DateTimeFormat("en-us", {
          weekday: "long",
          hour: "numeric",
          hour12: true,
        }));
    return `${fmt.format(dt)}`;
  }

  const handleStationClick = (station) => {
    setVegaData(getVizData(station));
    setCurrentStation(station);
  };

  function loadStationStatus() {
    fetch("https://gbfs.citibikenyc.com/gbfs/en/station_status.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Successfully loaded station data from CitiBike API.");
        setStationStatus(map);
      })
      .catch((e) => {
        console.log("Error loading station status.");
      });
  }

  function handleCoordsChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setCoords({ name: value });
  }
  let mapContainer = React.createRef();
  const markerUrl = `${process.env.PUBLIC_URL}/custom_marker.png`;

  useEffect(() => {
    // Update the document title using the browser API
    // document.title = `Wow we have useEffect working`;
    // loadStationStatus();

    const map = new mapboxgl.Map({
      container: mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-73.98, 40.75],
      zoom: 12,
    });

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );

    // data: "https://data.cityofnewyork.us/resource/mifw-tguq.geojson",
    map.on("load", function () {
      map.loadImage(
        "http://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        function (error, data) {
          if (error) throw error;
          map.addImage("custom-marker", data);
          map.addSource("stationSource", {
            type: "geojson",
            data: `${process.env.PUBLIC_URL}/data/all_stations_with_ntas.geojson`,
          });
          // Add a layer showing the places.

          map.addLayer({
            id: "stationLayer",
            type: "symbol",
            source: "stationSource",
            layout: {
              "icon-image": "custom-marker",
              "icon-allow-overlap": true,
            },
          });
        }
      );
      getStationStatus();
      setLoading(false);
      setMap(map);
      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
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
      console.log(`Moused on ${feature.name}`);
      handleStationClick(feature);
    });

    map.on("move", () => {
      // handleMapMouseover(map);
    });

    return () => map.remove();
  }, []);

  return (
    <div className="App">
      <div className="App-sidebar">
        <h1>CitiBike Activity Viewer</h1>

        <p>
          When is the best time to take a CitiBike in your area? Use this app to
          find out which Citi Bike stations are free during the start or end of
          your commute. Or explore stations around the city to plan the
        </p>

        <h3 className="emphasis">Instructions</h3>
        <p className="instructions">
          Click on a station on the map. A histogram will appear on the sidebar
          that shows the ride distribution across all 24 hours of the day.
        </p>

        <p>It is {getCurrentTime()}.</p>

        {loading ? (
          <p>
            <progress></progress>
          </p>
        ) : (
          <div className="data-viewer">
            <StationInfo station={currentStation} />
            <Vis data={vegaData} currentHour={getCurrentTime(true)} />
          </div>
        )}

        {/* <a
          href={`//app.citibikenyc.com/S6Lr/IBV092JufD?station_id=${currentStation.id}`}
        >
          CHECK OUT IN CITIBIKE APP
        </a> */}
      </div>

      <div id="main-map">
        <div ref={(el) => (mapContainer = el)} className="mapContainer" />;
      </div>

      <footer className="App-footer">
        <p>
          Data is aggregated from{" "}
          <a href="https://www.citibikenyc.com/system-data">
            CitiBike System Data
          </a>
          .
        </p>
        2020 App created by <a href="https://riledigital.com">Ri Le</a>.{" "}
        <a href="https://twitter.com/riledigital">@riledigital</a>
      </footer>
    </div>
  );
}

export default App;
