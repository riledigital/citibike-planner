// TODO: Remove live status stuff from it
import React from "react";
import PropTypes from "prop-types";
import styles from "./StationHeader.module.css";
import { ReactComponent as LoadingIllustration } from "./../images/undraw_No_data_re_kwbl.svg";
const StationHeader = ({ name, station_id, nta_name, boro_name }) => {
  // Logic for handling null NTA codes

  const stationNeighborhood = !nta_name ? "" : nta_name;

  return name ? (
    <div className={styles.stationHeader}>
      <div className={styles.header}>
        <h2 className={styles.heading}>{name}</h2>
        <div className={styles.number}>{station_id}</div>
      </div>
      <div className={styles.nta}>
        {nta_name}, {boro_name}
      </div>
    </div>
  ) : (
    <div className={styles.loading}>
      <p className={styles.message}>
        Please click on a station on the map to view the activity details.
      </p>
      <figure className={styles.figure}>
        <LoadingIllustration
          class={styles.loadingIllustration}
          alt="Two clipboards; missing data icon by Katerina Limpitsouni"
          viewBox="0 0 647.63626 632.17383"
          preserveAspectRatio="xMinYMin meet"
        />
      </figure>
    </div>
  );
};

StationHeader.propTypes = {
  station: PropTypes.object,
};
export default StationHeader;
