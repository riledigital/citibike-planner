import React from "react";
import styles from "./StationPopularity.module.css";
const StationPopularity = ({ rank, stations_in_nta, nta_name }) => {
  return rank ? (
    <section>
      <h3 className={styles.heading}>Popularity Ranking</h3>
      <div className={styles.description}>
        {rank} of {stations_in_nta} in {nta_name}
      </div>
    </section>
  ) : (
    <></>
  );
};
export default StationPopularity;
