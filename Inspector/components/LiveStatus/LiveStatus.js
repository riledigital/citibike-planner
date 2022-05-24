import {
  StyledHeading,
  StyledLastUpdated,
  StyledLoadingIllustration,
  StyledNumber,
  StyledStatusGrid,
  StyledStationStatus,
  StyledStationStatusLabel,
} from "./styles";
import { useSelector } from "react-redux";
import {
  selectCurrentStation,
  selectAllLiveStatus,
} from "/common/store/AppSlice";

const getFormattedTime = (time) =>
  new Date(time * 1000).toLocaleTimeString("en-US");

const LiveStatus = ({ stationId }) => {
  const allLiveStatus = useSelector(selectAllLiveStatus) ?? {};
  const currentStationId = useSelector(selectCurrentStation);

  let num_bikes_available,
    num_docks_available,
    num_ebikes_available,
    last_reported;

  if (!stationId && currentStationId) {
    ({
      num_bikes_available = 0,
      num_docks_available = 0,
      num_ebikes_available = 0,
      last_reported = 0,
    } = allLiveStatus[currentStationId]);
  } else {
    ({
      num_bikes_available = 0,
      num_docks_available = 0,
      num_ebikes_available = 0,
      last_reported = 0,
    } = allLiveStatus?.[stationId] ?? {});
  }
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

// LiveStatus.propTypes = {};
export default LiveStatus;
