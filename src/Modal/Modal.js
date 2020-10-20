import React from "react";

import styles from "./Modal.module.css";
import { ReactComponent as Bike } from "./../images/undraw_bike_ride_7xit.svg";
const Modal = (props) => {
  const { toggle } = props;
  const stopPropogation = (e) => {
    e.stopPropagation();
  };
  return (
    <div className={styles.modal} onClick={toggle}>
      <div className={styles.modalContent} onClick={stopPropogation}>
        <button
          type="button"
          className={styles.close}
          data-dismiss="modal"
          aria-label="Close"
          onClick={toggle}
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <figure>
          <Bike
            title="Cycling illustration (Katerina Limpitsouni)"
            className={styles.illustration}
            viewBox="0 0 800.25287 695.42298"
          />
        </figure>

        <h1>CitiBike Activity Viewer</h1>

        <p>
          When is the best time to take a CitiBike in your area? Use this app to
          find out which Citi Bike stations are free during a specific time of
          day, or explore stations around the city and find out when your
          favorite stations are the busiest.
        </p>

        <h3 className={styles.heading}>Instructions</h3>
        <p className={styles.instructions}>
          Click on a station on the map. A histogram will appear on the sidebar
          that shows the ride distribution across all 24 hours of the day.
        </p>
        <div>
          <button onClick={toggle}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
