// TODO: Remove live status stuff from it
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// import "./StationHeader.css";
import { useTransition, animated } from "@react-spring/web";
import { useSelector } from "react-redux";
import { selectStationInfo } from "@/common/Store/AppSlice";

const StationHeader = (props) => {
  // Logic for handling null NTA codes
  const stationData = useSelector(selectStationInfo);

  const { name, station_id, ntaname, boroname } = stationData || {};
  const stationNeighborhood = !ntaname ? "" : ntaname;
  if (stationData) {
    // debugger;
  }

  return name ? (
    <animated.div style={props}>
      <div>
        <h2>{name}</h2>
        <div>Station ID: {station_id}</div>
      </div>
      <div>
        {stationNeighborhood}, {boroname}
      </div>
    </animated.div>
  ) : (
    <div>
      <p>Please click on a station on the map to view the activity details.</p>
    </div>
  );
};

StationHeader.propTypes = {
  station: PropTypes.object,
};
export default StationHeader;
