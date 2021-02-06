import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  StyledButtonUnlock,
  StyledHeading,
  StyledLastUpdated,
  StyledLoadingIllustration,
  StyledStation,
  StyledNumber,
  StyledStatusGrid,
  StyledStationStatus,
  StyledStationStatusLabel,
} from "./styles.js";

function isMobile() {
  const toMatch = [/Android/i, /iPhone/i, /iPad/i, /iPod/i];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}

const getFormattedTime = (time) =>
  new Date(time * 1000).toLocaleTimeString("en-US");

const LiveStatus = ({
  station_id,
  num_bikes_available,
  num_ebikes_available,
  num_docks_available,
  last_reported,
  rental_url,
}) => {
  const [stationInfo, setStationInfo] = useState(null);
  const [showUnlock, setShowUnlock] = useState(false);

  useEffect(() => {
    setStationInfo({
      bikes: num_bikes_available,
      electric: !num_ebikes_available ? 0 : num_ebikes_available,
      docks: num_docks_available,
      rental_url: rental_url,
    });

    setShowUnlock(isMobile());
  }, [last_reported]);

  if (!station_id) {
    return <progress></progress>;
  }

  if (station_id === null) {
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

  const handleButtonClick = (e) => {
    console.log(stationInfo);
    window.location.href = stationInfo.rental_url;
  };

  return (
    <>
      <StyledHeading>Live Status</StyledHeading>

      <StyledLastUpdated>
        Last updated on {getFormattedTime(last_reported)}
      </StyledLastUpdated>

      <StyledStatusGrid>
        <StyledStationStatus>
          <StyledNumber>{stationInfo.bikes} </StyledNumber>
          <StyledStationStatusLabel>Classic</StyledStationStatusLabel>
        </StyledStationStatus>
        <StyledStationStatus>
          <StyledNumber>{stationInfo.electric}</StyledNumber>
          <StyledStationStatusLabel>
            <span role="img" aria-label="electric">
              ⚡
            </span>
            Electric
          </StyledStationStatusLabel>
        </StyledStationStatus>
        <StyledStationStatus>
          <StyledNumber>{stationInfo.docks}</StyledNumber>
          <StyledStationStatusLabel>Docks</StyledStationStatusLabel>
        </StyledStationStatus>
      </StyledStatusGrid>
      {showUnlock ? (
        <StyledButtonUnlock onClick={(e) => handleButtonClick()}>
          Unlock bike
        </StyledButtonUnlock>
      ) : null}
    </>
  );
};

LiveStatus.propTypes = {};
export default LiveStatus;
