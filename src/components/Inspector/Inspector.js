import React, { useState, useEffect } from "react";
import { StyledInspector, StyledDecorative } from "./styles.js";

import {
  LiveStatus,
  StationHeader,
  StationActivity,
  StationPopularity,
} from "./../index.js";

const Inspector = ({
  visible,
  aggData,
  stationStatus,
  stationGeo,
  currentStation,
  lastUpdated,
  ranking,
}) => {
  const [stationActivityData, setStationActivityData] = useState(new Map());
  const [currentRank, setCurrentRank] = useState(new Map());
  const [liveStatusData, setLiveStatusData] = useState(new Map());
  const [stationAggData, setStationAggData] = useState(null);

  useEffect(() => {
    const currentStationId = currentStation?.station_id ?? null;

    const rankObject = getStationRanking(currentStationId);
    if (rankObject) {
      const newRank = new Map();
      newRank.set("nta_name", rankObject.nta_name);
      newRank.set("rank", rankObject.rank);
      newRank.set("stations_in_nta", rankObject.stations_in_nta);
      setCurrentRank(newRank);
    }

    setStationAggData(getStationAggData(currentStation));
    debugger;
    const liveStatusData = stationStatus.get(currentStationId);
    if (liveStatusData) {
      const newLiveStatusData = new Map();
      newLiveStatusData.set("station_id", currentStationId);
      newLiveStatusData.set(
        "num_bikes_available",
        liveStatusData.num_bikes_available
      );
      newLiveStatusData.set(
        "num_ebikes_available",
        liveStatusData.num_ebikes_available
      );
      newLiveStatusData.set(
        "num_docks_available",
        liveStatusData.num_docks_available
      );
      newLiveStatusData.set("last_reported", liveStatusData.last_reported);
      newLiveStatusData.set("rental_url", liveStatusData.rental_url);
      setLiveStatusData(newLiveStatusData);
    }
  }, [currentStation, stationStatus]);

  const getStationRanking = (station_id) => {
    try {
      let output = stationGeo.features.find(
        (d) => d.properties.station_id === station_id
      );
      return { ...output.properties };
    } catch (e) {
      console.warn(e);
    }
  };

  const getStationAggData = (currentStation) => {
    if (!currentStation) {
      return null;
    }
    try {
      return aggData[currentStation["station_id"]];
    } catch (exception) {
      console.log(exception);
      console.log("fired too early");
      return null;
    }
  };

  const getStationStatus = (id) => {
    if (!id) {
      return null;
    }
    try {
      return stationStatus[id];
    } catch (e) {
      console.error("Oops, stationStatus not loaded");
      console.error(e);
    }
  };

  const isClosed = currentStation === null;
  return (
    <StyledInspector visible={visible}>
      <StyledDecorative>Station Inspector</StyledDecorative>
      <StationHeader {...currentStation} />
      <StationPopularity
        nta_name={currentRank.get("nta_name")}
        rank={currentRank.get("rank")}
        stations_in_nta={currentRank.get("stations_in_nta")}
      />
      <StationActivity data={stationAggData} height={150} fill="white" />
      <LiveStatus
        station_id={liveStatusData.get("station_id")}
        num_bikes_available={liveStatusData.get("num_bikes_available")}
        num_ebikes_available={liveStatusData.get("num_ebikes_available")}
        num_docks_available={liveStatusData.get("num_docks_available")}
        last_reported={liveStatusData.get("last_reported")}
        rental_url={liveStatusData.get("rental_url")}
      />
    </StyledInspector>
  );
};

export default Inspector;
