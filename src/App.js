import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

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

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;
  // "pk.eyJ1IjoicmlsZWRpZ2l0YWwiLCJhIjoiY2s2bXBpeTBkMHNiYjNrbnF4ZDJuZXA2cSJ9.5OcVXRI0QEUq_U2iP1h4zg";

  const handleStationClick = (station) => {
    setVegaData(`${process.env.PUBLIC_URL}/data/${station.id}.json`);
    // fetch(url)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Just loaded new vega at " + url);
    //     console.log(data);
    //     setCurrentData(data);
    //   });

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
            data: `${process.env.PUBLIC_URL}/data/stations.geojson`,
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

        <p>When is the best time to take a CitiBike in your area?</p>

        <h3 className="emphasis">Instructions</h3>
        <p className="instructions">
          Click on a station on the map. A histogram will appear on the sidebar
          that shows the ride distribution across all 24 hours of the day.
        </p>

        {currentStation ? (
          <StationInfo station={currentStation} />
        ) : (
          <p>Loading...</p>
        )}

        <Vis data={vegaData} />

        {/* <a
          href={`//app.citibikenyc.com/S6Lr/IBV092JufD?station_id=${currentStation.id}`}
        >
          CHECK OUT IN CITIBIKE APP
        </a> */}

        <p>
          Data is from{" "}
          <a href="https://www.citibikenyc.com/system-data">
            CitiBike System Data
          </a>
          .
        </p>
      </div>

      <div id="main-map">
        <div ref={(el) => (mapContainer = el)} className="mapContainer" />;
      </div>

      <footer className="App-footer">
        Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed
        aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis,
        venenatis tristique, dignissim in, ultrices sit amet, augue. Proin
        sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi
        lectus, commodo ac, facilisis a
      </footer>
    </div>
  );
}

export default App;
