import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./App.css";
import styles from "./styles/buttons.module.css";

import Mapbox from "./modules/Mapbox";

import {
  Header,
  Footer,
  Modal,
  CircleLegend,
  MapLegend,
  Inspector,
} from "./components";
import Audio from "./modules/Audio";
import Data from "./modules/Data";
import { throttle } from "lodash-es";

// import Ranking from "./Ranking/Ranking";
const App = () => {
  const [sfxManager, setSfxManager] = useState(null);
  const [map, setMap] = useState(null);
  const [currentStation, setCurrentStation] = useState({});
  const [aggData, setAggData] = useState(null);
  const [stationGeo, setStationGeo] = useState(null);
  const [stationStatus, setStationStatus] = useState(new Map());
  const [lastUpdated, setLastUpdated] = useState(null);

  const [showModal, setShowModal] = useState(true);
  const [ranking, setRanking] = useState({});
  const [isMuted, setSound] = useState(false);
  const [loading, setLoading] = useState(true);

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
    try {
      // ReactDOM.render(
      //   <StationActivity
      //     data={aggData ? aggData[currentStation.station_id] : null}
      //     height={150}
      //     fill="white"
      //   />,
      //   document.querySelector("#popup")
      // );
    } catch (e) {
      console.log(e);
    }
  }, [currentStation]);

  return (
    <div className="App" id="stationHeader">
      <Header
        toggleSound={() => setSound(!isMuted)}
        soundOn={isMuted}
        toggleModal={toggleModal}
      />
      <div className="grid-container">
        <div className="App-sidebar">
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
            />
          )}

          <div className="App-sidebar-footer">
            <Footer />
          </div>
        </div>

        <div id="main-map">
          <Mapbox
            sfxManager={sfxManager}
            handleStationClick={(feature) => handleStationClick(feature)}
            setLoading={setLoading}
            stationGeos={stationGeo}
          />
          <div id="map-legend">
            <MapLegend />
          </div>
        </div>
      </div>
      {showModal ? (
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
