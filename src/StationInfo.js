import React, { useState, useEffect } from "react";
import "./StationInfo.css";
// https://gbfs.citibikenyc.com/gbfs/en/station_status.json

const StationInfo = (props) => {
  const { station, status } = props;
  let stationNeighborhood;
  // Logic for handling null NTA codes
  if ((station["NTAName"] == "null") | (station.BoroName == "null")) {
    stationNeighborhood = "";
  } else {
    stationNeighborhood = (
      <p className="station-info">
        {station["NTAName"]}, {station["BoroName"]}
      </p>
    );
  }

  let statusInfo;
  if (status == null) {
    statusInfo = "";
  } else {
    statusInfo = `${status.num_bikes_available}`;
  }
  // console.log(station);
  console.log(status);

  return station.name ? (
    <div className="station-header">
      <h2 className="station-info-header">Selected CitiBike Station:</h2>
      <h3 className="station-name">
        {station.name}{" "}
        <a href={station.rental_url}>
          <span className="station-id">{station.station_id}</span>
        </a>
      </h3>
      {stationNeighborhood}
      <div>{statusInfo}</div>
    </div>
  ) : (
    <p className="loading"></p>
  );
};
export default StationInfo;
