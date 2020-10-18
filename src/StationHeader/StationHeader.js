// TODO: Remove live status stuff from it
import React from "react";
import PropTypes from "prop-types";
import styles from "./StationHeader.module.css";
import LoadingIllustration from "../images/undraw_No_data_re_kwbl.svg";
const StationHeader = ({ station }) => {
  const { nta_name, boro_name } = station;
  // Logic for handling null NTA codes

  const stationNeighborhood = nta_name ? "" : nta_name;
  //   if (!station["nta_name"] | !station.BoroName) {
  //     stationNeighborhood = "";
  //   } else {
  //     stationNeighborhood = (
  //       <p className="station-info">
  //         {nta_name}, {boro_name}
  //       </p>
  //     );
  //   }

  return station ? (
    <div className={styles.stationHeader}>
      <div className={styles.header}>
        <h2 className={styles.heading}>{station.name}</h2>
        <div className={styles.number}>{station.station_id}</div>
      </div>
      <div className={styles.nta}>
        {" "}
        {/* {station.nta_name} */}
        {stationNeighborhood}
      </div>
    </div>
  ) : (
    <div className={styles["loading"]}>
      <p>Please click on a station on the map to view the activity details.</p>
      <figure className={null}>
        <LoadingIllustration
          className={styles["loading-illustration"]}
          title="Missing data icon (Katerina Limpitsouni)"
        />
        <p>No station selected.</p>
      </figure>
    </div>
  );
};

StationHeader.propTypes = {
  station: PropTypes.object,
};
export default StationHeader;
