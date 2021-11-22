import React, { useState, useEffect } from "react";

import { StyledInspector, StyledDecorative } from "./styles";

import {
  LiveStatus,
  StationHeader,
  StationActivity,
  StationPopularity,
} from "./components";
import { useSelector } from "react-redux";
import { selectStationFrequencyData } from "@/common/store/AppSlice";

const Inspector = ({
  visible,
  aggData,
  stationStatus,
  stationGeo,
  currentStation,
  lastUpdated,
  ranking,
}) => {
  // const [stationActivityData, setStationActivityData] = useState(new Map());

  return (
    <StyledInspector visible>
      <StyledDecorative>Station Info</StyledDecorative>
      <StationHeader {...currentStation} />
      {/* <StationPopularity
        nta_name={currentRank.get("nta_name")}
        rank={currentRank.get("rank")}
        stations_in_nta={currentRank.get("stations_in_nta")}
      /> */}
      <StationActivity height={150} fill="white" />
      {/* <LiveStatus
        station_id={liveStatusData.get("station_id")}
        num_bikes_available={liveStatusData.get("num_bikes_available")}
        num_ebikes_available={liveStatusData.get("num_ebikes_available")}
        num_docks_available={liveStatusData.get("num_docks_available")}
        last_reported={liveStatusData.get("last_reported")}
        rental_url={liveStatusData.get("rental_url")}
      /> */}
    </StyledInspector>
  );
};

export default Inspector;
