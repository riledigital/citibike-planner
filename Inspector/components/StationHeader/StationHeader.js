// TODO: Remove live status stuff from it
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// import "./StationHeader.css";
import { useTransition, animated } from "@react-spring/web";
import { useSelector } from "react-redux";
import { selectStationInfo } from "@/common/Store/AppSlice";

import styled from "styled-components";

const StyledStationHeader = styled(animated.div)`
  margin-bottom: 1rem;
`;

const StationHeader = (props) => {
  // Logic for handling null NTA c  odes
  const stationData = useSelector(selectStationInfo);

  const { name, station_id, ntaname, boroname } = stationData || {};
  const stationNeighborhood = !ntaname ? "" : ntaname;
  if (stationData) {
    // debugger;
  }

  return name ? (
    <StyledStationHeader style={props.style}>
      <div>
        <h2>
          {name}
          <StyledId title="Station ID">#{station_id}</StyledId>
        </h2>
      </div>
      <div>
        {stationNeighborhood}, {boroname}
      </div>
    </StyledStationHeader>
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

const StyledId = styled.div`
  display: block;
  float: right;

  font-size: 1rem;
`;
