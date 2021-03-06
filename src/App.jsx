import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./App.css";

import GlobalStyles from "@common/styles/GlobalStyles";
import { StyledMap } from "./AppStyles.js";

import { Header, Modal } from "./components";
import Inspector from "./Inspector";
import MapContainer, { MapLegend } from "./MapContainer";

import Audio from "@common/Audio";
import Data from "@common/Data";

import { throttle } from "lodash-es";

// import Ranking from "./Ranking/Ranking";
const App = () => {
  const [sfxManager, setSfxManager] = useState(null);
  const [map, setMap] = useState(null);
  const [currentStation, setCurrentStation] = useState(null);
  const [aggData, setAggData] = useState(null);
  const [stationGeo, setStationGeo] = useState(null);
  const [stationStatus, setStationStatus] = useState(new Map());
  const [lastUpdated, setLastUpdated] = useState(null);

  const [visibleInspector, setVisibleInspector] = useState(false);
  const [visibleMenu, setVisibleMenu] = useState(true);
  const [showModal, setShowModal] = useState(true);

  const [ranking, setRanking] = useState({});
  const [isMuted, setSound] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleMenu = (e) => {
    setVisibleInspector(false);
    setVisibleMenu(!visibleMenu);
  };
  function toggleModal(e) {
    setShowModal(!showModal);
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

  useEffect(() => {
    const sfx = new Audio();
    setSfxManager(sfx);
    sfx.play("sfxBike1");

    setLoading(true);

    fetchData();
    setLoading(false);
  }, []);

  const fetchData = async () => {
    const DataManager = new Data();
    const results = await DataManager.startFetching();
    setAggData(results[0].value);
    setStationGeo(results[1].value);
    let allStationsStatus = new Map();
    const fetchedData = results[2].value;
    fetchedData["data"]["stations"].forEach((record) => {
      allStationsStatus.set(record.station_id, { ...record });
    });
    setStationStatus(allStationsStatus);
    setLastUpdated(new Date(fetchedData["last_updated"] * 1000));
  };

  useEffect(() => {
    if (sfxManager) {
      sfxManager?.mute(!isMuted);
    }
  }, [sfxManager, isMuted]);

  useEffect(() => {
    setVisibleInspector(currentStation !== null);
    try {
      ReactDOM.render(
        <Inspector
          aggData={aggData}
          stationStatus={stationStatus}
          stationGeo={stationGeo}
          currentStation={currentStation}
          lastUpdated={lastUpdated}
          ranking={ranking}
          visible={visibleInspector}
        />,
        document.querySelector("mapboxgl-popup-content")
      );
    } catch (e) {
      console.log(e);
    }
  }, [currentStation]);

  return (
    <div className="App">
      <GlobalStyles />
      <Header
        toggleSound={() => setSound(!isMuted)}
        soundOn={isMuted}
        toggleModal={toggleModal}
        toggleMenu={toggleMenu}
      />
      <>
        {loading ? (
          <progress></progress>
        ) : (
          <Inspector
            aggData={aggData}
            stationStatus={stationStatus}
            stationGeo={stationGeo}
            currentStation={currentStation}
            lastUpdated={lastUpdated}
            ranking={ranking}
            visible={visibleInspector}
          />
        )}
        <StyledMap>
          <MapContainer
            sfxManager={sfxManager}
            handleStationClick={(feature) => handleStationClick(feature)}
            setLoading={setLoading}
            stationGeos={stationGeo}
          />
          <div id="map-legend">
            <MapLegend />
          </div>
        </StyledMap>
      </>
      {visibleMenu ? (
        <Modal
          toggle={toggleModal}
          soundOn={isMuted}
          toggleSound={() => setSound(!isMuted)}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;
