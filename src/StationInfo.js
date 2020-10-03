import React, { useState, useEffect } from "react";
import "./StationInfo.css";
// https://gbfs.citibikenyc.com/gbfs/en/station_status.json

const StationInfo = (props) => {
  const { station, status, lastUpdated } = props;
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
    statusInfo = "none";
  } else {
    statusInfo = {
      bikes: status.num_bikes_available,
      electric: !status.ebikes_available ? 0 : status.ebikes_available,
      docks: status.num_docks_available,
    };
    // `${status.num_bikes_available}`;
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
      <div className="station-status">
        <div className="station-bikes station-counts">
          {statusInfo.bikes} <p className="station-status-label">Classic</p>
        </div>
        <div className="station-electric station-counts">
          {statusInfo.electric}
          <p className="station-status-label">⚡Electric</p>
        </div>
        <div className="station-docks station-counts">
          {statusInfo.docks}
          <p className="station-status-label">Docks</p>
        </div>
      </div>
      <div className="station-counts station-updated">
        <p className="station-status-label">
          Last updated{" "}
          {lastUpdated.toLocaleDateString("en-us", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
        <a className="button-open-in-app" href={station.rental_url}>
          Unlock in Citi Bike App
        </a>
      </div>
    </div>
  ) : (
    <p className="loading"></p>
  );
};
export default StationInfo;
