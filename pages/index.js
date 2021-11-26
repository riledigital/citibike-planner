// Index should be the main map view. About should open a new page.

import { useState, useEffect } from "react";

import {
  fetchFrequencyAnalysis,
  fetchLiveStatus,
  fetchStationGeo,
} from "@/common/store/AppSlice.js";
import { useDispatch } from "react-redux";

import { Header, Modal } from "@components/index";
import Inspector from "/Inspector";
import MapContainer, { MapLegend } from "/MapContainer";

// import Audio from "@common/Audio";
import OpenLayers from "MapContainer/OpenLayers";

// import Ranking from "./Ranking/Ranking";
const App = ({ Component, pageProps }) => {
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
  const dispatch = useDispatch();

  // New startup
  useEffect(() => {
    dispatch(fetchFrequencyAnalysis());
    dispatch(fetchStationGeo());
    dispatch(fetchLiveStatus());
  }, []);

  const handleStationClick = (station) => {
    const queryElement = document.querySelector("#stationHeader");
    if (queryElement) {
      queryElement.scrollIntoView({
        behavior: "smooth",
      });
    }
    setCurrentStation(station);
  };

  return (
    <>
      {/* <Header
        toggleSound={() => setSound(!isMuted)}
        soundOn={isMuted}
        // toggleModal={toggleModal}
        // toggleMenu={toggleMenu}
      /> */}
      <>
        <Inspector
          aggData={aggData}
          stationStatus={stationStatus}
          stationGeo={stationGeo}
          currentStation={currentStation}
          lastUpdated={lastUpdated}
          ranking={ranking}
          visible={visibleInspector}
        />
        <MapLegend />
        <OpenLayers />
      </>
    </>
  );
};

export default App;
