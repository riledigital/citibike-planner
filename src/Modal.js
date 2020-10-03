import React from "react";
import "./Modal.css";
const Modal = (props) => {
  const { toggle } = props;
  return (
    <div class="modal" onClick={toggle}>
      <div class="modal-content">
        <h1>CitiBike Activity Viewer</h1>

        <p>
          When is the best time to take a CitiBike in your area? Use this app to
          find out which Citi Bike stations are free during a specific time of
          day. Or explore stations around the city and find out when your
          favorite stations are the busiest.
        </p>

        <h3 className="emphasis">Instructions</h3>
        <p className="instructions">
          Click on a station on the map. A histogram will appear on the sidebar
          that shows the ride distribution across all 24 hours of the day.
        </p>
      </div>
    </div>
  );
};

export default Modal;
