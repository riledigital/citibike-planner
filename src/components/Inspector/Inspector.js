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
  const [rank, setRank] = useState(new Map());

  //   useEffect(() => {
  //     const rankObject = getStationRanking(currentStation?.station_id).properties;
  //     debugger;
  //     const rank = new Map(rank);
  //     rank.set("rank", rankObject?.rank);
  //     rank.set("stations_in_nta", rankObject?.stations_in_nta);
  //     rank.set("nta_name"), rankObject?.nta_name;
  //     setRank(rank);
  //   });

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
        {/* <StationPopularity
          rank={rank}
          stations_in_nta={stations_in_nta}
          nta_name={nta_name}
        /> */}
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
