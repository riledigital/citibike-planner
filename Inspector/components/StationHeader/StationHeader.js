// TODO: Remove live status stuff from it
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import ManageStation from "components/ManageStation";
import styles from "./StationHeader.module.css";
import { useTransition, animated } from "@react-spring/web";
import { useSelector } from "react-redux";
import { selectStationInfo } from "common/store/AppSlice";

import styled from "styled-components";
import { useStationData } from "/hooks/useStationData";

const StationHeader = (props) => {
  // Logic for handling null NTA codes
  const {
    name,
    station_id,
    short_name,
    ntaname,
    boroname,
    stationNeighborhood,
  } = useStationData();

  return name ? (
    <header className={clsx(styles.header)} style={props.style}>
      <div className={clsx(styles.name)}>
        {name}
        <div className={styles["id-label"]} title="Station ID">
          #{short_name}
        </div>
      </div>
      <div className={styles["station-info"]}>
        {stationNeighborhood}, {boroname}
      </div>
      <ManageStation />
    </header>
  ) : (
    <div>
      <p>Please click on a station on the map to view the activity details.</p>
    </div>
  );
};

export default StationHeader;
