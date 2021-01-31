import React from "react";
import PropTypes from "prop-types";

import {
  StyledButtonUnlock,
  StyledHeading,
  StyledLastUpdated,
  StyledLoadingIllustration,
  StyledStation,
  StyledStatusGrid,
  StyledStationStatus,
  StyledStationStatusLabel,
} from "./styles.js";

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

  let statusInfo = {
    bikes: num_bikes_available,
    electric: !num_ebikes_available ? 0 : num_ebikes_available,
    docks: num_docks_available,
  };

  return (
    <>
      <StyledHeading>Live Status</StyledHeading>
      <StyledStatusGrid>
        <StyledStationStatus>
          {statusInfo.bikes}{" "}
          <StyledStationStatusLabel>Classic</StyledStationStatusLabel>
        </StyledStationStatus>
        <StyledStationStatus>
          {statusInfo.electric}
          <StyledStationStatusLabel>
            <span role="img" aria-label="electric">
              ⚡
            </span>
            Electric
          </StyledStationStatusLabel>
        </StyledStationStatus>
        <StyledStationStatus>
          {statusInfo.docks}
          <StyledStationStatusLabel>Docks</StyledStationStatusLabel>
        </StyledStationStatus>
      </StyledStatusGrid>

      <StyledLastUpdated>
        Last updated on {getFormattedTime(last_reported)}
      </StyledLastUpdated>

      {/* <div>
        <StyledButtonUnlock href={rental_url}>
          Unlock a bike
        </StyledButtonUnlock>
      </div> */}
    </>
  );
};

LiveStatus.propTypes = {};
export default LiveStatus;
