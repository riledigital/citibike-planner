import React, { useState, useEffect } from "react";
import { None } from "vega";
import {
  LiveStatus,
  StationHeader,
  StationActivity,
  StationPopularity,
} from "./../index.js";

const Inspector = ({
  aggData,
  stationStatus,
  stationGeo,
  currentStation,
  lastUpdated,
  ranking,
}) => {
  const [currentRank, setCurrentRank] = useState(new Map());
  const [stationActivityData, setStationActivityData] = useState(new Map());
  const [popularityData, setPopularityData] = useState(new Map());
  const [liveStatusData, setLiveStatusData] = useState(new Map());
  const [currentStationId, setCurrentStationId] = useState("");
  const [stationAggData, setStationAggData] = useState({});

  useEffect(() => {
    const current_station_id = currentStation?.station_id ?? null;

    const rankObject = getStationRanking(current_station_id);
    if (rankObject) {
      const newRank = new Map();
      newRank.set("nta_name", rankObject.nta_name);
      newRank.set("rank", rankObject.rank);
      newRank.set("stations_in_nta", rankObject.stations_in_nta);
      setCurrentRank(newRank);
    }

    setCurrentStationId(current_station_id);
    setLiveStatusData();
    setStationAggData(getStationAggData(currentStation));
  }, [currentStation]);

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
  return (
    <>
      <div className="data-viewer">
        <StationHeader {...currentStation} />
        <StationPopularity
          nta_name={currentRank.get("nta_name")}
          rank={currentRank.get("rank")}
          stations_in_nta={currentRank.get("stations_in_nta")}
        />
        <StationActivity
          data={getStationAggData(currentStation)}
          height={150}
          fill="white"
        />
        <LiveStatus {...getStationStatus(currentStation)} />
      </div>
    </>
  );
};

export default Inspector;
