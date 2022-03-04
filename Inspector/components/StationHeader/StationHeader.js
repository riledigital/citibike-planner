// TODO: Remove live status stuff from it
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import ManageStation from "components/ManageStation";
// import "./StationHeader.css";
import { useTransition, animated } from "@react-spring/web";
import { useSelector } from "react-redux";
import { selectStationInfo } from "common/store/AppSlice";

import styled from "styled-components";

const StyledStationHeader = styled(animated.div)`
  margin-bottom: 1rem;
`;

const StationName = styled.h2`
  line-height: 1.1;
  font-size: 1.4rem;
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
      <StationName>
        {name}
        <StyledId title="Station ID">#{station_id}</StyledId>
      </StationName>
      <StyledStationInfo>
        {stationNeighborhood}, {boroname} <ManageStation />
      </StyledStationInfo>
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

const StyledStationInfo = styled.div`
  font-size: 1rem;
`;

const StyledId = styled.div`
  display: block;
  float: right;

  font-size: 1rem;
`;
