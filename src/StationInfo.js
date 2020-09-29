import React, { useState, useEffect } from "react";
// https://gbfs.citibikenyc.com/gbfs/en/station_status.json

const StationInfo = (props) => {
  const { station } = props;
  return station.name ? (
    <div className="station-header">
      <h3 className="station-name">{station.name}</h3>
      <p className="station-id">{station.id}</p>
    </div>
  ) : (
    <p class="loading">Loading data...</p>
  );
};
export default StationInfo;
