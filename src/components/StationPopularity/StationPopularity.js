import React, { useEffect, useState } from "react";
import styles from "./StationPopularity.module.css";
const StationPopularity = ({ rank, stations_in_nta, nta_name }) => {
  const [name, setName] = useState(null);
  useEffect(() => {
    const nta_name_format = nta_name ? `in ${nta_name}` : "";
    setName(nta_name_format);
  });
  return rank ? (
    <section>
      <h3 className={styles.heading}>Popularity Ranking</h3>
      <div className={styles.description}>
        {rank} of {stations_in_nta} {name}
      </div>
    </section>
  ) : (
    <></>
  );
};
export default StationPopularity;
