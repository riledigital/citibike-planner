import React, { useState } from "react";
import { useTransition, animated } from "react-spring";

import styles from "./Modal.module.css";
import { ReactComponent as Bike } from "./../images/undraw_bike_ride_7xit.svg";

const Modal = ({ toggle, soundOn, toggleSound }) => {
  const [show, set] = useState(true);

  const transitions = useTransition(show, null, {
    from: { opacity: 0, transform: "translate(0, -100)" },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  // const { toggle } = props;
  const stopPropogation = (e) => {
    e.stopPropagation();
  };

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div key={key} style={props}>
          <div className={styles.modal} onClick={() => set()}>
            <div className={styles.modalContent} onClick={stopPropogation}>
              <button
                type="button"
                className={styles.close}
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => set()}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h1>Citi Bike Planner</h1>
              <span className={styles.attribution}>By Ri Le</span>

              <figure>
                <Bike
                  title="Cycling illustration (Katerina Limpitsouni)"
                  className={styles.illustration}
                  viewBox="0 0 800.25287 695.42298"
                />
              </figure>

              <p>
                When is the best time to take a Citi Bike in your area?
              </p>
              <p>
                Use this app to find out which Citi Bike stations are free
                during a specific time of day, or explore stations around the
                city and find out when your favorite stations are the busiest.
              </p>

              <h3 className={styles.heading}>Instructions</h3>
              <p className={styles.instructions}>
                Click on a station on the map. A histogram will appear on the
                sidebar that shows the ride distribution across all 24 hours of
                the day.
                <small> This is a personal project unaffiliated with Motivate or Citi Bike.</small>
              </p>


              <div>
                <button onClick={toggleSound}>
                  Turn Sound {soundOn ? "Off" : "On"}
                </button>
                <button onClick={() => set()}>EXPLORE</button>
              </div>
            </div>
          </div>
        </animated.div>
      )
  );
};

export default Modal;
