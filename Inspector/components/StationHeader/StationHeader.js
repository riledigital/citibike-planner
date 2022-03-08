// TODO: Remove live status stuff from it
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import ManageStation from "components/ManageStation";
import styles from "./StationHeader.module.css";
import { useTransition, animated } from "@react-spring/web";
import { useSelector } from "react-redux";
import { selectStationInfo } from "common/store/AppSlice";

import styled from "styled-components";

const StationHeader = (props) => {
  // Logic for handling null NTA codes
  const stationData = useSelector(selectStationInfo);

  const { name, station_id, ntaname, boroname } = stationData || {};
  const stationNeighborhood = !ntaname ? "" : ntaname;

  return name ? (
    <header className={clsx(styles.header)} style={props.style}>
      <div className={clsx(styles.name)}>
        {name}
        <StyledId title="Station ID">#{station_id}</StyledId>
      </div>
      <StyledStationInfo>
        {stationNeighborhood}, {boroname}
      </StyledStationInfo>
      <ManageStation />
    </header>
  ) : (
    <div>
      <p>Please click on a station on the map to view the activity details.</p>
    </div>
  );
};

export default StationHeader;

const StationName = styled.h2``;

const StyledStationInfo = styled.div`
  font-size: 1rem;
`;

const StyledId = styled.div`
  display: block;
  float: right;

  font-size: 1rem;
`;
