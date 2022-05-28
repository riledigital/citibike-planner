import { useLiveStatus } from "hooks/useLiveStatus";
import {
  StyledHeading,
  StyledLastUpdated,
  StyledLoadingIllustration,
  StyledNumber,
  StyledStationStatus,
  StyledStationStatusLabel,
  StyledStatusGrid,
} from "./styles";

const getFormattedTime = (time) =>
  new Date(time * 1000).toLocaleTimeString("en-US");

const LiveStatus = ({ stationId }) => {
  const {
    num_bikes_available,
    num_docks_available,
    num_ebikes_available,
    last_reported,
  } = useLiveStatus(stationId);

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

      <StyledLastUpdated>
        Updated on {getFormattedTime(last_reported ?? "")}
      </StyledLastUpdated>
      <StyledStatusGrid>
        <StyledStationStatus>
          <StyledNumber>{num_bikes_available ?? "N/A"} </StyledNumber>
          <StyledStationStatusLabel>Classic</StyledStationStatusLabel>
        </StyledStationStatus>
        <StyledStationStatus>
          <StyledNumber>{num_ebikes_available ?? "N/A"}</StyledNumber>
          <StyledStationStatusLabel>
            <span role="img" aria-label="electric">
              ⚡
            </span>
            Electric
          </StyledStationStatusLabel>
        </StyledStationStatus>
        <StyledStationStatus>
          <StyledNumber>{num_docks_available ?? "N/A"}</StyledNumber>
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

// LiveStatus.propTypes = {};
export default LiveStatus;
