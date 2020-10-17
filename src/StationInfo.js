import React from "react";
import styles from "./StationInfo.module.css";
import { ReactComponent as LoadingIllustration } from "./images/undraw_No_data_re_kwbl.svg";
import ActionButton from "./ActionButton";
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
    <div className={styles["station"]}>
      <div className={styles["info-header"]}>
        <h2 className={styles["status-title"]}>Live status</h2>
        <p className={styles["station-status-label"]}>
          as of{" "}
          {lastUpdated.toLocaleDateString("en-us", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
      </div>

      <h3 className={styles["station-name"]}>
        {station.name}{" "}
        <a href={station.rental_url}>
          <span className={styles["station-id"]}>{station.station_id}</span>
        </a>
      </h3>
      {stationNeighborhood}
      <div className={styles["station-status"]}>
        <div className={styles["station-bikes"]}>
          {statusInfo.bikes}{" "}
          <p className={styles["station-status-label"]}>Classic</p>
        </div>
        <div className={styles["station-electric"]}>
          {statusInfo.electric}
          <p className={styles["station-status-label"]}>
            <span role="img" aria-label="electric">
              ⚡
            </span>
            Electric
          </p>
        </div>
        <div className={styles["station-docks"]}>
          {statusInfo.docks}
          <p className={styles["station-status-label"]}>Docks</p>
        </div>
      </div>
      <div className={styles["station-counts station-updated"]}>
        <ActionButton href={station.rental_url} />
      </div>
    </div>
  ) : (
    <div className={styles["loading"]}>
      <p>Please click on a station on the map to view the activity details.</p>
      <figure className={styles["loading-illustration"]}>
        <LoadingIllustration title="Missing data icon (Katerina Limpitsouni)" />
        <p>No station selected.</p>
      </figure>
    </div>
  );
};
export default StationInfo;
