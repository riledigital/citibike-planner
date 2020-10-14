import React from "react";
import "./StationInfo.css";
import { ReactComponent as LoadingIllustration } from "./images/undraw_No_data_re_kwbl.svg";
// https://gbfs.citibikenyc.com/gbfs/en/station_status.json

const StationInfo = ({ station, status, lastUpdated }) => {
  let stationNeighborhood;

  // Logic for handling null NTA codes
  if ((station["nta_name"] === "null") | (station.BoroName === "null")) {
    stationNeighborhood = "";
  } else {
    stationNeighborhood = (
      <p className="station-info">
        {station["nta_name"]}, {station["boro_name"]}
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
      <h2 className="station-info-header">Live status</h2>
      <p className="station-status-label">
        as of{" "}
        {lastUpdated.toLocaleDateString("en-us", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </p>
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
          <p className="station-status-label">
            <span role="img" aria-label="electric">
              ⚡
            </span>
            Electric
          </p>
        </div>
        <div className="station-docks station-counts">
          {statusInfo.docks}
          <p className="station-status-label">Docks</p>
        </div>
      </div>
      <div className="station-counts station-updated">
        <a className="button-open-in-app" href={station.rental_url}>
          Unlock Citi Bike
        </a>
      </div>
    </div>
  ) : (
    <div className="loading">
      <p>Please click on a station on the map to view the activity details.</p>
      <figure className="loading-illustration">
        <LoadingIllustration
          title="Missing data icon (Katerina Limpitsouni)"
          style={{ width: "20%" }}
        />
        <p>No station selected.</p>
      </figure>
    </div>
  );
};
export default StationInfo;
