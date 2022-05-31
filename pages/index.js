import Inspector from "/Inspector";
import { MapLegend } from "/MapContainer";
import {
  fetchFrequencyAnalysis,
  fetchLiveStatus,
  fetchStationGeo,
} from "common/store/AppSlice";
import Title from "components/Title";
// import Audio from "@common/Audio";
import ReactMap from "MapContainer/ReactMap";
/* eslint-disable no-undef */
// Index should be the main map view. About should open a new page.

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// import Ranking from "./Ranking/Ranking";
const App = () => {
  const [currentStation] = useState(null);
  const [aggData] = useState(null);
  const [stationGeo] = useState(null);
  const [stationStatus] = useState(new Map());
  const [lastUpdated] = useState(null);

  const [visibleInspector] = useState(false);

  const [ranking] = useState({});

  const dispatch = useDispatch();

  // New startup
  useEffect(() => {
    // dispatch(fetchFrequencyAnalysis());
    dispatch(fetchStationGeo());
    dispatch(fetchLiveStatus());
  }, [dispatch]);

  return (
    <>
      {/* <Header
        toggleSound={() => setSound(!isMuted)}
        soundOn={isMuted}
        // toggleModal={toggleModal}
        // toggleMenu={toggleMenu}
      /> */}

      <Title>Map</Title>
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
      <ReactMap />
    </>
  );
};

export default App;
