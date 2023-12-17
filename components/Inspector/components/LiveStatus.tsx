import { useStationState } from "../../../common/MapState";
import { useStationStatus } from "../../../hooks/useStationStatus";
import styled from "styled-components";

const StyledHeading = styled.h3`
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  padding: 0;
  margin: 0;
  margin-top: 1rem;
  margin-bottom: 0rem;
  letter-spacing: 0.05rem;
  text-align: center;
`;

const StyledStationStatus = styled.div`
  text-align: center;
  flex-grow: 0;
  display: block;
  padding: 0rem 0.5rem 0rem 0.5rem;
  height: auto;
  overflow: hidden;
`;

const StyledStationStatusLabel = styled.div`
  font-size: 0.75rem;
  line-height: 1.2;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  margin-top: 0;

  height: auto;
`;

const StyledLastUpdated = styled.div`
  font-weight: normal;
  font-size: 0.8rem;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const StyledLoadingIllustration = styled.div`
  border: 1px solid gray;
  background-color: var(--c-text);
  color: var(--c-background);
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  height: 10rem;
`;

const StyledStatusGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 1ch;

  height: auto;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const StyledNumber = styled.div`
  font-variant-numeric: oldstyle-nums;
  display: block;
  font-size: 1.5rem;
`;

const getFormattedTime = (time) =>
  new Date(time * 1000).toLocaleTimeString("en-US");

export function LiveStatus() {
  const { currentStationId } = useStationState();
  const { data, isLoading } = useStationStatus("12");

  if (isLoading) {
    return <>Loading</>;
  }

  if (!data || !currentStationId) {
    return <>No data available</>;
  }
  const {
    num_bikes_available,
    num_docks_available,
    num_ebikes_available,
    last_reported,
  } = data?.get(currentStationId) ?? {};

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
}

// LiveStatus.propTypes = {};
export default LiveStatus;
