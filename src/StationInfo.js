import React, { useState, useEffect } from "react";
import "./StationInfo.css";
// https://gbfs.citibikenyc.com/gbfs/en/station_status.json

const StationInfo = (props) => {
  const { station } = props;
  return station.name ? (
    <div className="station-header">
      <h2 className="station-info-header">Selected CitiBike Station:</h2>
      <h3 className="station-name">
        {station.name}{" "}
        <a href={station.rental_url}>
          <span className="station-id">{station.station_id}</span>
        </a>
      </h3>
      <p className="station-info">
        {station["NTAName"]}, {station["BoroName"]}
      </p>
    </div>
  ) : (
    <p className="loading"></p>
  );
};
export default StationInfo;
