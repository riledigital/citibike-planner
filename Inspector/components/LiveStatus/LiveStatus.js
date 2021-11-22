import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  StyledButtonUnlock,
  StyledHeading,
  StyledLastUpdated,
  StyledLoadingIllustration,
  StyledNumber,
  StyledStatusGrid,
  StyledStationStatus,
  StyledStationStatusLabel,
} from "./styles";
import { useSelector } from "react-redux";
import { selectLiveStatus } from "@/common/Store/AppSlice";

const getFormattedTime = (time) =>
  new Date(time * 1000).toLocaleTimeString("en-US");

const LiveStatus = () => {
  const {
    num_bikes_available,
    num_docks_available,
    num_ebikes_available,
    last_reported,
    station_status,
  } = useSelector(selectLiveStatus) || {};

  if (num_bikes_available === null) {
    return (
      <>
        <StyledLoadingIllustration>
          <p>No station selected.</p>
          <p>
            Please click on a station on the map to view the activity details.
          </p>
        </StyledLoadingIllustration>
      </>
    );
  }

  return (
    <>
      <StyledHeading>Live Status</StyledHeading>
      {station_status}
      <StyledLastUpdated>
        Updated on {getFormattedTime(last_reported)}
      </StyledLastUpdated>
      <StyledStatusGrid>
        <StyledStationStatus>
          <StyledNumber>{num_bikes_available} </StyledNumber>
          <StyledStationStatusLabel>Classic</StyledStationStatusLabel>
        </StyledStationStatus>
        <StyledStationStatus>
          <StyledNumber>{num_ebikes_available}</StyledNumber>
          <StyledStationStatusLabel>
            <span role="img" aria-label="electric">
              ⚡
            </span>
            Electric
          </StyledStationStatusLabel>
        </StyledStationStatus>
        <StyledStationStatus>
          <StyledNumber>{num_docks_available}</StyledNumber>
          <StyledStationStatusLabel>Docks</StyledStationStatusLabel>
        </StyledStationStatus>
      </StyledStatusGrid>
      {/* {showUnlock ? (
        <StyledButtonUnlock onClick={(e) => handleButtonClick()}>
          Unlock bike
        </StyledButtonUnlock>
      ) : null} */}
    </>
  );
};

LiveStatus.propTypes = {};
export default LiveStatus;
