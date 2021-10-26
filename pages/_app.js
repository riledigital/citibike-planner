import { useState, useEffect } from "react";

import "@styles/index.css";
import "@styles/App.css";

import GlobalStyles from "/styles/GlobalStyles";
import { StyledMap } from "../styles/AppStyles.js";

import { Header, Modal } from "@components/index";
import Inspector from "/Inspector";
import MapContainer, { MapLegend } from "/MapContainer";

// import Audio from "@common/Audio";
import Data from "@common/Data";

// import Ranking from "./Ranking/Ranking";
const App = ({ Component, pageProps }) => {
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
    try {
      sfxManager.mute(!isMuted);
    } catch (e) {
      console.error(e);
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

  return <Component />;

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
        {/* {loading ? (
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
        )} */}
        {/* <StyledMap>
          <MapContainer
            sfxManager={sfxManager}
            handleStationClick={(feature) => handleStationClick(feature)}
            setLoading={setLoading}
            stationGeos={stationGeo}
          />
          <div id="map-legend">
            <MapLegend />
          </div>
        </StyledMap> */}
      </>
      {visibleMenu ? (
        <Modal
          toggle={toggleModal}
          soundOn={isMuted}
          toggleSound={() => setSound(!isMuted)}
        />
      ) : null}
    </div>
  );
};

export default App;
