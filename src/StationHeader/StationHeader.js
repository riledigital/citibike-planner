// TODO: Remove live status stuff from it
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./StationHeader.module.css";
import { useTransition, animated } from "react-spring";
import { ReactComponent as LoadingIllustration } from "./../images/undraw_No_data_re_kwbl.svg";
const StationHeader = ({ name, station_id, nta_name, boro_name }) => {
  // Logic for handling null NTA codes
  const [show, setShow] = useState(false);
  const stationNeighborhood = !nta_name ? "" : nta_name;

  const anim = useTransition(name, (item) => item, {
    from: { transform: "translate(0,-100px)", opacity: 0 },
    update: { transform: "translate(0,0)", opacity: 1 },
    leave: {
      transform: "translate(0,-100px)",
      opacity: 0,
      position: "absolute",
    },
    unique: false,
    reset: true,
  });

  // useEffect(() => {
  //   setShow(true);

  //   return function cleanup() {
  //     setShow(false);
  //   };
  // });

  return name ? (
    anim.map(
      ({ item, key, props }) =>
        item && (
          <animated.div
            style={props}
            key={key}
            className={styles.stationHeader}
          >
            <div className={styles.header}>
              <h2 className={styles.heading}>{name}</h2>
              <div className={styles.number}>{station_id}</div>
            </div>
            <div className={styles.nta}>
              {nta_name}, {boro_name}
            </div>
          </animated.div>
        )
    )
  ) : (
    <div className={styles.loading}>
      <p className={styles.message}>
        Please click on a station on the map to view the activity details.
      </p>
      <figure className={styles.figure}>
        <LoadingIllustration
          className={styles.loadingIllustration}
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
